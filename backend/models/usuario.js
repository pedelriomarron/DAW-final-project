const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

let roles = {
    values: ['ADMIN_ROLE', 'VISITANTE_ROLE', 'ORGANIZADOR_ROLE'],
    message: '{VALUE} no es un rol valido'
}


const usuarioSchema = new Schema({
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
    role: { type: String, required: true, default: 'VISITANTE_ROLE', enum: roles },
    activate: { type: Boolean, default: false }
})


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Usuario', usuarioSchema)