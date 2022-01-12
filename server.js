var express = require('express');
const path = require('path');
const request = require('request');

var app = express();

const API_KEY = process.env.NASA_KEY;
const count = 54;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api', function (req, res, next) {
//    res.json({
//         title: 'Oompa Loompa',
//         media_type: 'image',
//         url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/hubble_mwayjet_composite.jpg',
//         date: '2020-20-12',
//         explanation: "This is fake as hell. I'm here to party"
//    })

    request.get(`https://api.nasa.gov/planetary/apod?count=${count}&thumbs=true&api_key=${ API_KEY }`, (err, response, body) => {
        if (err) {
            return next(err);
        }
        res.send(body);
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);