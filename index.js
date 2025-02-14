import express from "express";
import autenticate from "./security/autenticate.js";
import session from "express-session";

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