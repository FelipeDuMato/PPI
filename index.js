import express from "express";
import rotaPacote from "./Routes/rotaPacote.js";

const porta = 3000;
const localhost = "0.0.0.0";

const app = express();
app.use(express.json());

app.use("/pacotes", rotaPacote);

app.listen(porta, localhost, () =>{
    console.log("Serividor rodando em: http://"+localhost+":"+porta);
});