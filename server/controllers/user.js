const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require("../services/jwt");

function signUp(req, res) {
    const user = new User();
    const { name, lastname, email, password, repeatPassword } = req.body;
    //user.name = name;
    //user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = "admin";
    user.active = false;

    if(!password || !repeatPassword) {
        res.status(404).send({message: "La contraseña es obligatoria."});
    } else {
        if(password !== repeatPassword) {
            res.status(404).send({message: "Las contraseñas no son iguales."});
        } else {
            bcrypt.hash(password, null, null, function(err, hash) {
                if(err) {
                    res.status(500).send({message: "Error al encriptar."});
                } else {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if(err) {
                            res.status(500).send({message: "Usuario no válido."});
                        } else {
                            if(!userStored) {
                                res.status(404).send({message: "Error al crear el usuario."});
                            } else {
                                res.status(200).send({user: userStored});
                            }
                        }
                    });
                }
            });
        }
    }
}

function signIn(req, res) {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({email}, (err, userStored) => {
        if(err) {
            res.status(500).send({message: "Error en el servidor."});
        } else {
            if(!userStored) {
                res.status(404).send({message: "Credenciales incorrectas."});
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if(err) {
                        res.status(500).send({message: "Error en el servidor."});
                    } else if(!check) {
                        res.status(404).send({message: "Credenciales incorrectas."});
                    } else {
                        if(!userStored.active) {
                            res.status(200).send({code: 200, message: "Usuario inhabilitado."});
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                    }
                });
            }
        }
    })
}

function getUsers(req, res) {
    User.find().then(users => {
        if(!users) {
            res.status(404).send({ message: "No se han encontrado usuarios." });
        } else {
            res.status(200).send({ users });
        }
    });
}

function getUsersActive(req, res) {
    const query = req.query;
    User.find({ active: query.active }).then(users => {
        if(!users) {
            res.status(404).send({ message: "No se han encontrado usuarios." });
        } else {
            res.status(200).send({ users });
        }
    });
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive
};