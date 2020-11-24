"use strict";

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

console.log("TESTE"); //Body Parser

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express["static"]('./app/public'));
var urlencodedParser = bodyParser.urlencoded({
  extended: true
}); //Rotas

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/html/index.html");
});
app.post("/cadastrar", urlencodedParser, function (req, res) {
  //console.log(req.body.inputUser);
  (function _callee() {
    var db, result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = require("./js/db");
            console.log('Começou!');
            console.log('INSERT INTO users');
            _context.next = 5;
            return regeneratorRuntime.awrap(db.insertCustomer({
              user: req.body.inputUser,
              password: req.body.inputPassword,
              ra: req.body.inputRa,
              crm: req.body.inputCrm
            }));

          case 5:
            result = _context.sent;
            console.log(result);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  })();

  res.sendFile(__dirname + "/html/index.html");
});
app.get("/sobre", function (req, res) {
  res.sendFile(__dirname + "/html/sobre.html");
});
app.get("/loginregister", function (req, res) {
  res.sendFile(__dirname + "/html/loginregister.html");
});
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/html/register.html");
});
app.post("/entrar", function (req, res) {
  res.send(req.body.Login);
});
app.post("/cadastro", function (req, res) {
  res.send(req.body.Username);
});
app.get("/cadastrodecasos", function (req, res) {
  res.sendFile(__dirname + "/html/cadastrodecasos.html");
});
app.listen(8081, function (req, res) {
  console.log("Servidor Rodando na url http://localhost:8081");
});