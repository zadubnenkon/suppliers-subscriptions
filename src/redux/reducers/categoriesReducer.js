export const SET_CATEGORIES_LIST = "CATEGORIES/SET_CATEGORIES_LIST";

const initialState = {
    categoriesList: [],
};

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES_LIST:
            return { ...state, categoriesList: action.payload };
        default:
            return state;
    }
};
