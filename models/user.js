//Uso de libreria de Mongoose
var mongoose = require('mongoose');
//Schema es un esquema es decir la estructura de una tabla en la base datos
var Schema = mongoose.Schema;

//Se establece la conexion a la base de datos mediante Mongoose
var conexion = mongoose.connect("mongodb://localhost/siggames");


//Creacion de los campos de la tabla mediante Schema
var user_schema = new Schema({
    nombre: String,
    telefono: String,
    email: String,
    password: String,
});

//Definicion del modelo de la tabla en la base de datos mediante mongoose.model("nombre", schema a utilizar)

var User = mongoose.model("User", user_schema);

//Exportacion del modelo para ser usado en otra parte de la aplicacion
module.exports.User = User;