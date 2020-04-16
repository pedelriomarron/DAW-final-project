let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let app = express();
let Usuario = require('../models/usuario')

app.post('/', (req, res) => {

    let body = req.body;


    Usuario.findOne({ email: body.email }, (err, UsuarioBD) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error sal buscar usuario',
                errors: err
            });
        }

        if (!UsuarioBD) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas email ',
            });
        }

        if (!bcrypt.compareSync(body.password, UsuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas password ',
            });
        }

        //Crear token de login
        UsuarioBD.password = ":!"
        let token = jwt.sign({ usuario: UsuarioBD }, 'hola', { expiresIn: 14400 })


        return res.status(200).json({
            ok: true,
            usuario: UsuarioBD,
            token,
            id: UsuarioBD._id
        });



    })



})


module.exports = app