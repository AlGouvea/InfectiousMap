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

app.get("/teste", function(req, res){


    sess = req.session;
        if(sess.user) {
            //return res.redirect('/admin');
        }
    
        res.sendFile(__dirname + "/html/teste.html");
    });

app.get('/search',function(req,res){

    (async () => {
        console.log("chamado");
        const db =  require("./js/db"); 
    
        const result = await db.buscaDoenca({nome:req.query.key});

        var data=[];

data.push(result);

res.end(JSON.stringify(data));

    })();  



});


app.get('/graph',function(req,res){

    if(req.query.ra){
                                        (async () => {
                                            console.log("chamado");
                                            const db =  require("./js/db"); 
                                        
                                            const result = await db.buscaGraph({ra:req.query.ra});
                                    
                                            var data=[];
                                    
                                    data.push(result);
                                    
                                    res.end(JSON.stringify(data));
                                    
                                        })();  
    }
 else {
    (async () => {
        console.log("chamado");
        const db =  require("./js/db"); 
    
        const result = await db.buscaGraph();

        var data=[];

data.push(result);

res.end(JSON.stringify(data));

    })();  
 }   



});


app.get('/buscaNomeDoenca',function(req,res){

    if(req.query.cid){
                                        (async () => {
                                            const db =  require("./js/db"); 
                                        
                                            const result = await db.buscaNomeDoenca({cid:req.query.cid});
                        
                                    
                                            var data=[];
                                    
                                    data.push(result);
                                    
                                    
                                    res.end(JSON.stringify(data));
                                    
                                        })();  
    }


});

app.get('/buscaQntDoenca',function(req,res){

    if(req.query.ra){
                                        (async () => {
                                            const db =  require("./js/db"); 
                                        
                                            const result = await db.buscaQntDoenca({cid:req.query.cid,ra:req.query.ra});
                                    
                                            var data=[];
                                    
                                    data.push(result);
                                    
                                    res.end(JSON.stringify(data));
                                    
                                        })();  
    }else{

        (async () => {
            const db =  require("./js/db"); 
        
            const result = await db.buscaQntDoenca({cid:req.query.cid});
    
            var data=[];
    
    data.push(result);
    
    res.end(JSON.stringify(data));
    
        })();  



    }


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


app.post("/cadastrarDoenca",urlencodedParser, function(req, res){
    //console.log(req.body.inputUser);
    sess = req.session;

    if(sess.crm >0){

    (async () => {
        const db =  require("./js/db"); 


        var ar,mosquito,fluidos = 0;
        if(req.body.transmAr){ar=1;}
        if(req.body.transmMosquito){mosquito=1;}
        if(req.body.transmFluidos){fluidos=1;}
        var transmO = {ar: +ar, mosquito:+mosquito, fluidos: +fluidos};
        var transm = JSON.stringify(transmO);

        var vacina,mascara =0;
        if(req.body.prevVacina){vacina = 1;}
        if(req.body.prevMascara){mascara = 1;}
        var prevencaoO = {vacina: +vacina, mascara:+mascara};
        var prevencao = JSON.stringify(prevencaoO);


        var tosse,febre,coriza,dorDeCabeca,diarreia =0;
        if(req.body.sintTosse){tosse =1;}
        if(req.body.sintFebre){febre =1;}
        if(req.body.sintCoriza){coriza=1;}
        if(req.body.sintDorDeCabeca){dorDeCabeca=1;}
        if(req.body.sintDiarreia){diarreia=1;}
        var sintomasO = {tosse:+tosse,febre:+febre,coriza:+coriza,dorDeCabeca:+dorDeCabeca,diarreia:+diarreia};
        var sintomas = JSON.stringify(sintomasO);










        const result = await db.insertDoenca({nome:req.body.inputnameCadDoenca,cid:req.body.inputcidCadDoenca,transmissao:transm,prevencao:prevencao,sintomas:sintomas,risco:req.body.Risco,crmCadastrante:sess.crm});
        if(result == 1)res.redirect("/menu?return=successCadDoenca"); else if(result == 3) res.redirect("/menu?return=errorCadDoencaExist"); else res.redirect("/menu?return=errorCadDoenca");
    })();  


}else{
    res.redirect("/menu?return=errorCadDoencaNotPermitted");
}

});

app.post("/cadastrarCaso",urlencodedParser, function(req, res){
    //console.log(req.body.inputUser);
    sess = req.session;

    if(sess.user){

    (async () => {
        const db =  require("./js/db"); 
        const result = await db.insertCaso({cid:req.body.cidCadCasos,usuario:sess.user,ra:req.body.raCadCasos,dataOcorrencia:req.body.dataOcorrencia});
        if(result == 1)res.redirect("/menu?return=successCadCasos"); else if(result == 3) res.redirect("/menu?return=errorCadCasoExist"); else res.redirect("/menu?return=errorCadCaso");
    })();  


}else{
    res.redirect("/menu?return=errorCadCasoNotPermitted");
}

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