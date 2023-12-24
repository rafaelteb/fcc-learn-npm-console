// load config 
require('dotenv').config()
let express = require('express');
let app = express();

let absolutePath = __dirname + '/views/index.html'

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
app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

// echo server
app.get('/:word/echo', (req, res) => {
  res.send({echo: req.params.word});
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
