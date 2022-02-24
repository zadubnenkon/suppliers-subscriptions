import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuthtorize } from "../../api/hooks/authHooks";
import { useChangeInputHandler } from "../../api/hooks/eventHooks";
import { useGetAuthManager } from "../../api/hooks/authHooks";
import FormHelperText from '@mui/material/FormHelperText';

const paperStyle = {
    padding: 20,
    height: "35vh",
    width: 350,
    margin: "0 auto",
};

const btnstyle = { margin: "8px 0" };

export default function AuthForm() {
    const authtorization = useAuthtorize();
    const inputHandler = useChangeInputHandler('');
    const authManager = useGetAuthManager();
    const errPassword = authManager.errorPassword;
    const errLogin =  authManager.errorLogin;
    
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "150px",
            }}
        >
            
            <Grid>
                <Paper style={paperStyle}>
                    <Grid align="center" style={{ marginTop: "15px" }}>
                        <h2>Авторизация</h2>
                    </Grid>
                    <TextField
                     error={errLogin !== '' && true}
                        style={{ marginBottom: "10px" }}
                        label="Логин"
                        placeholder="Введите имя"
                        fullWidth
                        required
                        name="login"
                        onChange={(event)=>{inputHandler.setField(event)}}
                        helperText={errLogin}
                    />
                    <TextField
                        error={errPassword !== '' && true}
                        label="Пароль"
                        placeholder="Введите пароль"
                        type="password"
                        fullWidth
                        required
                        name="password"
                        onChange={(event)=>{inputHandler.setField(event)}}
                        helperText={errPassword}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                        onClick={()=>{authtorization.auth(inputHandler.state.login, inputHandler.state.password)}}
                    >
                        Войти
                    </Button>
                    <FormHelperText style={{color:'red'}}>{authManager.errorAuth}</FormHelperText>
                </Paper>
            </Grid>
        </div>
    );
}
