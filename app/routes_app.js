var express = require("express");
var router = express.Router();
var Imagen = require("../models/imagen");
var fs = require("fs");
var image_finder_middleware = require("../middlewares/find_image");


router.get("/",function(req,res){
    Imagen.find({})
        .populate("creator")
        .exec(function(err,imagenes){
            if(err){
                console.log(err);
            }else{
                res.render("app/home", {imagenes: imagenes});
            }
        });
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
    var extension = req.body.archivo.name.split(".").pop();
    var data = {
        title: req.body.title,
        descripcion: req.body.descripcion,
        creator: res.locals.user._id,
        extension: extension,
    }
    var imagen = new Imagen(data);

    imagen.save(function(err){
        if(!err){
            fs.copyFile(req.body.archivo.path, "public/imagenes/"+imagen._id+"."+extension, function(err){
                if(err){
                    return console.log(err);
                }else{
                    console.log("sucess!");
                    res.redirect("/app/imagenes/"+imagen._id);
                }
            });
        }else{
            // @ts-ignore
           res.render(err); 
           console.log(imagen);
        }
    });
})
.delete(function(req,res){

});

module.exports = router;