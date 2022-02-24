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

     sendRequest = async (method, data, action) => {
        let result = {};
        await axios({
            method: method,
            url: this.url + action,
            data: data,
            headers: this.headers,
        })
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
            { username: login, password: password },
            "auth"
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

    getMessageInternalError = () => {
        const errorObject = {
            message:
                "Внутренняя ошибка сервера. Не удалось обработать данные. Проверьте вводные данные и попробуйте еще раз.",
            statusCode: 500,
        };
        return errorObject;
    };
}
