import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import AuthForm from "./components/Authtorization/AuthForm";

const axios = require("axios");

function App() {
    useEffect(() => {
        const headers = {
            "Method": "POST", // *GET, POST, PUT, DELETE, etc.
            "Mode": "cors", // no-cors, *cors, same-origin
            "Cache": "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            "Redirect": "follow", // manual, *follow, error
            "referrerPolicy": "no-referrer", // no-referrer, *client
        };

    

        let data = JSON.stringify({"username":"admin","password":"123987"})

      //   axios.post('https://ut-suppliers-subscriptions.herokuapp.com/auth',
      //   {
      //     method: "POST", // *GET, POST, PUT, DELETE, etc.
      //     mode: "cors", // no-cors, *cors, same-origin
      //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //     redirect: "follow", // manual, *follow, error
      //     referrerPolicy: "no-referrer", // no-referrer, *client
      //     headers: {
      //       'Content-Type': 'application/json;',
      //     },
      
      //     body: data, // body data type must match "Content-Type" header
      // }).then(function (response) {
      //     // handle success
      //     console.log(response);
      //   }).catch(function (response){
      //     console.log(response);
      //   })

        // data= new FormData();
        // data.append("json", JSON.stringify({"username":"admin","password":"123987"}));

        fetch("https://ut-suppliers-subscriptions.herokuapp.com/auth", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            /*headers: {
              'Content-Type': 'application/json',
            },*/
            dataType: 'json',
            body: data, // body data type must match "Content-Type" header
        }).then((response) => {
            console.log(response.json());
        });

        // axios.post('https://ut-suppliers-subscriptions.herokuapp.com/categories', {
        //   name: "Примерная категория",
        //   code: "Example code",
        //   parentId: 6
        // }).then(function (response) {
        //   // handle success
        //   console.log(response);
        // })
    }, []);

    return <AuthForm></AuthForm>;
}

export default App;
