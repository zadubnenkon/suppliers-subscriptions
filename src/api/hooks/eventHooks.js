import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCategoryManager } from "../../api/hooks/categoriesHooks";

export const useChangeInputHandler = (event) => {
    const currentState = useSelector((state) => state);
    const categoryManager = useGetCategoryManager();

    const [state, setState] = useState({
        ...currentState,
        login: "",
        password: "",
        name: categoryManager.selectedCategory.name,
        code: categoryManager.selectedCategory.code,
    });

    const setField = (event) => {
        setState((prev) => ({
            ...prev,
            ...{ [event.target.name]: event.target.value },
        }));
    };

    return {
        state,
        setField,
    };
};
