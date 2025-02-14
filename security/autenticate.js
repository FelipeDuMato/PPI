export default function autenticate(req, resp, next){
    if(req.session.autenticate === true) {
        next();
    } else {
        resp.redirect("/login");
    };
};