export const AUTH_SET_TOKEN = "AUTH/AUTH_SET_TOKEN";

const initialState = {
    token: ''
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_SET_TOKEN: 
            return {...state, token: action.payload};
        default:
            return state;
    }
}