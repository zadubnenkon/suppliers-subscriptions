import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../../components/Modals/EditModal";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { useSetModal } from "../../api/hooks/appHooks";
import { useGetAuthManager } from "../../api/hooks/authHooks";
import {
    useGetCategories,
    useBackByChainCategory,
    useCrudCategory,
    useGetCategoryByField,
    useGetCategoryManager,
} from "../../api/hooks/categoriesHooks";

export default function CategoriesList() {
    const crud = useCrudCategory();
    const getCategories = useGetCategories();
    const authManager = useGetAuthManager();
    const modal = useSetModal();
    const category = useGetCategoryByField();
    const chainCategory = useBackByChainCategory();
    const manager = useGetCategoryManager();

    const categoriesList = getCategories.map((category) => {
        const newCat = category;
        newCat.action = category.id;
        return newCat;
    });

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        /*{ field: "parentId", headerName: "Родительский ID", width: 130 },*/
        { field: "code", headerName: "Код", width: 120 },
        { field: "name", headerName: "Название", width: 975 },
        {
            field: "action",
            headerName: "Удалить",
            width: 300,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: "2px" }}
                        onClick={() => {
                            category.get("parentId", params.id, false, true);
                        }}
                    >
                        Список
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: "2px" }}
                        onClick={() => {
                            modal.set(true, params.id);
                        }}
                    >
                        Изменить
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "#ff007b",
                        }}
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={() => {
                            crud.remove(params.id);
                        }}
                    >
                        Удалить
                    </Button>
                </strong>
            ),
        },
    ];

    return (
        authManager.token !== "" && (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "52px",
                }}
            >
                <div style={{ height: 550, width: "72%" }}>
                    <Grid container spacing={1}>
                        <Grid xs={12} item={true}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                    modal.set(false);
                                }}
                            >
                                + Добавить категорию
                            </Button>
                        </Grid>
                        <Grid item={true}></Grid>
                        {manager.chainParentIds.length > 0 && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ marginRight: "2px" }}
                                onClick={() => {
                                    chainCategory.goBack();
                                }}
                            >
                                Назад
                            </Button>
                        )}
                    </Grid>

                    <DataGrid
                        rows={categoriesList}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                    <EditModal></EditModal>
                </div>
            </div>
        )
    );
}
