const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cadastro = require('./js/cadastro');


console.log("TESTE");
//Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(express.static('./app/public'));

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
app.post("/entrar", function(req, res){
    res.send(req.body.Login)
});
app.post("/cadastro", function(req, res){

});





app.listen(8081, function(req, res){
    console.log("Servidor Rodando na url http://localhost:8081");
    //const db = require("./js/db"); SOMENTE DESMARCAR APÓS TERMOS O SERVIDOR RODANDO, POIS GERA ERROS QUANDO NÃO CONECTA!
});