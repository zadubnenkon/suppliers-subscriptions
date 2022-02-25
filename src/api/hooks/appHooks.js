import { useSelector } from "react-redux";
import { setOptionModal } from "../../redux/actions/appAction";
import { useDispatch } from "react-redux";
import { setOpenEditModal } from "../../redux/actions/appAction";
import { setCategoryId } from "../../redux/actions/categoriesAction";
import { useGetCategoryById } from "./categoriesHooks";
import { setOpenSnackBar } from "../../redux/actions/appAction";
import { setCategoryError } from "../../redux/actions/categoriesAction";

export const useGetAppManager = () => {
    return useSelector((state) => state.appManager);
};

export const useSetModal = () => {
    const dispatch = useDispatch();
    const category = useGetCategoryById();

    const set = async (isEdit = false, id = null) => {
        let isExit = false;
        if(id != null) {
            dispatch(setCategoryId(id));
            isExit = await category.get(id);
        }
        
        if(category.state.id > 0 && isExit === true) {
            dispatch(setOptionModal(isEdit));
            dispatch(setOpenEditModal(true));
        } else {
            dispatch(setOpenSnackBar(true));
            dispatch(setCategoryError('Выбранной категории больше не существует в базе!'));
        }
    };
    return {set};
};
