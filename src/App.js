import "./App.css";
import React from "react";
import AuthForm from "./components/Authtorization/AuthForm";
import CategoriesList from "./components/Categories/CategoriesList";
import BackDrop from "./components/Backdrop/BackDrop"
//test app netifly
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
