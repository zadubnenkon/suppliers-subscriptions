import "./App.css";
import React from "react";
import AuthForm from "./components/Authtorization/AuthForm";
import { useGetAuthManager } from "./api/hooks/authHooks";

function App() {
    const authManager = useGetAuthManager();
    return (authManager.token === '' && <AuthForm></AuthForm>);
}

export default App;
