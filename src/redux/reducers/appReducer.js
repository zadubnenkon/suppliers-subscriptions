export const APP_SET_OPEN_EDIT_MODAL = "APP/APP_SET_OPEN_EDIT_MODAL";
export const APP_SET_OPEN_SNACK_BAR = "APP/APP_SET_OPEN_SNACK_BAR";

const initialState = {
    isOpenEditModal: false,
    isOpenErrorSnack: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_SET_OPEN_EDIT_MODAL:
            return { ...state, isOpenEditModal: action.payload };
        case APP_SET_OPEN_SNACK_BAR:
            return { ...state, isOpenErrorSnack: action.payload };
        default:
            return state;
    }
};
