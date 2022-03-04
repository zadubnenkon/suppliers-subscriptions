import React from "react";
import { useGetCategories } from "../../api/hooks/categoriesHooks";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../../components/Modals/EditModal";
import { useCrudCategory, useGetCategoryByField } from "../../api/hooks/categoriesHooks";
import { useSetModal } from "../../api/hooks/appHooks";
import { useGetAuthManager } from "../../api/hooks/authHooks";

export default function CategoriesList() {
    const crud = useCrudCategory();
    const getCategories = useGetCategories();
    const authManager = useGetAuthManager();
    const modal = useSetModal();
    const category = useGetCategoryByField();

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
            width: 250,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: "2px" }}
                        onClick={() => {
                            category.get("parentId", params.id, false);
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
        authManager.token !== '' &&
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "52px",
            }}
        >
            <div style={{ height: 550, width: "70%" }}>
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
    );
}
