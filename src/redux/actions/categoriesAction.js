import {
    SET_CATEGORIES_LIST,
    ADD_CATEGORY,
    SET_ERROR_CATEGORY,
    SET_CATEGORY_CODE_ERROR,
    SET_CATEGORY_NAME_ERROR,
    SET_CATEGORY_ID,
    SET_SELECTED_CATEGORY,
} from "../reducers/categoriesReducer";

export function setCategoriesList(list) {
    return { type: SET_CATEGORIES_LIST, payload: list };
}

export function addCategory(category) {
    return { type: ADD_CATEGORY, payload: category };
}

export function setCategoryError(error) {
    return { type: SET_ERROR_CATEGORY, payload: error };
}

export function setCategoryNameError(error) {
    return { type: SET_CATEGORY_NAME_ERROR, payload: error };
}

export function setCategoryCodeError(error) {
    return { type: SET_CATEGORY_CODE_ERROR, payload: error };
}

export function setCategoryId(id) {
    return { type: SET_CATEGORY_ID, payload: id };
}

export function setSelectedCategory(category) {
    return { type: SET_SELECTED_CATEGORY, payload: category };
}
