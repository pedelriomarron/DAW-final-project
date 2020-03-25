var express = require('express');
var router = express.Router();
let Visitante = require('../models/visitante')

/* GET users listing. */
router.get('/', function (req, res, next) {

    Visitante.find({}, 'nombre email')
        .exec(
            (err, visitantes) => {
                if (err) res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando visitantes',
                    errors: err
                })
                res.status(200).json({
                    ok: true,
                    visitantes
                })
            }
        )
});

module.exports = router;
