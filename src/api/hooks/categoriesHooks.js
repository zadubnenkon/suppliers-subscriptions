import { useSelector } from "react-redux";

export const useGetCategories = () => {
    return useSelector((state) => state.categoriesManager.categoriesList);
}