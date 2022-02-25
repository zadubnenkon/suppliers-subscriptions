import RestApi from "../rest/restApi";
import { setTokenAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { STATUS_INTERNAL_ERROR, STATUS_BAD_REQUEST,  STATUS_UNAUTHTORIZED } from "../../redux/reducers/authReducer";
import { setErrorLoginField, setErrorPasswordField, setErrorAuth } from "../../redux/actions/authAction";
import { setCategoriesList } from "../../redux/actions/categoriesAction";

const restService = new RestApi();

export const useAuthtorize = () => {
    const token = useSelector((state) => state);
    const dispatch = useDispatch();
    const auth = async (login, password) => {
        dispatch(setErrorLoginField(''));
        dispatch(setErrorPasswordField(''));
        dispatch(setErrorAuth(''));
        const result = await restService.auth(login, password);
        if (typeof result === "string") {
            dispatch(setTokenAction(result));
            const categories = await restService.getCategories();
            dispatch(setCategoriesList(categories.data));
        } else {
            switch(result.status) {
                case STATUS_BAD_REQUEST:
                   const isPassword = result.data.message[0].includes('password');
                   const isLogin = result.data.message[0].includes('username');
                   isLogin && dispatch(setErrorLoginField(result.data.message[0].replace('username', 'Поле логин')));
                   isPassword && dispatch(setErrorPasswordField(result.data.message[0].replace('password:', 'Поле пароль')));
                   break;
                case STATUS_INTERNAL_ERROR:
                    dispatch(setErrorAuth(result.message));
                    break;
                case STATUS_UNAUTHTORIZED:
                    dispatch(setErrorAuth(result.data.message));
                    break;
                default:
                    return true;
            }
        }
       
    };

    return { token, auth };
};

export const useGetAuthManager = () => {
    return useSelector((state) => state.authManager);
}

export const useGetTokenAuthManager = () => {
    return useSelector((state) => state.authManager.token);
}