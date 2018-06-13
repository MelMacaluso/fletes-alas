// Utils 
require('dotenv').config()

// Server setup
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`DEBUG originalUrl: ${req.originalUrl}`)
  next()
})

app.use(function (req, res, next) {
  // This needs to be restricted in the future, can't allow random CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  console.log(`DEBUG originalUrl: ${req.originalUrl}`)
  next()
})


app.get('/', function(req, res){
  res.send("Hello World!");
});

app.listen(3000, ()=> console.log('up and running my baby'));