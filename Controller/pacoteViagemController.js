import PacoteViagem from "../Model/pacoteviagem.js";

export default class pvCtrl {

    gravar(req, resp) {
        if (req.method === "POST" && req.is("application/json")) {
            const dados = req.body;
            const id = dados.id
            const destino = dados.destino;
            const idioma = dados.idioma;
            const moeda = dados.moeda;
            const fusoHorario = dados.fusoHorario;
            const ida = dados.ida;
            const volta = dados.volta;
            const preco = dados.preco;

            if (id && destino && idioma && moeda && fusoHorario && ida && volta && preco) {
                const pacote = new PacoteViagem(id, destino, idioma, moeda, fusoHorario, ida, volta, preco);
                pacote.gravar().then(() => {
                    resp.status(201).json({
                        "status" : true,
                        "mensagem" : "Cliente gravado com sucesso!"
                    });
                }).catch((error) => {
                        resp.status(500).json({
                            "status" : false,
                            "mensagem" : "Erro ao gravar pacote: " + error
                        });
                    });
            } else {
                resp.status(400).json({
                    "status" : false,
                    "mensagem" : "Todos os campos devem ser informados!"
                });
            };
        } else {
            resp.status(400).json({
                "status" : false,
                "mensagem" : "Requisição inválida!"
            });
        };
    };

    alterar(req, resp) {
        if (req.method === "PUT" || req.method === "PATCH" && req.is("application/json")) {
            const dados = req.body;
            const id = dados.id;
            const destino = dados.destino;
            const idioma = dados.idioma;
            const moeda = dados.moeda;
            const fusoHorario = dados.fusoHorario;
            const ida = dados.ida;
            const volta = dados.volta;
            const preco = dados.preco;

            if (id && destino && idioma && moeda && fusoHorario && ida && volta && preco) {
                const pacote = new PacoteViagem(id, destino, idioma, moeda, fusoHorario, ida, volta, preco);
                pacote.atualizar().then(() => {
                    resp.status(201).json({
                        "status" : true,
                        "mensagem" : "Pacote alterado com sucesso!"
                    });
                }).catch((error) => {
                        resp.status(500).json({
                            "status" : false,
                            "mensagem" : "Erro ao alterar pacote: " + error
                        });
                    });
            } else {
                resp.status(400).json({
                    "status" : false,
                    "mensagem" : "Todos os dados devem ser informados!"
                });
            };
        } else {
            resp.status(400).json({
                "status" : false,
                "mensagem" : "Requisição inválida!"
            });
        };
    };

    excluir(req, resp) {
        if (req.method === "DELETE" && req.is("application/json")) {
            const dados = req.body;
            const id = dados.id;

            if (id) {
                const pacote = new PacoteViagem(id)
                pacote.excluir().then(() => {
                    resp.status(201).json({
                        "status" : true,
                        "mensagem" : "Pacote excluído com sucesso!"
                    });
                }).catch((error) => {
                        resp.status(500).json({
                            "status" : false,
                            "mensagem" : "Erro ao excluir o cliente: " + error
                        });
                    });
            } else {
                resp.status(400).json({
                    "status" : false,
                    "mensagem" : "Id do pacote não informado!"
                });
            };
        } else {
            resp.status(400).json({
                "status" : false,
                "mensagem" : "Requisição inválida!"
            });
        };
    };

    listar(req, resp) {
        if (req.method === "GET") {
            const pacote = new PacoteViagem();
            pacote.listar().then((listaPacotes) => {
                resp.status(201).json({
                    "status" : true,
                    "pacotes" : listaPacotes
                });
            }).catch((error) => {
                resp.status(500).json({
                    "status" : false,
                    "mensagem" : "Erro ao consultar pacotes: " + error
                });
            });
        } else {
            resp.status(400).json({
                "status" : false,
                "mensagem" : "Requisição inválida!"
            });
        };
    };
};