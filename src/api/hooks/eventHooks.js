import { useState } from "react";
import { useSelector } from "react-redux";

export const useChangeInputHandler = (event) => {
    const currentState = useSelector((state) => state);
    const [state, setState] = useState({ ...currentState, login: '', password: '' });

    const setField = (event) => {
        setState((prev) =>({
            ...prev,
            ...{ [event.target.name]: event.target.value },
        }));
    };

    return {
        state,
        setField,
    };
};