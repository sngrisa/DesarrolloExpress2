var express = require("express");
var router = express.Router();
var Imagen = require("../models/imagen");
var image_finder_middleware = require("../middlewares/find_image");

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

router.all("/imagenes/:id*", image_finder_middleware);

router.get("/imagenes/:id/edit", function(req,res){
        res.render("app/imagenes/actualizarimagen");
});

router.route("/imagenes/:id")
.get(function(req,res){
    res.render("app/imagenes/show");
})
.put(function(req,res){
        res.locals.imagen.title = req.body.title;
        res.locals.imagen.descripcion = req.body.descripcion;
        res.locals.imagen.save(function(err){
            if(!err){
            res.render("app/imagenes/show");
             }else{
            res.render("app/imagenes/"+req.params.id+"/edit");
            }
        })
    })
.delete(function(req,res){
    Imagen.findOneAndRemove({_id: req.params.id}, function(err){
        if(!err){
            res.redirect("/app/imagenes");
        }else{
            console.log(err);
            res.redirect("/app/imagenes"+req.params.id);
        }
    });
});

router.route("/imagenes")
.get(function(req,res){
    Imagen.find({}, function(err,imagenes){
        if(err){
            console.log(err);
            res.redirect("/app");
            return;
        }
            res.render("app/imagenes/mostrarimagen",{imagenes: imagenes});
    });
})
.post(function(req,res){
    console.log("-------------------------");
    console.log("Usuario que creo la imagen :");
    console.log("Nombre del usuario: ");
    console.log(res.locals.user.nombre);
    console.log("Email:");
    console.log(res.locals.user.email);
    console.log("-------------------------");
    var data = {
        title: req.body.title,
        descripcion: req.body.descripcion,
        creator: res.locals.user._id,
    }
    var imagen = new Imagen(data);

    imagen.save(function(err){
        if(err){
           // @ts-ignore
           res.render(err); 
        }else{
            console.log(imagen);
            res.redirect("/app/imagenes/"+imagen._id);
        }
    });
})
.delete(function(req,res){

});

module.exports = router;