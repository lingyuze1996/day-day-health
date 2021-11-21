const TOKEN_AUTH_API = "https://api.daydayhealth.cf/auth"

const authToken = async(token) => {
    const authResponse = await fetch(TOKEN_AUTH_API, {
        method: "POST",
        body: JSON.stringify({ token })
    })

    return await authResponse.json()
}

export { authToken }