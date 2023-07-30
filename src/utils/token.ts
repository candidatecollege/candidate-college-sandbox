export const setTokenWithExpiration = (token: string, expirationTimeInSecond: number) => {
    const expirationTimestamp = Date.now() + expirationTimeInSecond * 1000
    const tokenData = {
        token: token,
        expiresAt: expirationTimestamp,
    }
    localStorage.setItem('token', JSON.stringify(tokenData))
}

export const getToken = () => {
    const tokenData = localStorage.getItem('token')
    if (tokenData) {
        const { token, expiresAt } = JSON.parse(tokenData)
        const currentTime = Date.now()
        if (currentTime < expiresAt) {
            return token
        } else {
            localStorage.removeItem('token')
        }
    }
    return null
}