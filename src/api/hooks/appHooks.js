import { useSelector } from "react-redux";

export const useGetAppManager = () => {
    return useSelector((state) => state.appManager);
};