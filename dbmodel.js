const mongoose = require('mongoose')
const tabla_usuarios = new mongoose.Schema({ //Creado el objeto del modelo de dato que necesito
    cedula : Number,
    correo : String,
    nombre : String,
    apellido : String,
    clave : String,
    datetime : Date
})

const UsuariosModel = mongoose.model("Usuarios", tabla_usuarios)

module.exports = {
    UsuariosModel
}