import RestApi from "../rest/restApi";
import { setTokenAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const restService = new RestApi();

export const useAuthtorize = () => {
    const token = useSelector((state) => state);
    const dispatch = useDispatch();
    const auth = async (login, password) => {
        const result = await restService.auth(login, password);
        if (typeof result === "string") {
            dispatch(setTokenAction(result));
        }
       
    };

    return { token, auth };
};
