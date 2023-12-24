// load config 
require('dotenv').config()
// require body-parser to parse post-requests
let bodyParser = require('body-parser');

let express = require('express');
let app = express();

// handle url encoded data
app.use(bodyParser.urlencoded({extended: false}));

// logger middleware before all other routes
app.use('/', (req, res, next) => {
  let logline = req.method + " " + req.path + " - " + req.ip;
  console.log(logline);
  next();
});

// chained middlewar for /now
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
  res.send({time: req.time});
});

// serve index.html to /
let absolutePath = __dirname + '/views/index.html'
app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

// echo server
app.get('/:word/echo', (req, res) => {
  res.send({echo: req.params.word});
});

// GET query name server
app.get('/name', (req, res) => {
  res.send({name: req.query.first + " " + req.query.last});
});

// POST query name server
app.post('/name', (req, res) => {
  console.log(req.body);
  res.send({name: req.body.first + " " + req.body.last});
});

// serve css to /public
app.use('/public', express.static(__dirname + '/public'));

// serve api to /json
app.get('/json', (req, res) => {
  let response = "Hello json";
  if (process.env['MESSAGE_STYLE'] === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({"message": response});
});


































 module.exports = app;
