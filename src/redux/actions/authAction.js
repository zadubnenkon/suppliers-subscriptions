import { AUTH_SET_TOKEN, AUTH_SET_ERROR_LOGIN, AUTH_SET_ERROR_PASSWORD, AUTH_SET_ERROR } from "../reducers/authReducer";

export function setTokenAction(token) {
    return {type:AUTH_SET_TOKEN, payload: token};
}

export function setErrorLoginField(errLogin) {
    return {type:AUTH_SET_ERROR_LOGIN, payload: errLogin};
}

export function setErrorPasswordField(errPassword) {
    return {type: AUTH_SET_ERROR_PASSWORD, payload: errPassword};
}

export function setErrorAuth(message) {
    return {type: AUTH_SET_ERROR, payload: message};
}