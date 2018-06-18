// Utils 
require('dotenv').config({path: '../../../../../.env'});

// Pipedrive
var Pipedrive = require('pipedrive');

// Pipedrive Credentials 
var pipedrive = new Pipedrive.Client(process.env.PIPEDRIVE_API_TOKEN_HERE, { strictMode: true });

// Twilio Credentials 
var accountSid = process.env.ACCOUNTSID;
var authToken = process.env.AUTHTOKEN;

// Twilio 
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
const TwilioSMS = require('./twilio/TwilioSMS');


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


app.use('/sendSMS', function(req, res){
  // TwilioSMS.sendSMS(client, process.env.FROM_NUMBER, process.env.TO_NUMBER, req.body, res);
  // TwilioSMS.sendSMS(client, process.env.FROM_NUMBER, process.env.RENAN_TO_NUMBER, req.body, res);
  pipedrive.Deals.add(req.body, ()=> console.log('errore ci fu'));
});

app.listen(8080, ()=> console.log('up and running my baby on port 8080'));