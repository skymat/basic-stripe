var url  = require("url");
var querystring = require("querystring");
var express = require("express");
var app = express();
var ejs = require("ejs");
app.set('view engine', 'ejs');

//Permet de spécifier que tout ce qu'on dépose dans ce répertoire public sera automatiquement accessible
//On peut l'appeler comme on veut, pas que public
app.use(express.static("public"));

app.listen(process.env.PORT || 8080, function(){
  console.log("Server listening on port 8080");
}); 

app.get('/', function (req, res) {
  res.render('home');
});