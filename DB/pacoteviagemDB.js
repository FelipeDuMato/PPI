import connect from "./connectionDB.js";
import PacoteViagem from "../Model/pacoteviagem.js";

export default class PacoteViagemDB {

    constructor() {
        this.init();
    }
    
    async init(){
        try {
        const connection = await connect();
        const sql = `CREATE TABLE IF NOT EXISTS pacoteviagem (
        id INT NOT NULL,
        destino VARCHAR(100) NOT NULL,
        idioma VARCHAR(50) NOT NULL,
        moeda VARCHAR(50) NOT NULL,
        fusohorario VARCHAR(6) NOT NULL,
        ida VARCHAR(10) NOT NULL,
        volta VARCHAR(10) NOT NULL,
        preco DOUBLE NOT NULL)`;
        await connection.execute(sql);
        } catch (error) {
            console.log("Erro ao criar a tabela pacoteviagem: " + error);
        }
    }

    async gravar(pacoteViagem){
        if (pacoteViagem instanceof PacoteViagem) {
            const connection = await connect();
            const sql = `INSERT INTO pacoteviagem (id, destino, idioma, moeda, fusohorario, ida, volta, preco) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const param = [
                pacoteViagem.id,
                pacoteViagem.destino,
                pacoteViagem.idioma,
                pacoteViagem.moeda,
                pacoteViagem.fusoHorario,
                pacoteViagem.ida,
                pacoteViagem.volta,
                pacoteViagem.preco
            ]
            await connection.execute(sql, param);
            await connection.release();
        }
    }
    async atualizar(pacoteViagem){
        if (pacoteViagem instanceof PacoteViagem) {
            const connection = await connect();
            const sql = `UPDATE pacoteviagem SET destino = ?, idioma = ?, moeda = ?, fusohorario = ?, ida = ?, volta = ?, preco = ? WHERE id = ?`;
            const param = [
                pacoteViagem.destino,
                pacoteViagem.idioma,
                pacoteViagem.moeda,
                pacoteViagem.fusoHorario,
                pacoteViagem.ida,
                pacoteViagem.volta,
                pacoteViagem.preco,
                pacoteViagem.id
            ];
            await connection.execute(sql, param);
            await connection.release();
        }
    }
    async excluir(pacoteViagem){
        if (pacoteViagem instanceof PacoteViagem) {
            const connection = await connect();
            const sql = `DELETE FROM pacoteviagem WHERE id = ?`;
            const param = [pacoteViagem.id];
            await connection.execute(sql, param);
            await connection.release();
        }
    }
    async listarDB(){
        const connection = await connect();
        const sql = `SELECT * FROM pacoteviagem`;
        const [registros, campos] = await connection.execute(sql);
        await connection.release();
        let listaPacotes = []
        for (const registro of registros) {
            const pacote = new PacoteViagem(
                registro.id,
                registro.destino,
                registro.idioma,
                registro.moeda,
                registro.fusohorario,
                registro.ida,
                registro.volta,
                registro.preco
            )
            listaPacotes.push(pacote);
        }
        return listaPacotes;
    }
}