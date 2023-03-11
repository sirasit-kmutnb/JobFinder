export const authenticate = (response, next) => {
  if (window !== "undefinded") {
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.userName));
    sessionStorage.setItem("role", JSON.stringify(response.data.userRole));
    sessionStorage.setItem(
      "subscription",
      JSON.stringify(response.data.userSub)
    );
  }
  next();
};

export const getToken = () => {
  if (window !== "undefinded") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

export const getUser = () => {
  if (window !== "undefinded") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

export const getRole = () => {
  if (window !== "undefinded") {
    if (sessionStorage.getItem("role")) {
      return JSON.parse(sessionStorage.getItem("role"));
    } else {
      return false;
    }
  }
};

export const getSub = () => {
  if (window !== "undefinded") {
    if (sessionStorage.getItem("subscription")) {
      return JSON.parse(sessionStorage.getItem("subscription"));
    } else {
      return false;
    }
  }
};

export const logout = (next) => {
  if (window !== "undefinded") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("subscription");
  }
  next();
};
