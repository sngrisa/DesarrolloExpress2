module.exports = function(server, sessionMiddleware){
    const io = require("socket.io")(server);
    const redis = require("redis");
    var client = redis.createClient();

    client.subscribe("imagenes");

    io.use(function(socket,next){
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    client.on("message", function(channel, message){
        console.log("Recibimos un mensaje del canal : "+channel);
        console.log(message);
    });

    io.sockets.on("connection", function(socket){
        console.log(socket.request.session.user_id);
    });
}