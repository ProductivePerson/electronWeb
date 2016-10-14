const express = require('express');
const axios = require('axios');

app = express();

// app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/', express.static(__dirname));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/exRates', function (req, res) {
  console.log("ding ding ding");
  axios.get('https://blockchain.info/ticker')
      .then(response => {
        console.log(response.data);
        res.json(response.data);
      })
      .catch(err => console.error("ERROR", err));
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

console.log('Server is listening on', process.env.PORT || "3000");
app.listen(process.env.PORT || 3000);
