import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useToggleBackDrop } from "../../api/hooks/appHooks";

export default function BackDrop() {
    const backDrop = useToggleBackDrop();

    return (
        <div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={backDrop.state}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
