var url  = require("url");
var querystring = require("querystring");
var express = require("express");
var app = express();
var ejs = require("ejs");
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // this is used for parsing the JSON object from POST

//Permet de spécifier que tout ce qu'on dépose dans ce répertoire public sera automatiquement accessible
//On peut l'appeler comme on veut, pas que public
app.use(express.static("public"));

app.listen(process.env.PORT || 8080, function(){
  console.log("Server listening on port 8080");
}); 

/*
app.get('/', function (req, res) {
  res.render('home');
})
*/

//Stripe
const keyPublishable = "pk_test_8xAO9MLDK5jF8zlMJwSBqKKr";
const keySecret = "sk_test_KjpwwIgd1HrGGP0gkhgY4LTD";

const stripe = require("stripe")(keySecret)

app.get("/", (req, res) =>
  res.render("home", {keyPublishable}));

app.post("/charge", (req, res) => {
  let amount = 500;
  console.log(req.body);

if (req.body && !req.body.stripeEmail)
  req.body.stripeEmail = "test@test.com";

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge"));
});
