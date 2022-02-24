const axios = require("axios");

export default class RestApi {
    constructor() {
        this.statusPostOk = 201;
        this.statusGetOk = 200;
        this.statusInternalError = 500;
        this.statusBadRequest = 400;
        this.statusUnAuthorized = 401;

        this.token = "";
        this.url = "https://ut-suppliers-subscriptions.herokuapp.com/";
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
                "Authorization": "Bearer " + this.token,
            };
        }

        const axiosObj = {
            method: method,
            url: this.url + action,
            headers: this.headers,
        };

        if(data != null) {
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
        const result = await this.sendRequest(
            "post",
            "auth",
            { username: login, password: password }
        );

        if (result.status === this.statusPostOk) {
            this.token = result.data.token;
            return this.token;
        }

        if (result.status === this.statusInternalError) {
            return this.getMessageInternalError();
        }

        return result;
    };

    getCategories = async () => {
       return await this.sendRequest("get", "categories");
    };

    getMessageInternalError = () => {
        const errorObject = {
            message:
                "Внутренняя ошибка сервера. Не удалось обработать данные. Проверьте вводные данные и попробуйте еще раз.",
            status: 500,
        };
        return errorObject;
    };
}
