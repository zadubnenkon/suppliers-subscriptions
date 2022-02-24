import "./App.css";
import React from "react";
import AuthForm from "./components/Authtorization/AuthForm";
import { useGetAuthManager } from "./api/hooks/authHooks";
import CategoriesList from "./components/Categories/CategoriesList";

function App() {
    const authManager = useGetAuthManager();
    return (authManager.token === '' ? <AuthForm></AuthForm> : <CategoriesList></CategoriesList>) ;
}

export default App;
