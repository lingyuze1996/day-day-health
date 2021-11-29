import axios from "axios"

const DAY_DAY_HEALTH_API_URL = "https://api.daydayhealth.cf/records"

const getRecords = async () => {
    const response = await axios.get(DAY_DAY_HEALTH_API_URL, {
        headers: { "Authorization": localStorage.getItem("idToken") }
    })
    return response.data
}

const putRecord = async (record) => {
    const response = await axios.post(DAY_DAY_HEALTH_API_URL, record, {
        headers: { "Authorization": localStorage.getItem("idToken") }
    })

    return response.data
}

const deleteRecord = async (recordID) => {
    const response = await axios.delete(`${DAY_DAY_HEALTH_API_URL}?recordID=${recordID}`, {
        headers: { "Authorization": localStorage.getItem("idToken") }
    })

    return response
}

export { getRecords, putRecord, deleteRecord }