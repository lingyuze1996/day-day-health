import axios from "axios"

const AUTH_URL = "https://auth.daydayhealth.cf/login?response_type=code&client_id=1ulb350s6u8a4efebc44la1ku4&redirect_uri=https://www.daydayhealth.cf"
const TOKEN_AUTH_API = "https://auth.daydayhealth.cf/oauth2/token"
const REDIRECT_URI = "https://www.daydayhealth.cf"
const CLIENT_ID = "1ulb350s6u8a4efebc44la1ku4"

const authCode = async (code) => {
    if (!code) window.location.href = AUTH_URL

    const params = new URLSearchParams()
    params.append("redirect_uri", REDIRECT_URI)
    params.append("grant_type", "authorization_code")
    params.append("client_id", CLIENT_ID)
    params.append("code", code)

    try {
        const data = (await axios.post(TOKEN_AUTH_API, params))?.data;

        if (data["refresh_token"] && data["id_token"]) {
            localStorage.setItem("refreshToken", data["refresh_token"])
            localStorage.setItem("idToken", data["id_token"])
        } else {
            window.location.href = AUTH_URL
        }
    } catch (e) {
        console.log("Auth Code Error: ", e)
        window.location.href = AUTH_URL
    }
}

const authRefreshToken = async (token) => {
    if (!token) window.location.href = AUTH_URL

    const params = new URLSearchParams()
    params.append("redirect_uri", REDIRECT_URI)
    params.append("grant_type", "refresh_token")
    params.append("client_id", CLIENT_ID)
    params.append("refresh_token", token)

    try {
        const resultData = (await axios.post(TOKEN_AUTH_API, params))?.data

        if (resultData?.["id_token"]) {
            localStorage.setItem("idToken", resultData["id_token"])
        } else {
            window.location.href = AUTH_URL
        }
    } catch (e) {
        console.log("Auth Refresh Token Error: ", e)
        window.location.href = AUTH_URL
    }
}

export { authRefreshToken, authCode }