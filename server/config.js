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

app.get('/get/exRates', function (req, res) {
  axios.get('https://blockchain.info/ticker')
      .then(tickerResponse => {
        res.json(tickerResponse.data);
      })
      .catch(err => console.error("\nERROR in api.get: exRates", err));
});

app.get('/get/latestBlock', (req, res) => {
  axios.get('https://blockchain.info/latestblock')
    .then(response => {
      interpretBitIndexes(response.data, res);
    })
    .catch(err => console.error("\nERROR in app.get: latestBlock", err));
});

const interpretBitIndexes = (data, res) => {
  const url = 'https://blockchain.info/rawtx/';
  var tenTransactions = [];

  data.txIndexes.slice(0, 10).forEach(txIndex =>
    axios.get(url + txIndex)
      .then(response => {
        response.data.out.forEach((transaction, index) => {
          transaction.time = response.time;
          tenTransactions.push(transaction);
          transaction.index = tenTransactions.length;

          if (tenTransactions.length === 10)
            res.json(tenTransactions);
        });
      })
      .catch(err => console.error("\nERROR in interpretBitIndexes", err))
  );

  return tenTransactions;
};

module.exports = app;
