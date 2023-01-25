import { Auth } from 'aws-amplify';
import axios from 'axios';

const DAY_DAY_HEALTH_API_URL = 'https://api.daydayhealth.click/records';

const getRecords = async () => {
  const { idToken } = await Auth.currentSession();
  const response = await axios.get(DAY_DAY_HEALTH_API_URL, {
    headers: { Authorization: idToken.jwtToken },
  });
  return response.data;
};

const putRecord = async (record) => {
  const { idToken } = await Auth.currentSession();
  const response = await axios.post(DAY_DAY_HEALTH_API_URL, record, {
    headers: { Authorization: idToken.jwtToken },
  });

  return response.data;
};

const deleteRecord = async (recordID) => {
  const { idToken } = await Auth.currentSession();
  const response = await axios.delete(
    `${DAY_DAY_HEALTH_API_URL}?recordID=${recordID}`,
    {
      headers: { Authorization: idToken.jwtToken },
    }
  );

  return response;
};

export { getRecords, putRecord, deleteRecord };
