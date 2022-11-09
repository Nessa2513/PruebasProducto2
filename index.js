const fs = require('fs')
const express = require('express')
const res = require('express/lib/response')
const { application } = require('express')
const app = express()
const bodyParser = require('body-parser')
const puerto = 3000
const mongoose = require('mongoose')
const dbmodel = require('./dbmodel')
const config = require('./config')
const { callbackify } = require('util')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const cors = require('cors')

// Dos tipos de registro; Timestamp para cuando fue creado y otro para cuando fue actualizado (CreatedAt y UpdateAt) - se ve en la documentación de Mongoose

const connectionString = "mongodb+srv://nessacardenasm:yolo2504@prueba1.txegamx.mongodb.net/?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())
app.set('llave', config.llave)

const rutasProtegidas = express.Router() //Metodo Router y se agrega a esta constante

rutasProtegidas.use((req, res, next)=>{
    // Permiso que le doy a la gente para que consuma estos servicios = Token
    const token = req.headers['access-token']
    if(token != undefined){
        jwt.verify(token, app.get('llave'), (err, decoded)=>{
            if(err){
                res.json({mensaje : 'Token invalido'})
            } else{
                req.decoded = decoded
                next()
            }
        })    
      /*  var payload = {
           msg : "Error al autenticar"
        }
        res.send(payload)
        return */
    } else {
        res.send({
            mensaje : "Tpken invalido"
        })
        
    }
}) 
/*
    console.log("token: ", token)
    next() // Pasar al siguiente servicio
}) //Callback */

// EJEMPLO GET
app.get('/', rutasProtegidas, (req, res)=>{
    res.send("Datos recibidos")
})
var contador = 0
app.get('/hora', (req, res)=>{
    var d = new Date()
    contador +=1
    var payload = {
        hora : d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
        veces : contador
    }
    res.send(payload)
})

app.get('/temp/:ciudad', (req,res)=>{
    console.log(req.params)
    var ciudad = req.params.ciudad
    var payload = {
        veces : contador,
        msg : "20°C"
    }
    if(ciudad != undefined){
        if(ciudad == 'bogota'){
            payload.msg = "Aca siempre llueve"
        }
    }
    res.send("OK")
})

var usr = ['Camilo', 'Andrea', 'Ivan']

// EJEMPLOS POST
/*app.post('/login', (req, res)=>{
    var payload = {
        msg : "OK"
}

var data = req.body
var nombre = data.nombre

    if (usr.includes(nombre)){
        payload.msg = "Logeado correctamente"
    } else{
        payload.msg = "Usuario no encontrado"
    }
//    console.log(data)
        res.send(payload)
})
*/
//app.post('/registro', rutasProtegidas, async (req,res)=>{ // Al agregar rutas protegidas entra directamente a ese en lugar de registro. No entra a registro a menos que rutasProtegidas ponga next
app.post('/registro', async (req,res)=>{
    var datos = req.body
    if(datos){
        datos.datetime =  new Date()
        datos.clave = await bcrypt.hash(datos.clave, 10) // Contraseña a traves de un Hash SIEMPRE
        console.log(datos)
    }
    var registro = new dbmodel.UsuariosModel(datos)
    var payload = {
        registro : registro,
        msg : ""
    }
    registro.save().then(item =>{
        console.log("Registro fue guardado")
        payload.msg = "Guardado en base de datos"
        res.send(payload)
    }).catch(err =>{
        console.log("Error al guardar: "+ err.toString())
        payload.msg = "Error de guardado"
        res.send(payload)
    })
}) 

app.post('/login', (req,res)=>{
    var usuario = req.body
    if(usuario){
        var cedula = usuario.cedula
        var clave = usuario.clave

        var query = {// Query es una consulta a la base de datos y como mongo funciona con json, hay que crear un json que haga esa consulta
            "cedula" : cedula
        }
        dbmodel.UsuariosModel.findOne(query, async function(err, result){
            var payload = {
                mensajes : ""
            }
            if(err){
                console.log("Error en la consulta")
                payload.mensajes = "Error en la consulta: " + err.toString()
                res.send(payload)
            } else{
                try{ // Try catch es que mire el codigo, si hay un error va a catch y me manda cuál es el error
                    console.log(result)
                    clave_en_db = result.clave // Result.clave es lo que buscó en el query
                    if(await bcrypt.compare(clave, clave_en_db)){
                        payload.check = true
                        payload.mensajes = "Login correcto"
                        const token = jwt.sign(payload, app.get('llave'), {
                            expiresIn : 60
                        })
                        payload.token = token
                        res.send(payload)
                    } else {
                        payload.mensajes = "Usuario o clave incorrectos"
                        res.send(payload)
                    }
                } catch(error){
                    payload.mensajes = "Usuario o clave incorrectos"
                    console.log("Error: " + error.toString())
                    res.send(payload)
                }
            }
        })
    } else{
        var payload ={
            mensaje : "Sin datos"
        }
        res.send(payload)
    }
})

app.listen(puerto, ()=>{
    console.log("Escuchando por el puerto: " + puerto)
})

console.log('Hola mundo')

fs.readFile("Package.json", function(err,data){
    if(err){
        console.log("error")
        console.log(err)
        return
    }
    console.log(data.toString())
})

var persona = {
    nombre: "Vanessa",
    apellido: "Cardenas",
    cedula: 5648545,
    direccion: "Calle 155"
}

function mostrarPersona(p){
    console.log("El nombre de la persona es: " + p.nombre)
    console.log("La cedula es: " + p.cedula)
}
mostrarPersona(persona)

mongoose.connect(connectionString, {useNewURLParser: true}, (err, res)=>{
    if(err){
        console.log("Error conectando a mongo: " + err)
    } else {
        console.log("Conectado a Mongo correctamente")
    }
})
/*
var tabla_usuarios = new mongoose.Schema({ //Creado el objeto del modelo de dato que necesito
    cedula : Number,
    correo : String,
    nombre : String,
    apellido : String,
    clave : String,
    datetime : new Date() -GMT_5
})

var UsuarioModel = mongoose.model("Usuarios", tabla_usuarios) */