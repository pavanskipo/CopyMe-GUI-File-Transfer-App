const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');

const controller = require('./controller/controller');
const api_routes = require('./routes/api_routes');

const app = express()
app.use(express.static(path.join(__dirname, 'public', 'copy-me')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//API routes
app.use('/api', api_routes);

// UI route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname));
});



controller.begin();
app.listen(3000, function() {
    console.log("Running on port 3005");
});
