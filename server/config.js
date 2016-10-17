const express = require('express');
const axios = require('axios');

app = express();

// app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/', express.static(__dirname + "/../"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/exRates', function (req, res) {
  axios.get('https://blockchain.info/ticker')
      .then(response => {
        res.json(response.data);
      })
      .catch(err => console.error("ERROR", err));
});

app.get('/latestBlock', (req, res) => {
  axios.get('https://blockchain.info/rawtx/')
});


module.exports = app;
