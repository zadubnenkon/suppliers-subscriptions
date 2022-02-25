export const APP_SET_OPEN_EDIT_MODAL = "APP/APP_SET_OPEN_EDIT_MODAL";
export const APP_SET_OPEN_SNACK_BAR = "APP/APP_SET_OPEN_SNACK_BAR";
export const APP_SET_MODAL_OPTION = "APP/APP_SET_MODAL_OPTION";
export const APP_TOGGLE_BACKDROP = "APP/APP_TOGGLE_BACKDROP";

const initialState = {
    isOpenEditModal: false,
    isOpenErrorSnack: false,
    isEditModal: false,
    isBackDropOn: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_SET_OPEN_EDIT_MODAL:
            return { ...state, isOpenEditModal: action.payload };
        case APP_SET_OPEN_SNACK_BAR:
            return { ...state, isOpenErrorSnack: action.payload };
        case APP_SET_MODAL_OPTION:
            return { ...state, isEditModal: action.payload };
        case APP_TOGGLE_BACKDROP:
            return { ...state, isBackDropOn: action.payload };
        default:
            return state;
    }
};
