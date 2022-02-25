import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGetAppManager } from "../../api/hooks/appHooks";
import EditCategory from "../Categories/EditCategory";
import ErrorModal from "../Modals/ErrorModal"
import { useGetCategoryManager } from "../../api/hooks/categoriesHooks";
import { setOpenEditModal } from "../../redux/actions/appAction";
import { useDispatch } from "react-redux";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function EditModal() {
    const appManager = useGetAppManager();
    const categoryManager = useGetCategoryManager();
    const message = categoryManager.categoryError;
    const dispatch = useDispatch();
    
    return (
        <div>
            <Modal
                open={appManager.isOpenEditModal}
                onClose={()=>{dispatch(setOpenEditModal(false))}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component={"div"}
                    >
                        {appManager.isEditModal === true ? 'Изменить категорию' : 'Добавить категорию'  }
                    </Typography>
                    <Typography
                        component={"div"}
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                    >
                    <EditCategory></EditCategory>
                    </Typography>
                </Box>
            </Modal>
            <ErrorModal props={{message}} ></ErrorModal>
        </div>
    );
}
