import axios from "axios"

const DAY_DAY_HEALTH_API_URL = "https://api.daydayhealth.cf/records"

const getRecords = async (token) => {
    const response = await axios.get(DAY_DAY_HEALTH_API_URL, {
        headers: { idToken: token}
    })
    return response.data
}

export { getRecords }