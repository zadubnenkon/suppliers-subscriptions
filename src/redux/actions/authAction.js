import { AUTH_SET_TOKEN } from "../reducers/authReducer";

export function setTokenAction(token) {
    return {type:AUTH_SET_TOKEN, payload: token};
}