import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const paperStyle = {
    padding: 20,
    height: "35vh",
    width: 350,
    margin: "0 auto",
};
const btnstyle = { margin: "8px 0" };

export default function AuthForm() {
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
                        style={{ marginBottom: "10px" }}
                        label="Логин"
                        placeholder="Введите имя"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Пароль"
                        placeholder="Введите пароль"
                        type="password"
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Войти
                    </Button>
                </Paper>
            </Grid>
        </div>
    );
}
