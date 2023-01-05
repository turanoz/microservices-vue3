export default function () {

    const getClientToken = "Bearer " + localStorage.getItem('clientToken')

    const getUserToken = "Bearer " + localStorage.getItem('userToken')

    const getUserRefreshToken = localStorage.getItem('userRefreshToken')

    const setClientToken = (token) => {
        return localStorage.setItem('clientToken', token)
    }
    const setUserToken = (token) => {
        return localStorage.setItem('userToken', token)
    }
    const setUserRefreshToken = (token) => {
        return localStorage.setItem('userRefreshToken', token)
    }
    const deleteToken = () => {
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("userToken");
    }
    return {
        getClientToken,
        getUserToken,
        getUserRefreshToken,
        setClientToken,
        setUserToken,
        setUserRefreshToken,
        deleteToken
    }

}
