import PacoteViagem from "../Model/pacoteviagem.js";

export default class pvCtrl {

    gravar(req, resp) {
        if (req.method === "POST" && req.is("application/json")) {
            const dados = req.body;
            let id = dados.id;
            let destino = dados.destino;
            let idioma = dados.idioma;
            let moeda = dados.moeda;
            let fusoHorario = dados.fusoHorario;
            let ida = dados.ida;
            let volta = dados.volta;
            let preco = dados.preco;
            if (id && destino && idioma && moeda && fusoHorario && ida && volta && preco) {
                const pacoteViagem = new PacoteViagem(id, destino, idioma, moeda, fusoHorario, ida, volta, preco);
                pacoteViagem.gravar().then(() => {
                    resp.status(201).json({
                        "status" : true,
                        "mensagem" : "Pacote Gravado com sucesso!"
                    })
                }).catch((error) => {
                    resp.status(500).json({
                        "status" : false,
                        "mensagem" : "Erro ao gravar o pacote" + error
                    })
                })
            } else {
                resp.status(400).json(
                    {
                    "status" : false,
                    "mensagem" : "Todos os campos devem ser preenchidos!"
                })
            }
        } else {
            resp.status(400).json({
                "status" : false,
                "mensagem" : "Requisição inválida!"
            })
        }
    }

    alterar(req, resp) {
        if (req.method === "PUT" || req.method === "PATCH" && req.is("application/json")) {
            const dados = req.body
            let id = dados.id
            let destino = dados.destino
            let idioma = dados.idioma
            let moeda = dados.moeda
            let fusoHorario = dados.fusoHorario
            let ida = dados.ida
            let volta = dados.volta
            let preco = dados.preco
            if (id && destino && idioma && moeda && fusoHorario && ida && volta && preco) {
                const pacote = PacoteViagem(id, destino, idioma, moeda, fusoHorario, ida, volta, preco)
                pacote.alterar().then(() => {
                    resp.status(201).json({
                        "status" : true,
                        "mensagem" : "Pacote alterado com sucesso!"
                    }).catch((error) => {
                        resp.status(500).json({
                            "status" : false,
                            "mensagem" : "Erro ao alterar o pacote: " + error
                        })
                    })
                })
            } else {
                resp.status(400).json({
                    "status" : false,
                    "mensagem" : "Todos os campos devem ser preenchido!"
                })
            }
        } else {
            resp.status(400).json({
                "status" : false,
                "mensagem" : "Requisição Inválida!"
            })
        }
    }

    excluir(req, resp) {
        if (req.method === "DELETE" && req.is("application/json")) {
            const dados = req.body
            let id = dados.id
            if (id) {
                const pacote = new PacoteViagem(id)
                pacote.excluir().then(() => {
                    resp.status(201).json({
                        "status" : true,
                        "mensagem" : "Pacote excluído com sucesso!"
                    }).catch((error) => {
                        resp.status(500).json({
                            "status" : false,
                            "mensagem" : "Erro ao excluir pacote:" + error
                        })
                    })
                })
            } else {
                resp.status(400).json({
                    "status" : false,
                    "mensagem" : "O id deve ser informado!"
                })
            }
        } else {
            resp.status(400).json({
                "status" : false,
                "mensagem" : "Requisição Inválida"
            })
        }

    }

    listar(req, resp) {
        if (req.methos === "GET") {
            const pacote = new PacoteViagem()
            pacote.listar().then((listaPacotes) => {
                resp.status(201).json({
                    "status" : true,
                    "Clientes" : listaPacotes
                })
            }).catch((error) => {
                resp.status(500).json({
                    "status" : false,
                    "mensagem" : "Erro ao listar pacotes:" + error
                })
            })
        }
    }

}