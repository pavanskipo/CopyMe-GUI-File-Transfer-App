const express = require('express')
const path = require('path');

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

 
app.get('/', async function(req, res) {
    let list_of_devices = await controller.getListOfDevices();
    res.render('pages/index', {
        list_of_devices: list_of_devices
    });
});

app.get('/getdevicedetails', function(req, res) {
    res.json(DEVICE_DETAILS);
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

app.listen(3000)