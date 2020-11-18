const express = require("express");
const app = express();
const bodyParser = require("body-parser");



console.log("TESTE");
//Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(express.static('./app/public'));
    var urlencodedParser = bodyParser.urlencoded({ extended: true })

//Rotas
app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/index.html");
});
app.post("/cadastrar",urlencodedParser, function(req, res){
    //console.log(req.body.inputUser);


    (async () => {
        const db =  require("./js/db"); 
        console.log('Começou!');
        
        console.log('INSERT INTO users');
        const result = await db.insertCustomer({user: req.body.inputUser,password:req.body.inputPassword,ra:req.body.inputRa,crm:req.body.inputCrm});
        console.log(result);
    })();



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
app.get("/cadastrodecasos", function(req, res){
    res.sendFile(__dirname + "/html/cadastrodecasos.html");
});





app.listen(8081, function(req, res){
    console.log("Servidor Rodando na url http://localhost:8081");
    
});