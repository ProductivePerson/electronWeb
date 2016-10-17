const app = require('./server/config.js');
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

console.log('Server is listening on', PORT);
app.listen(PORT);
