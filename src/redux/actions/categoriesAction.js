import {
    SET_CATEGORIES_LIST,
    ADD_CATEGORY,
    SET_ERROR_CATEGORY,
    SET_CATEGORY_CODE_ERROR,
    SET_CATEGORY_NAME_ERROR,
    SET_CATEGORY_ID,
    SET_SELECTED_CATEGORY,
    SET_PARENT_ID,
    SET_CHAIN_PARENT,
    SET_CHAIN_LIST,
    SET_BREADCRUMBS_CATEGORIES,
    SET_BREADCRUMBS_LIST
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

export function setParentId(id) {
    return { type: SET_PARENT_ID, payload: id };
}

export function setParentChain(id) {
    return {type:SET_CHAIN_PARENT, payload: id};
}

export function setChainList(list) {
    return {type: SET_CHAIN_LIST, payload: list};
}

export function setBreadcrumbs(category) {   
    return {type: SET_BREADCRUMBS_CATEGORIES, payload: category};
}

export function setBreadcrumbsList(list) {
    return {type: SET_BREADCRUMBS_LIST, payload: list};
}