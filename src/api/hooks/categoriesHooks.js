import RestApi from "../rest/restApi";
import { useSelector, useDispatch } from "react-redux";
import { useGetTokenAuthManager } from "./authHooks";
import { setCategoryError } from "../../redux/actions/categoriesAction";
import { setCategoryCodeError } from "../../redux/actions/categoriesAction";
import { setCategoryNameError } from "../../redux/actions/categoriesAction";
import { setOpenSnackBar } from "../../redux/actions/appAction";
import { setOpenEditModal } from "../../redux/actions/appAction";
import { useGetAppManager } from "./appHooks";
import { setSelectedCategory } from "../../redux/actions/categoriesAction";
import {
    addCategory,
    setCategoriesList,
} from "../../redux/actions/categoriesAction";
import {
    STATUS_INTERNAL_ERROR,
    STATUS_BAD_REQUEST,
} from "../../redux/reducers/authReducer";

export const useGetCategories = () => {
    return useSelector((state) => state.categoriesManager.categoriesList);
};

export const useGetCategoryManager = () => {
    return useSelector((state) => state.categoriesManager);
};

export const useCrudCategory = () => {
    const dispatch = useDispatch();
    const errors = useCloseErrors();
    const categories = useGetCategories();
    const token = useGetTokenAuthManager();
    const restService = new RestApi(token);

    const add = async (name, code) => {
        const result = await restService.addCategory(name, code);
        errors.close();
        if (typeof result === "number") {
            dispatch(addCategory({ id: result, name, code, parentId: null }));
            dispatch(setOpenEditModal(false));
        } else {
            const messageError = result.data.message;
            switch (result.status) {
                case STATUS_BAD_REQUEST:
                    if (Array.isArray(messageError)) {
                        dispatch(
                            setCategoryNameError(
                                messageError[0].replace("name", "Поле название")
                            )
                        );
                        dispatch(
                            setCategoryCodeError(
                                messageError[1].replace("code", "Поле код")
                            )
                        );
                    } else {
                        dispatch(setOpenSnackBar(true));
                        dispatch(setCategoryError(messageError));
                    }
                    break;
                case STATUS_INTERNAL_ERROR:
                    dispatch(setCategoryError(messageError));
                    break;
                default:
                    return true;
            }
        }
    };

    const update = async (id, name, code) => {
        const categoriesList = [];
        categories.forEach((category) => {
            const newCat = category;
            if (category.id === id) {
                newCat.name = name;
                newCat.code = code;
            }
            categoriesList.push(newCat);
        });

        errors.close();
        if (name.length > 0 && code.length > 0) {
            const result = await restService.updateCategory(id, name, code);
            if (result === true) {
                dispatch(setCategoriesList(categoriesList));
                dispatch(setOpenEditModal(false));
            } else {
                switch (result.status) {
                    case STATUS_BAD_REQUEST:
                        dispatch(setCategoryError(result.data.message));
                        dispatch(setOpenSnackBar(true));
                        break;
                    case STATUS_INTERNAL_ERROR:
                        dispatch(setCategoryError(result.data.message));
                        dispatch(setOpenSnackBar(true));
                        break;
                    default:
                        return true;
                }
            }
        } else {
            dispatch(setCategoryError("Заполните все поля перед сохранением!"));
            dispatch(setOpenSnackBar(true));
        }
    };

    const remove = async (id) => {
        const categoriesList = [];
        categories.forEach((category) => {
            if (category.id !== id) {
                categoriesList.push(category);
            }
        });
        dispatch(setCategoriesList(categoriesList));
        const result = await restService.deleteCategory(id);
        if (result.data === false) {
            dispatch(setCategoryError("Данной категории не существует!"));
            dispatch(setOpenSnackBar(true));
        }
    };

    return {
        categories,
        add,
        update,
        remove,
    };
};

export const useCrudManager = () => {
    const appManager = useGetAppManager();
    const manager = useGetCategoryManager();
    const crud = useCrudCategory();

    const manage = (name, code) => {
        if (appManager.isEditModal) {
            const id = manager.categoryId;
            crud.update(id, name, code);
        } else {
            crud.add(name, code);
        }
    };

    return { manager, manage };
};

export const useGetCategoryById = () => {
    const token = useGetTokenAuthManager();
    const restService = new RestApi(token);
    const manager = useGetCategoryManager();
    const dispatch = useDispatch();

    const get = async (id) => {
        if (id > 0) {
            const result = await restService.getCategoryById(id);
            if (result.status === 200) {
                dispatch(setSelectedCategory(result.data));
                return true;
            }
        }
        return false;
    };

    return { state: manager.selectedCategory, get };
};

export const useCloseErrors = () => {
    const dispatch = useDispatch();
    const close = () => {
        dispatch(setOpenSnackBar(false));
        dispatch(setCategoryNameError(""));
        dispatch(setCategoryCodeError(""));
        dispatch(setCategoryError(""));
    };

    return { close };
};
