import "./App.css";
import React from "react";
import AuthForm from "./components/Authtorization/AuthForm";
import CategoriesList from "./components/Categories/CategoriesList";
import BackDrop from "./components/Backdrop/BackDrop"
import ButtonAppBar from './components/AppBar/index';
//test app netifly
function App() {
    return (
        <>
            <ButtonAppBar />
            <BackDrop />
            <AuthForm />
            <CategoriesList />
        </>
    );
}

export default App;
