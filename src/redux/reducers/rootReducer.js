import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoriesReducer } from "./categoriesReducer";

export const rootReducer = combineReducers({
    authManager: authReducer,
    categoriesManager: categoriesReducer
});