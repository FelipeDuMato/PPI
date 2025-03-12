import { Router } from "express";
import pvCtrl from "../Controller/PacoteViagemCtrl.js";

const rotaPacote = Router();
const pacCtrl = new pvCtrl()

rotaPacote.get("/", pacCtrl.listar)
rotaPacote.post("/", pacCtrl.gravar)
rotaPacote.put("/", pacCtrl.alterar)
rotaPacote.patch("/", pacCtrl.alterar)
rotaPacote.delete("/", pacCtrl.excluir)

export default rotaPacote