import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import EditModal from "../../components/Modals/EditModal";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
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
import { setParentId } from "../../redux/actions/categoriesAction";
import { Container } from "@mui/material";

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
        { field: "name", headerName: "Название", flex: 1, minWidth: 400 },
        {
            field: "action",
            headerName: "Действия",
            width: 150,
            renderCell: (params) => (
                <strong>
                    <IconButton
                        color="primary"
                        size="small"
                        component="span"
                        onClick={() => {
                            const id = params.row.id;
                            const name = params.row.name;
                            openCategoriesList(id);
                            dispatch(setBreadcrumbs({ id, name }));
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        size="small"
                        component="span"
                        onClick={() => {
                            modal.set(true, params.id);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        size="small"
                        component="span"
                        onClick={() => {
                            crud.remove(params.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    return (
        authManager.token !== "" && (
            <div style={{marginTop: "30px",}}>
                <Container style={{ height: 550 }}>
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                            {manager.breadcrumbs.map((category) => {
                                return (
                                    <Link
                                        key={category.id}
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

                    <Grid style={{ marginTop: 1, marginBottom: "10px" }} container spacing={1}>
                        <Grid item={true}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {
                                    if (manager.breadcrumbs.length === 1) {
                                        dispatch(setParentId(null));
                                    }
                                    modal.set(false);
                                }}
                            >
                                + Добавить категорию
                            </Button>
                        </Grid>
                        {manager.breadcrumbs.length > 1 && (
                            <Grid item={true}>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        chainCategory.goBack();
                                    }}
                                >
                                    Назад
                                </Button>
                            </Grid>
                        )}
                    </Grid>

                    <DataGrid
                        rows={categoriesList}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[]}
                    // checkboxSelection
                    />
                    <EditModal></EditModal>
                </Container>
            </div>
        )
    );
}
