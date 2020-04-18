let SEED = require('../config/config').SEED
let jwt = require('jsonwebtoken');

// ======================
// Verificar Token
// ======================

exports.verificaToken = function (req, res, next) {
    let token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token inocrrecto',
                errors: err
            });
        }

        req.usuario_id = decoded.usuario
        next()

    })
}

