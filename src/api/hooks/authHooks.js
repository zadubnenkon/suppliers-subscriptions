import RestApi from "../rest/restApi";
import { setTokenAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import {STATUS_INTERNAL_ERROR, STATUS_BAD_REQUEST,  STATUS_UNAUTHTORIZED} from "../../redux/reducers/authReducer"
import { setErrorLoginField, setErrorPasswordField } from "../../redux/actions/authAction";

const restService = new RestApi();

export const useAuthtorize = () => {
    const token = useSelector((state) => state);
    const dispatch = useDispatch();
    const auth = async (login, password) => {
        dispatch(setErrorLoginField(''));
        dispatch(setErrorPasswordField(''));
        const result = await restService.auth(login, password);
        if (typeof result === "string") {
            dispatch(setTokenAction(result));
        } else {
            switch(result.status) {
                case STATUS_BAD_REQUEST:
                   const isPassword = result.data.message[0].includes('password');
                   const isLogin = result.data.message[0].includes('username');
                   isLogin && dispatch(setErrorLoginField(result.data.message[0].replace('username:', '')));
                   isPassword && dispatch(setErrorPasswordField(result.data.message[0].replace('password:', '')));
            }
        }
       
    };

    return { token, auth };
};

export const useGetAuthManager = () => {
    return useSelector((state) => state.authManager);
}