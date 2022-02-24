import React from "react";
import { useGetCategories } from "../../api/hooks/categoriesHooks";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "parentId", headerName: "Родительский ID", width: 130 },
    { field: "name", headerName: "Название", width: 130 },
    { field: "code", headerName: "Код", width: 130 },
];

export default function CategoriesList() {
    const getCategories = useGetCategories();

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop:"52px" }}>
            <div style={{ height: 400, width: "50%" }}>
                <DataGrid
                    rows={getCategories}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}
