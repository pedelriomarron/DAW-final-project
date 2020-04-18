const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;



const eventoSchema = new Schema({
    titulo: { type: String, required: [true, 'El titulo es requerido'] },
    img: { type: String },
    fechaComienzo: { type: Date },
    fechaFin: { type: Date },
    descripcion: { type: String },
    hashtag: { type: String },
    aforo: { type: Number },
    precio: { type: Number, required: [true, 'El precio es requerido'], default: 0 },
    lat: { type: Number },
    lon: { type: Number },
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario" }
})


eventoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Evento', eventoSchema)