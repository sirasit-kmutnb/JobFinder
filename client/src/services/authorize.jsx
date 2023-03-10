export const authenticate = (response, next) => {
    if(window !== "undefinded") {
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("user", JSON.stringify(response.data.userName))
    }
    next()
}