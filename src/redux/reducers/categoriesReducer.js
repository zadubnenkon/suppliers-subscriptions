export const SET_CATEGORIES_LIST = "CATEGORIES/SET_CATEGORIES_LIST";
export const ADD_CATEGORY = "CATEGORIES/ADD_CATEGORY";
export const SET_ERROR_CATEGORY = "CATEGORIES/SET_ERROR_CATEGORY";
export const SET_CATEGORY_CODE_ERROR = "CATEGORIES/SET_CATEGORY_CODE_ERROR";
export const SET_CATEGORY_NAME_ERROR = "CATEGORIES/SET_CATEGORY_NAME_ERROR";
export const SET_CATEGORY_ID = "CATEGORIES/SET_CATEGORY_ID";
export const SET_SELECTED_CATEGORY = "CATEGORIES/SET_SELECTED_CATEGORY";
export const SET_PARENT_ID = "PARENT/SET_PARENT_ID";
export const SET_CHAIN_PARENT = "PARENT/SET_CHAIN_PARENT";
export const SET_CHAIN_LIST = "CHAIN/SET_CHAIN_LIST";
export const SET_BREADCRUMBS_CATEGORIES = "BREADCRUMBS/SET_BREADCRUMBS_CATEGORIES";
export const SET_BREADCRUMBS_LIST = "BREADCRUMBS/SET_BREADCRUMBS_LIST";

const initialState = {
    categoriesList: [],
    categoryError: "",
    nameCategoryError: "",
    codeCategoryError: "",
    categoryId: 0,
    parentId: null,
    chainParentIds: [],
    breadcrumbs: [{id: 0, name: 'Главная'}],
    selectedCategory: { id: 0, name: "", code: "", parentId: null },
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
        case SET_PARENT_ID:
            return { ...state, parentId: action.payload };
        case SET_CHAIN_PARENT:
            return {
                ...state,
                chainParentIds: state.chainParentIds.concat(action.payload),
            };
        case SET_CHAIN_LIST: 
        return {
            ...state,
            chainParentIds: action.payload,
        };
        case SET_BREADCRUMBS_CATEGORIES:
        return {
            ...state,
            breadcrumbs: state.breadcrumbs.concat(action.payload)
        }
        case SET_BREADCRUMBS_LIST: 
        return {
            ...state,
            breadcrumbs: action.payload
        }
        default:
            return state;
    }
};
