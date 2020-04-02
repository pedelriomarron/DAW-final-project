const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const visitanteSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    apellidos: { type: String, required: [true, 'Los apellidos son requeridos'] },
    img: { type: String },
    username: { type: String, unique: true, required: [true, 'El username es requerido'] },
    email: { type: String, unique: true, required: [true, 'El email es requerido'] },
    descripcion: { type: String },
    sexo: { type: Boolean },
    sobre_mi: { type: String },
    intereses: { type: String },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    lat: { type: Number },
    lon: { type: Number },
})


visitanteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Visitante', visitanteSchema)