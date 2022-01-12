var express = require('express');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/', function (req, res) {
   res.send('Hello World');
});;

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);