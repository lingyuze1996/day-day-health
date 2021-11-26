import axios from "axios"

const DAY_DAY_HEALTH_API_URL = "https://api.daydayhealth.cf/records"

const getRecords = async (idToken) => {
    const response = await axios.get(DAY_DAY_HEALTH_API_URL, {
        headers: { idToken }
    })
    return response.data
}

const addRecord = async (record, idToken) => {
    const response = await axios.post(DAY_DAY_HEALTH_API_URL, record, {
        headers: { idToken }
    })

    return response.data
}

const deleteRecord = async(recordID, idToken) => {
    const response = await axios.delete(`${DAY_DAY_HEALTH_API_URL}?recordID=${recordID}`, {
        headers: {idToken}
    })

    return response
}

export { getRecords, addRecord, deleteRecord }