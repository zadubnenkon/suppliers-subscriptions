import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../../components/Modals/EditModal";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { DataGrid } from "@mui/x-data-grid";
import { useSetModal } from "../../api/hooks/appHooks";
import { useGetAuthManager } from "../../api/hooks/authHooks";
import {
    useGetCategories,
    useBackByChainCategory,
    useCrudCategory,
    useGetCategoryByField,
    useGetCategoryManager,
    useCheckCategoryExist,
} from "../../api/hooks/categoriesHooks";
import {
    setBreadcrumbs,
    setBreadcrumbsList,
} from "../../redux/actions/categoriesAction";
import { useDispatch } from "react-redux";

export default function CategoriesList() {
    const crud = useCrudCategory();
    const getCategories = useGetCategories();
    const authManager = useGetAuthManager();
    const modal = useSetModal();
    const category = useGetCategoryByField();
    const chainCategory = useBackByChainCategory();
    const manager = useGetCategoryManager();
    const checkCatExist = useCheckCategoryExist();
    const dispatch = useDispatch();

    const categoriesList = getCategories.map((category) => {
        const newCat = category;
        newCat.action = category.id;
        return newCat;
    });

    const isExistCategory = async (id) => {
        let check = false;
        await checkCatExist.check(id).then((result) => {
            check = result;
        });
        return check;
    };

    const openCategoriesList = async (id) => {
        let existCategory = await isExistCategory(id);
        if (existCategory) {
            category.get("parentId", id, false, true);
        }
    };

    async function handleClick(event, id) {
        event.preventDefault();
        let findIndex = -1;
        let existCategory = await isExistCategory(id);

        manager.breadcrumbs.forEach((breadcrumb, index) => {
            if (breadcrumb.id === id) {
                findIndex = index;
            }
        });

        if (!existCategory) {
            findIndex = findIndex - 1;
            id = manager.breadcrumbs[findIndex].id;
        }

        openCategoriesList(id);
        let arBreadcrumbs = [];
        manager.breadcrumbs.forEach((breadcrumb, index) => {
            if (index <= findIndex) {
                arBreadcrumbs.push(breadcrumb);
            }
        });

        dispatch(setBreadcrumbsList(arBreadcrumbs));
    }

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
                            const id = params.row.id;
                            const name = params.row.name;
                            openCategoriesList(id);
                            dispatch(setBreadcrumbs({ id, name }));
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
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                            {manager.breadcrumbs.map((category) => {
                                return (
                                    <Link key={category.id}
                                        underline="hover"
                                        color="inherit"
                                        onClick={(event) =>
                                            handleClick(event, category.id)
                                        }
                                        href="/"
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </div>

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
                        {manager.breadcrumbs.length > 1 && (
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
                        rowsPerPageOptions={[]}
                        checkboxSelection
                    />
                    <EditModal></EditModal>
                </div>
            </div>
        )
    );
}
