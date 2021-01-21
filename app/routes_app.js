var express = require("express");
var router = express.Router();
var Imagen = require("../models/imagen");

router.get("/",function(req,res){
    //Buscar usuarios
    res.render('app/home');
    console.log("---------------------------------");
    console.log("Id de usuario logueado:");
    console.log("---------------------------------");
    // @ts-ignore
    console.log(req.session.user_id);
    console.log("---------------------------------");
});

//REST

router.get("/imagenes/alta", function(req,res){
    res.render("app/imagenes/subirimagen");
});

router.get("/imagenes/:id/edit", function(req,res){

});

router.route("/imagenes/:id")
.get(function(req,res){
    Imagen.findById(req.params.id, function(err,imagen){
        res.render("app/imagenes/show", {imagen: imagen});
    });
})
.put(function(req,res){

})
.delete(function(req,res){

});

router.route("/imagenes")
.get(function(req,res){

})
.post(function(req,res){
    var data = {
        title: req.body.title,
        descripcion: req.body.descripcion,
    }
    var imagen = new Imagen(data);

    imagen.save(function(err){
        if(err){
           // @ts-ignore
           res.render(err); 
        }else{
            res.redirect("/app/imagenes/"+imagen._id);
        }
    });
})
.delete(function(req,res){

});

module.exports = router;