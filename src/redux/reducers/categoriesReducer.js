export const SET_CATEGORIES_LIST = "CATEGORIES/SET_CATEGORIES_LIST";
export const ADD_CATEGORY = "CATEGORIES/ADD_CATEGORY";
export const SET_ERROR_CATEGORY = "CATEGORIES/SET_ERROR_CATEGORY";
export const SET_CATEGORY_CODE_ERROR = "CATEGORIES/SET_CATEGORY_CODE_ERROR";
export const SET_CATEGORY_NAME_ERROR = "CATEGORIES/SET_CATEGORY_NAME_ERROR";
export const SET_CATEGORY_ID = "CATEGORIES/SET_CATEGORY_ID";
export const SET_SELECTED_CATEGORY = "CATEGORIES/SET_SELECTED_CATEGORY";

const initialState = {
    categoriesList: [],
    categoryError: "",
    nameCategoryError: "",
    codeCategoryError: "",
    categoryId: 0,
    selectedCategory: {id:0, name:'', code:'', parentId: null}
};

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES_LIST:
            return { ...state, categoriesList: action.payload };
        case ADD_CATEGORY:
            return {
                ...state,
                categoriesList: state.categoriesList.concat(action.payload),
            };
        case SET_ERROR_CATEGORY:
            return { ...state, categoryError: action.payload };
        case SET_CATEGORY_NAME_ERROR:
            return { ...state, nameCategoryError: action.payload };
        case SET_CATEGORY_CODE_ERROR:
            return { ...state, codeCategoryError: action.payload };
        case SET_CATEGORY_ID:
            return { ...state, categoryId: action.payload };
        case SET_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload };
        default:
            return state;
    }
};
