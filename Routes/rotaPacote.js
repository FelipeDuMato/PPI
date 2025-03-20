import { Router } from "express";
import pvCtrl from "../Controller/pacoteViagemController.js";

const rotaPacote = Router();
const pacoteCtrl = new pvCtrl();

rotaPacote.get("/", pacoteCtrl.listar);
rotaPacote.post("/", pacoteCtrl.gravar);
rotaPacote.put("/", pacoteCtrl.alterar);
rotaPacote.patch("/", pacoteCtrl.alterar);
rotaPacote.delete("/", pacoteCtrl.excluir);

export default rotaPacote;