import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useGetAppManager } from "../../api/hooks/appHooks";
import { useDispatch } from "react-redux";
import { setOpenSnackBar } from "../../redux/actions/appAction";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorModal(error) {
    const appManager = useGetAppManager();
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(setOpenSnackBar(false));
    };

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={appManager.isOpenErrorSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {error.props.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
