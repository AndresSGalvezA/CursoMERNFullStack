const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "tMAciLx0dEKXfCg8fadDnv9O8yRe8W8l";

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: "La petición no tiene cabecera de autenticación." });
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRET_KEY);

        if(payload.exp <= moment.unix()) {
            return res.status(404).send({ message: "Token expirado." });
        }
    } catch (ex) {
        //console.log(ex.message);
        return res.status(404).send({ message: "Token inválido" });
    }

    req.user = payload;
    next();
}