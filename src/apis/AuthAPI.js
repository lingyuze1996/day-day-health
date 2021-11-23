import axios from "axios"

const TOKEN_AUTH_API = "https://auth.daydayhealth.cf/oauth2/token"
const REDIRECT_URI = "https://www.daydayhealth.cf"
const CLIENT_ID = "1ulb350s6u8a4efebc44la1ku4"

const authCode = async (code) => {
    const params = new URLSearchParams()
    params.append("redirect_uri", REDIRECT_URI)
    params.append("grant_type", "authorization_code")
    params.append("client_id", CLIENT_ID)
    params.append("code", code)
    return (await axios.post(TOKEN_AUTH_API, params)).data;
}

const authRefreshToken = async (token) => {
    const params = new URLSearchParams()
    params.append("redirect_uri", REDIRECT_URI)
    params.append("grant_type", "refresh_token")
    params.append("client_id", CLIENT_ID)
    params.append("refresh_token", token)
    return (await axios.post(TOKEN_AUTH_API, params)).data;
}

export { authRefreshToken, authCode }