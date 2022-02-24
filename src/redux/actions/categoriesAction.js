import { SET_CATEGORIES_LIST } from "../reducers/categoriesReducer";

export function setCategoriesList(list) {
    return { type: SET_CATEGORIES_LIST, payload: list };
}
