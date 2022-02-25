import { useSelector } from "react-redux";
import { setOptionModal } from "../../redux/actions/appAction";
import { useDispatch } from "react-redux";
import { setOpenEditModal } from "../../redux/actions/appAction";
import { setCategoryId } from "../../redux/actions/categoriesAction";
import { useGetCategoryById } from "./categoriesHooks";
import { setOpenSnackBar } from "../../redux/actions/appAction";
import { setCategoryError } from "../../redux/actions/categoriesAction";
import { toggleBackDrop } from "../../redux/actions/appAction";

export const useGetAppManager = () => {
    return useSelector((state) => state.appManager);
};

export const useSetModal = () => {
    const dispatch = useDispatch();
    const category = useGetCategoryById();
    const backDrop = useToggleBackDrop();

    const set = async (isEdit = false, id = null) => {
        let result = false;
        backDrop.toggle(true);
        dispatch(setCategoryId(id));
        if (id != null) {
            result = await category.get(id);
        }
        if (result === true || isEdit === false) {
            dispatch(setOptionModal(isEdit));
            dispatch(setOpenEditModal(true));
        } else {
            dispatch(setOpenSnackBar(true));
            dispatch(
                setCategoryError(
                    "Выбранной категории больше не существует в базе!"
                )
            );
        }
        backDrop.toggle(false);
    };
    return { set };
};

export const useToggleBackDrop = () => {
    const dispatch = useDispatch();
    const manager = useGetAppManager();

    const toggle = (isBackDropOn) => {
        dispatch(toggleBackDrop(isBackDropOn));
    };
    return { state: manager.isBackDropOn, toggle };
};
