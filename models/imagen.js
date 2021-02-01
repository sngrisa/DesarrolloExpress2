var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/siggames",{
  useCreateIndex: true,
  useUnifiedTopology:true,
  useNewUrlParser: true
});

var imagen_schema = new schema({
    title: 
    {type: String, 
    required: true},
    descripcion: 
    {type: String,
    required:true},
    creator:
    {type: schema.Types.ObjectId, ref: "User"},
    extension: 
    {type: String, 
      required: true},
});

var Imagen = mongoose.model("Imagen", imagen_schema);

module.exports = Imagen;
