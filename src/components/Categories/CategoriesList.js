import React from "react";
import { useGetCategories } from "../../api/hooks/categoriesHooks";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/material/styles';





export default function CategoriesList() {
    const getCategories = useGetCategories();

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        /*{ field: "parentId", headerName: "Родительский ID", width: 130 },*/
        { field: "code", headerName: "Код", width: 120 },
        { field: "name", headerName: "Название", width: 675 },
        {
            field: "delete",
            headerName: "Удалить",
            width: 250,
            renderCell: () => (
                <strong>
                     <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{marginRight:'2px'}}
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
                    >
                       Удалить
                    </Button>
                </strong>
            ),
        },
    ];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "52px",
            }}
        >
            <div style={{ height: 400, width: "70%" }}>
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
