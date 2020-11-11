const express = require("express");
const app = express();


//Body Parser

//Rotas
app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/index.html");
});
app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/html/sobre.html");
});
app.get("/loginregister", function(req, res){
    res.sendFile(__dirname + "/html/loginregister.html");
});
app.get("/register", function(req, res){
    res.sendFile(__dirname + "/html/register.html");
});
app.post("/add", function(req, res){
    res.sendFile(__dirname + "/html/add.html");
});





app.listen(8081, function(req, res){
    console.log("Servidor Rodando na url http://localhost:8081")
});