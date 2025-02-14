export default function autenticate(req, resp, next){
    if(req.session.autenticated === true) {
        next();
    } else {
        resp.redirect("/login");
    };
};