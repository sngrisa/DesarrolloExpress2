var express = require("express");

var app = express();

app.set("view engine", "jade");

app.get("/", function(req,res){
    res.render("index", {nombre : "Pagina de SiG Software", titulo: "Pagina de SiG Sofware"});
});

app.listen(8080);
