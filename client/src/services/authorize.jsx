export const authenticate = (response, next) => {
    if(window !== "undefinded") {
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("user", JSON.stringify(response.data.userName))
        sessionStorage.setItem("role", JSON.stringify(response.data.userRole))
        sessionStorage.setItem("subscription", JSON.stringify(response.data.userSub))
    }
    next()
}

export const getToken=()=>{
    if(window !== "undefinded") {
        if(sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"))
        }
        else {
            return false
        }
    }
}

export const getUser=()=>{
    if(window !== "undefinded") {
        if(sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"))
        }
        else {
            return false
        }
    }
}

export const logout=(next)=>{
    if(window !== "undefinded") {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}