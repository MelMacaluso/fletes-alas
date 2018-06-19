// Utils 
require('dotenv').config({
  path: '../../../../../.env'
});

// Pipedrive
var Pipedrive = require('pipedrive');

// Pipedrive Credentials 
var pipedrive = new Pipedrive.Client(process.env.PIPEDRIVE_API_TOKEN_HERE, {
  strictMode: true
});

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

app.use(bodyParser.urlencoded({
  extended: false
}))
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


app.use('/sendSMS', function (req, res) {
  // TwilioSMS.sendSMS(client, process.env.FROM_NUMBER, process.env.TO_NUMBER, req.body, res); // Those are working but let's keep it off
  // TwilioSMS.sendSMS(client, process.env.FROM_NUMBER, process.env.RENAN_TO_NUMBER, req.body, res); // Those are working but let's keep it off
  pipedrive.Deals.add(req.body, () => console.log('Sent to pipedrive'));
});

app.use('/booking/find', function (req, res) {
  // pipedrive.SearchResults.field(req.body, (err, result) => res.send(console.log(result[0].id))); // Test only
  pipedrive.SearchResults.field(req.body, (err, result) => {
    // const dealId = result[0].id;
    // pipedrive.Deals.get(result[0].id, (err, deal) => res.send(deal));
    if (result[0]) {
    const dealId = result[0].id;
    pipedrive.Deals.get(dealId, (err, deal) => res.send(deal));
    } else {
      res.send('No encontramos ninguna mudanza con tu numero de reserva.')
    }
  })
});

app.use('/booking/cancel', function (req, res) {
  pipedrive.SearchResults.field(req.body, (err, result) => {
    if (result[0]) {
    const dealId = result[0].id;
    pipedrive.Deals.update(dealId, { "status": "lost", "lost_reason" : "Cancelada por el cliente"} , () => res.send());
    } else {
      res.send('No pudimos cancelar tu deal.')
    }
  })
});

app.use('/booking/update', function (req, res) {
  // console.log(req.body);
  pipedrive.Deals.update(req.body.update.id ,req.body, () => console.log('Updated in pipedrive'));
});


// sudo nginx -s reload

app.listen(8080, () => console.log('up and running my baby on port 8080'));