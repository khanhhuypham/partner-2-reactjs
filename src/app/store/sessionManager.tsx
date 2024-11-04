import { User } from "../models/user/user";

export const saveToken = (token: string) => {
    sessionStorage.setItem("token", token);
};

export const getToken = () => {
    return sessionStorage.getItem("token");
};


export const saveUser = (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    return sessionStorage.getItem("token");
};



export const removeSessionToken = () => {
    sessionStorage.removeItem("token");
};

export const isUserLoggedIn = () => {
    return sessionStorage.getItem("token") !== null;
};
