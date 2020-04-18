var express = require('express');
var router = express.Router();
let Evento = require('../models/evento')
let mdAutenticacion = require('../middlewares/autenticacion')

// ======================
// Coger Eventos (GET)
// ======================
router.get('/', function (req, res, next) {

    let desde = req.query.desde || 0
    desde = Number(desde)


    Evento.find({}, '')
        .skip(desde)
        .limit(5)
        .populate('usuario', ' username')
        .exec(
            (err, eventos) => {
                if (err) res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando Evento',
                    errors: err
                })

                Evento.count({}, (err, total) => {
                    res.status(200).json({
                        ok: true,
                        total: total,
                        eventos
                    })
                })

            }
        )
});

// ======================
// Crear Evento (POST)
// ======================
router.post('/', mdAutenticacion.verificaToken, function (req, res, next) {

    let body = req.body;

    let evento = new Evento({
        titulo: body.titulo,
        fechaComienzo: body.fechaComienzo,
        fechaFin: body.fechaFin,
        hashtag: body.hashtag,
        aforo: body.aforo,
        precio: body.precio,
        lat: body.lat,
        lon: body.lon,
        descripcion: body.descripcion,
        usuario: req.usuario_id,
    });

    evento.save((err, eventoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Evento',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            Evento: eventoGuardado,
        });
    });
})





// ======================
// Actualizar Evento (PUT)
// ======================
router.put('/:id', mdAutenticacion.verificaToken, function (req, res, next) {

    let id = req.params.id

    Evento.findById(id, (err, evento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Evento',
                errors: err
            });
        }
        if (!evento) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Evento con ese ID no existe',
                errors: { message: 'No existe un Evento con ese ID' }
            });
        }

        let body = req.body;

        evento.titulo = body.titulo;
        evento.fechaComienzo = body.fechaComienzo;
        evento.fechaFin = body.fechaFin;
        evento.hashtag = body.hashtag;
        evento.aforo = body.aforo;
        evento.precio = body.precio;
        evento.lat = body.lat
        evento.lon = body.lon
        evento.descripcion = body.descripcion
        evento.usuario = req.usuario_id


        evento.save((err, eventoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar Evento',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                Evento: eventoGuardado,
            });
        });
    })



})






// ======================
// Borrar Evento (delete)
// ======================
router.delete('/:id', function (req, res, next) {
    let id = req.params.id
    Evento.findByIdAndRemove(id, (err, eventoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Evento',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            Evento: eventoBorrado,
        });
    })


})


module.exports = router