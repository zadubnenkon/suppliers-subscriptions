import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useChangeInputHandler } from "../../api/hooks/eventHooks";
import { setOpenEditModal } from "../../redux/actions/appAction";
import { useDispatch } from "react-redux";
import { useCrudManager } from "../../api/hooks/categoriesHooks";
import { useGetCategoryManager } from "../../api/hooks/categoriesHooks";

export default function EditCategory() {
    const inputHandler = useChangeInputHandler();
    const crudManager = useCrudManager();
    const dispatch = useDispatch();
    const categoryManager = useGetCategoryManager();

    const submitHandler = (event) => {
        event.preventDefault();
        crudManager.manage(inputHandler.state.name, inputHandler.state.code);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <TextField
                    error={crudManager.manager.nameCategoryError !== "" && true}
                    style={{ marginBottom: "10px" }}
                    label="Название"
                    placeholder="Введите название категории"
                    fullWidth
                    required
                    name="name"
                    onChange={(event) => {
                        inputHandler.setField(event);
                    }}
                    defaultValue={categoryManager.selectedCategory.name}
                    helperText={crudManager.manager.nameCategoryError}
                />
                <TextField
                    error={crudManager.manager.codeCategoryError !== "" && true}
                    label="Код"
                    placeholder="Введите код"
                    fullWidth
                    required
                    name="code"
                    onChange={(event) => {
                        inputHandler.setField(event);
                    }}
                    defaultValue={categoryManager.selectedCategory.code}
                    helperText={crudManager.manager.codeCategoryError}
                    style={{marginBottom:'8px'}}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Button
                                onClick={()=>{dispatch(setOpenEditModal(false))}}
                                color="primary"
                                variant="contained"
                            >
                                Закрыть
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                style={{marginLeft:'13px'}}
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Добавить
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </div>
    );
}
