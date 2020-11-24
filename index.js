const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');



console.log("TESTE");
//Body Parser
    app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));        
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(express.static('./app/public'));
    var urlencodedParser = bodyParser.urlencoded({ extended: true })
    var sess;
//Rotas
app.get("/", function(req, res){


sess = req.session;
    if(sess.user) {
        //return res.redirect('/admin');
    }

    res.sendFile(__dirname + "/html/index.html");
});
app.post("/cadastrar",urlencodedParser, function(req, res){
    //console.log(req.body.inputUser);


    (async () => {
        const db =  require("./js/db"); 
        var crm;
        if(req.body.inputCrm){crm =req.body.inputCrm ;}else{crm = 0;}
        const result = await db.insertUser({user: req.body.inputUser,password:req.body.inputPassword,ra:req.body.inputRa,crm:crm});
        if(result == 1)res.redirect("/?return=successCadUser"); else if(result == 3) res.redirect("/?return=errorUserExist"); else res.redirect("/?return=errorCadUser");
    })();  
});
app.post("/login",urlencodedParser, function(req, res){

    (async () => {
        const db = require("./js/db");

        const users = await db.selectUser({user: req.body.inputUser,password:req.body.inputPassword});

       if (users){
            if(req.body.inputUser == users[0].user){console.log("LOGADO");


            sess = req.session;
            sess.user = users[0].user;
            sess.ra = users[0].ra;
            sess.crm = users[0].crm;

            res.redirect("/?return=successLogin");





        }}
    
    else{res.redirect("/?return=errorLogin");}


        
    })();


});
app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/html/sobre.html");
});
app.get("/cadastrodedoenca", function(req, res){
    res.sendFile(__dirname + "/html/cadastrodedoenca.html");
});
app.post("/loginregister", function(req, res){
    console.log(req.body.exampleDropdownFormEmail1)
    //Codigo de autenticacao de usuario para login
});
app.get("/register", function(req, res){
    res.sendFile(__dirname + "/html/register.html");
});
app.get("/cadastrodecasos", function(req, res){
    res.sendFile(__dirname + "/html/cadastrodecasos.html");
});

app.get('/session', (req, res) => {
    sess = req.session;
    res.send(sess);
});

app.get('/menu',(req,res) => {
    sess = req.session;
    if(sess.user) {
       // res.write(`<h1>Hello ${sess.user} </h1><br>`);
       // res.end('<a href='+'/logout'+'>Logout</a>');
       res.sendFile(__dirname + "/html/menu.html");
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});





app.listen(8081, function(req, res){
    console.log("Servidor Rodando na url http://localhost:8081");
    
});