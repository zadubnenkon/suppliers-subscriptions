import {
    APP_SET_OPEN_EDIT_MODAL,
    APP_SET_OPEN_SNACK_BAR,
    APP_SET_MODAL_OPTION
} from "../reducers/appReducer";

export function setOpenEditModal(isOpen) {
    return { type: APP_SET_OPEN_EDIT_MODAL, payload: isOpen };
}

export function setOpenSnackBar(isOpen) {
    return { type: APP_SET_OPEN_SNACK_BAR, payload: isOpen };
}

export function setOptionModal(isEdit) {
    return { type: APP_SET_MODAL_OPTION, payload: isEdit };
}