import express from "express";

import autenticate from "./security/autenticate.js";

const porta = 3000;
const localhost = "0.0.0.0";
const app = express();

app.use(express.static("./public"))

app.use(autenticate, express.static("./private"))

app.listen(porta, localhost, () => {
    console.log(`Servidor está rodando em: http://${localhost}:${porta}`);
});