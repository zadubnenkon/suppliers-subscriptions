import { useSelector, useDispatch } from "react-redux";
import RestApi from "../rest/restApi";
import { addCategory } from "../../redux/actions/categoriesAction";
import { useGetTokenAuthManager } from "./authHooks";
import { setCategoryError } from "../../redux/actions/categoriesAction";
import { setCategoryCodeError } from "../../redux/actions/categoriesAction";
import { setCategoryNameError } from "../../redux/actions/categoriesAction";
import { setOpenSnackBar } from "../../redux/actions/appAction";
import {
    STATUS_INTERNAL_ERROR,
    STATUS_BAD_REQUEST,
} from "../../redux/reducers/authReducer";
import { setOpenEditModal } from "../../redux/actions/appAction";

export const useGetCategories = () => {
    return useSelector((state) => state.categoriesManager.categoriesList);
};

export const useGetCategoryManager = () => {
    return useSelector((state) => state.categoriesManager);
};

export const useAddCategory = () => {
    const dispatch = useDispatch();
    const errors = useCloseErrors();
    const getCat = useGetCategories();
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

    return {
        getCat,
        add,
    };
};

export const useCloseErrors = () => {
    const dispatch = useDispatch();
    const close = () => {
        dispatch(setOpenSnackBar(false));
        dispatch(setCategoryNameError(""));
        dispatch(setCategoryCodeError(""));
        dispatch(setCategoryError(""));
    };

    return {close};
};
