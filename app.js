const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

// Local Imports
const os_utility = require('./utilities/determine_os');
const hostname = require('./utilities/get_hostname');
const error_log_and_Exit = require('./errors/log_and_exit');
const linux_controller = require('./linux_source/linux_controller');

// Declarations
controller = '';
const SUPPORTED_OS = {
    LINUX: { 
        controller: linux_controller,
        image: '/images/linux.png'
    },
    WINDOWS: 'windows_source',
    MAC: 'mac_source',
}
var DEVICE_DETAILS = {
    name: '',
    os: '',
    os_image: ''
}
const app = express()
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      console.log("uploads triggeres");
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
      console.log(file)
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage }).array('uploadData');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
app.get('/', async function(req, res) {
    console.log('/ route');
    let list_of_devices = await controller.getListOfDevices();
    res.render('pages/index', {
        list_of_devices: list_of_devices
    });
});

app.get('/getdevicedetails', function(req, res) {
    console.log('/getdevicedetails route');
    res.json(DEVICE_DETAILS);
});

app.post('/upload',function(req,res){
    console.log('/upload route');
    upload(req,res,function(err) {
        if(err) {
            return res.send("Error uploading file.");
        }
        res.send("File is uploaded");
    });
});

app.get('/upload/:ip', async function(req, res) {
    console.log('/upload ip route')
    try {
        let device = await controller.getSingleDeviceDetails(req.params.ip);
        res.render('pages/upload', {
            device: device
        });
    } catch (err) {
        res.redirect('/');
    }
});

// Initialize and Begin
try {
    let device_os = os_utility();
    DEVICE_DETAILS.name = hostname;
    DEVICE_DETAILS.os = device_os;
    DEVICE_DETAILS.os_image = SUPPORTED_OS[device_os].image;
    controller = SUPPORTED_OS[device_os].controller;
    controller.initialize();
} catch (error) {
    error_log_and_Exit(error);
}

app.listen(3000, function() {
    console.log("Running on port 3000");
});