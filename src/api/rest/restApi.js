const axios = require("axios");

export default class RestApi {
    constructor(token = "") {
        this.statusPostOk = 201;
        this.statusGetOk = 200;
        this.statusInternalError = 500;
        this.statusBadRequest = 400;
        this.statusUnAuthorized = 401;

        this.token = token;
        this.url = process.env.NODE_ENV === 'production' ? `//api.${window.location.host}` : "https://ut-suppliers-subscriptions.herokuapp.com/";
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
    }

    sendRequest = async (method, action, data = null) => {
        let result = {};
        if (this.token !== "") {
            this.headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + this.token,
            };
        }

        const axiosObj = {
            method: method,
            url: this.url + action,
            headers: this.headers,
        };

        if (data != null) {
            axiosObj.data = data;
        }

        await axios(axiosObj)
            .then(function (response) {
                result = response;
            })
            .catch(function (error) {
                result = error.response;
            });
        return result;
    };

    auth = async (login, password) => {
        const result = await this.sendRequest("post", "auth", {
            username: login,
            password: password,
        });

        if (result.status === this.statusPostOk) {
            this.token = result.data.token;
            return this.token;
        }

        return this.getMessageInternalError(result);
    };

    getCategories = async () => {
        return await this.sendRequest("get", "categories");
    };

    addCategory = async (name, code, parentId = null) => {
        const result = await this.sendRequest("post", "categories", {
            name,
            code,
            parentId: parentId,
        });

        if (result.status === this.statusPostOk) {
            return result.data.id;
        }

        return this.getMessageInternalError(result);
    };

    updateCategory = async (id, name, code, parentId = null) => {
        const result = await this.sendRequest("put", "categories", {
            id,
            name,
            code,
            parentId: parentId,
        });

        if (result.status === this.statusGetOk) {
            return result.data;
        }

        return this.getMessageInternalError(result);
    };

    deleteCategory = async (id) => {
        const result = await this.sendRequest("delete", "categories/?id=" + id);
        const categories = await this.getCategoryByField("parentId", id);
        if(categories.data.length > 0) {
            categories.data.forEach((category)=> {
                this.sendRequest("delete", "categories/?id=" + category.id);
            });
        }

        if (result.status === this.statusGetOk) {
            return result;
        }
        return false;
    };

    getCategoryById = async (id) => {
        const result = await this.sendRequest("get", "categories/?id=" + id);
        if (result.status === this.statusGetOk) {
            return result;
        }

        return this.getMessageInternalError(result);
    };

    getCategoryByField = async (field = "id", value = "") => {
        const result = await this.sendRequest(
            "get",
            "categories/?" + field + "=" + value
        );
        if (result.status === this.statusGetOk) {
            return result;
        }

        return this.getMessageInternalError(result);
    };

    getMessageInternalError = (data) => {
        const errorObject = {
            message:
                "Внутренняя ошибка сервера. Не удалось обработать данные. Проверьте вводные данные и попробуйте еще раз.",
            status: 500,
        };

        if (data.status === this.statusInternalError) {
            return errorObject;
        }

        return data;
    };
}
