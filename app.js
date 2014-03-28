var express = require('express'),
    routes = require('./routes');

var app = express();

app.use(express.static(__dirname + '/app'));
routes(app);

app.listen(3000);