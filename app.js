var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var User = require("./models/user.js").User;

app.use("/state", express.static('public'));

app.get("/java", function(req,res){
    res.render("./public/javascripts/javascript.js");
});

// Uso del body-parser
app.use(bodyParser.json()); // para peticiones que tengan el formato json
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('assets'));

app.set("view engine", "jade");

app.get("/envio", function(req,res){
    res.render("pruebaenvio", {nombre : "Pagina de SiG Software", titulo: "Pagina de SiG Sofware"});
});

app.get("/prueba", function(req,res){
    res.render("prueba");
});

app.get("/login", function(req,res){
        res.render("login"); 
});

app.post("/envio", function(req,res){
    res.render("envio");
});

app.get("/alta", function(req,res){
    res.render("altausuarios");
});

app.post("/users", function(req,res){
    var user = new User({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation, 
    });
    console.log("------------------------------------");
    console.log("Historial de contraseñas confirmadas")
    console.log("------------------------------------");
    console.log("Password de confirmacion para :");
    console.log("------------------------------------");
    // @ts-ignore
    console.log(user.nombre);
    console.log("------------------------------------");
    // @ts-ignore
    console.log(user.password_confirmation);

    //Uso de promises en Mongoose
    user.save().then(function(us){
        res.send("Guardamos los datos en el sistema");
    },function(err){
        if(err){
            console.log(""+err);
            res.send(""+err);
        }
    });
});

app.post("/sessions", function(req,res){
        User.findOne({email: req.body.email, password: req.body.password}, function(err,docs){
                    console.log(docs);
                    res.send("Sesion Iniciada");
        });
});

app.listen(8080);
