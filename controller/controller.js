const multer = require('multer');

// Local Imports
const os_utility = require('../utilities/determine_os');
const hostname = require('../utilities/get_hostname');
const error_log_and_Exit = require('../errors/log_and_exit');
const linux_controller = require('../linux_source/linux_controller');
const storage = require('../utilities/upload_handler');

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
var upload = multer({
    storage: storage
}).array('uploadData');


function getListOfDevices() {
    return controller.getListOfDevices();
}

function getdevicedetails() {
    return DEVICE_DETAILS;
}

function uploadFile(req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.send("Error uploading file.");
        }
        res.send("File is uploaded");
    });
}

// Initialize and Begin
function begin() {
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
}


module.exports = {
    begin: begin,
    getListOfDevices: getListOfDevices,
    getdevicedetails: getdevicedetails,
    uploadFile: uploadFile
};