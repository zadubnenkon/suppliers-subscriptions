import {
    APP_SET_OPEN_EDIT_MODAL,
    APP_SET_OPEN_SNACK_BAR,
} from "../reducers/appReducer";

export function setOpenEditModal(isOpen) {
    return { type: APP_SET_OPEN_EDIT_MODAL, payload: isOpen };
}

export function setOpenSnackBar(isOpen) {
    return { type: APP_SET_OPEN_SNACK_BAR, payload: isOpen };
}
