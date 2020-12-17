var express = require("express");

var app = express();

app.set("view engine", "jade");

app.get("/", function(req,res){
    res.render("index", {nombre : "Pagina de SiG Software", titulo: "Pagina de SiG Sofware"});
});

app.get("/pratica", function(req,res){
    res.render("practica");
});

app.post("/", function(req,res){
    res.render("envio");
});

app.get("/index", function(req,res){
    res.render("index2");
});

app.listen(8080);
