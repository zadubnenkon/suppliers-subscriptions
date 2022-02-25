import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoriesReducer } from "./categoriesReducer";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
    authManager: authReducer,
    categoriesManager: categoriesReducer,
    appManager: appReducer,
});