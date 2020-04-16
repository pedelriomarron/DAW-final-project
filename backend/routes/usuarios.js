var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
let Visitante = require('../models/usuario')


// ======================
// Coger Visitantes (GET)
// ======================
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


// ======================
// Crear Visitante (POST)
// ======================
router.post('/', function (req, res, next) {

    let body = req.body;

    let visitante = new Visitante({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        username: body.username,
        apellidos: body.apellidos
    });

    visitante.save((err, visitanteGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear visitante',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            visitante: visitanteGuardado,
        });
    });
})


// ======================
// Actualizar Visitante (PUT)
// ======================
router.put('/:id', function (req, res, next) {

    let id = req.params.id

    Visitante.findById(id, (err, visitante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar visitante',
                errors: err
            });
        }
        if (!visitante) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El visitante con ese ID no existe',
                errors: { message: 'No existe un visitante con ese ID' }
            });
        }

        let body = req.body;

        visitante.nombre = body.nombre,
            visitante.email = body.email,
            visitante.username = body.username,
            visitante.apellido = body.apellidos

        visitante.save((err, visitanteGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar visitante',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                visitante: visitanteGuardado,
            });
        });
    })



})


// ======================
// Borrar Visitante (delete)
// ======================
router.delete('/:id', function (req, res, next) {
    let id = req.params.id
    Visitante.findByIdAndRemove(id, (err, visitanteBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar visitante',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            visitante: visitanteBorrado,
        });
    })


})

module.exports = router;
