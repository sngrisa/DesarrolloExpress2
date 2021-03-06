var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var User = require("./models/user.js").User;
var redis = require("redis");
var session = require("express-session");
var router_app = require("./app/routes_app.js");
var session_middleware = require("./middlewares/session");
var publicPath = path.resolve(__dirname, 'public');
var methodOverride = require("method-override");
var formidable = require("express-formidable");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();
var http = require("http");

var app = express();
const server = http.Server(app);
var realtime = require("./realtime");

app.use("/state", express.static('public'));

// @ts-ignore
app.get("/java", function(req,res){
    res.render("./public/javascripts/javascript.js");
});

// Uso del body-parser
app.use(bodyParser.json()); // para peticiones que tengan el formato json
app.use(bodyParser.urlencoded({ extended: true }));

var sessionMiddleware = session({
    store: new RedisStore({ client: redisClient}),
    secret:"super ultra secret word",
    saveUninitialized: false,
    resave: false,
});

realtime(server, sessionMiddleware);

app.use(sessionMiddleware);
app.use(express.static('assets'));
app.use(express.static(publicPath));
app.use(methodOverride("_method"));
app.use(formidable.parse({ keepExtensions: true }));

app.set("view engine", "jade");

// @ts-ignore
app.get("/envio", function(req,res){
    res.render("pruebaenvio", {nombre : "Pagina de SiG Software", titulo: "Pagina de SiG Sofware"});
});

// @ts-ignore
app.get("/prueba", function(req,res){
    res.render("prueba");
});

// @ts-ignore
app.get("/login", function(req,res){
        res.render("login"); 
});

// @ts-ignore
app.post("/envio", function(req,res){
    res.render("envio");
});

// @ts-ignore
app.get("/alta", function(req,res){
    res.render("altausuarios");
});

app.get("/", function(req,res){
    res.render("index");
    // @ts-ignore
    console.log(req.session.user_id);
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
    // @ts-ignore
    user.save().then(function(us){
        res.send("Guardamos los datos en el sistema");
    },function(err){
        if(err){
            console.log(""+err);
            res.send(""+err);
        }
    });
});

// @ts-ignore
app.post("/sessions", function(req,res){
        // @ts-ignore
        User.findOne({email: req.body.email, password: req.body.password}, function(err,user){
                    console.log(user);
                    // @ts-ignore
                    req.session.user_id = user._id;
                    res.redirect("/app");
        });
});

app.use("/app", session_middleware);
app.use("/app", router_app);

server.listen(8080);
