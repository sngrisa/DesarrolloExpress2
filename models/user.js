//Uso de libreria de Mongoose
var mongoose = require('mongoose');
//Schema es un esquema es decir la estructura de una tabla en la base datos
var Schema = mongoose.Schema;

//Se establece la conexion a la base de datos mediante Mongoose
mongoose.connect("mongodb://localhost/siggames");

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Ingrese un email valido"];

var password_validation ={
        validator: function(p){
            return this.password_confirmation == p;
        },
        message: "Las contraseñas no coinciden, compruebalo nuevamente",
};

//Creacion de los campos de la tabla mediante Schema
var user_schema = new Schema({
    nombre: {
        type: String, required:true, maxlength:[15,"El nombre de usuario no puede contener mas de 15 caracteres alfanumericos"]
    },
    telefono:{
        type: String, minlength:[4,"El numero de telefono es entre minimo 5 caracteres numericos hasta 15 caracteres"], maxlength:[15,"Se Permiten solo hasta 15 caracteres como maximo"]
    },
    email: {
        type: String, required: "El campo es obligatorio", match: email_match
    },
    password: {
        type: String, required:true, minlength:[5,"Contraseña muy corta use mas caracteres"], maxlength:[20,"No se permiten mas de 20 caracteres"],validate: password_validation,
    },
});

user_schema.virtual("password_confirmation").get(function(){
    return this.p_c;
}).set(function(password){
    this.p_c = password;
});


//Definicion del modelo de la tabla en la base de datos mediante mongoose.model("nombre", schema a utilizar)

var User = mongoose.model("User", user_schema);

//Exportacion del modelo para ser usado en otra parte de la aplicacion
module.exports.User = User;