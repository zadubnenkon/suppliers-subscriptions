import "./App.css";
import React from "react";
import AuthForm from "./components/Authtorization/AuthForm";
import CategoriesList from "./components/Categories/CategoriesList";
import BackDrop from "./components/Backdrop/BackDrop"

function App() {
    return (
        <div>
            <BackDrop />
            <AuthForm />
            <CategoriesList />
        </div>
    );
}

export default App;
