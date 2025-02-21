import express from "express";
import autenticate from "./security/autenticate.js";
import session from "express-session";
import PacoteViagem from "./Model/pacoteviagem.js";

var pacote = new PacoteViagem(1, "Benidorm, Comunidade Valenciana, Espanha", "Espanhol", "Euro", "UTC+1", "10/07/2025", "17/07/2025", 4000);

var pacote1 = new PacoteViagem(2, "Ilha Maurício (Mauritius), África", "Inglês (oficial), Crioulo Mauriciano e Francês", "Rupia Mauriciana (MUR)", "UTC+4", "05/12/2025", "15/12/2025", 5130);

// pacote.gravar().then(() => {
//     console.log("Pacote gravado com sucesso!");
// }).catch((error) => {
//     console.log("Erro ao gravar o pacote: " + error);
// });

// pacote.atualizar().then(() => {
//     console.log("Pacote atualizado com sucesso!");
// }).catch((error) => {
//     console.log("Erro ao atualizar o pacote: " + error);
// });

// pacote.excluir().then(() => {
//     console.log("Pacote excluído com sucesso!");
// }).catch((error) => {
//     console.log("Erro ao excluir o pacote: " + error);
// });

// pacote.listar().then((listaPacotes) => {
//     for (const cliente of listaPacotes) {
//         console.log(cliente.toJSON());
//     }
// })


const porta = 3000;
const localhost = "0.0.0.0";
const app = express();
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: "M1nh@Ch4v3",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}));

app.get("/login", (req, resp) => {
    resp.redirect('/login.html');
});

app.post("/login", (req, resp) => {
    const login = req.body.login;
    const password = req.body.password;
    if (login === "admin" && password === "admin") {
        req.session.autenticated = true;
        resp.redirect('/paginilog.html');
    } else {
        resp.redirect('/login.html');
    };
});

app.get("/logout", (req, resp) => {
    req.session.destroy();
    resp.redirect("/pagini.html")
});

app.use(express.static("./public"));

app.use(autenticate, express.static("./private"));

app.listen(porta, localhost, () => {
    console.log(`Servidor está rodando em: http://${localhost}:${porta}`);
    console.log(`Recomendo entrar inicialmente na página: http://localhost:${porta}/pagini.html`)
});