const express = require('express');

app = express();

// app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/', express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

console.log('Server is listening on', process.env.PORT || "3000");
app.listen(process.env.PORT || 3000);
