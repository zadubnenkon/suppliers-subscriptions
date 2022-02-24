export const AUTH_SET_TOKEN = "AUTH/AUTH_SET_TOKEN";
export const AUTH_SET_ERROR_LOGIN = "AUTH/AUTH_SET_ERROR_LOGIN";
export const AUTH_SET_ERROR_PASSWORD = "AUTH/AUTH_SET_ERROR_PASSWORD";

export const STATUS_INTERNAL_ERROR = 500;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHTORIZED = 401;

const initialState = {
    token: '',
    errorLogin: '',
    errorPassword: ''
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_SET_TOKEN: 
            return {...state, token: action.payload};
        case AUTH_SET_ERROR_LOGIN:
            return {...state, errorLogin: action.payload};
        case AUTH_SET_ERROR_PASSWORD:
            return {...state, errorPassword: action.payload};
        default:
            return state;
    }
}