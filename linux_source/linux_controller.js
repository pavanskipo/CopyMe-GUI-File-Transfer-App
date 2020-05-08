const linux_initialize = require('./initialize');
const linux_get_devices = require('./list_devices');
const error_handler = require('../errors/log_and_exit');
const http = require('../utilities/http_requests');

// Declarations
let LIST_OF_DEVICES = [];
const REFRESH_TIME = 5000;

function getListOfDevices() {
    return new Promise(async (resolve, reject) => {
        let device_details_list = [];
        for (let ip of LIST_OF_DEVICES) {
            let device = await http.httpGetDevice(ip);
            let device_details = {};
            if (device) {
                device_details = {
                    name: device.name,
                    ip: ip,
                    os: device.os,
                    os_image: device.os_image
                }
            } else {
                device_details = {
                    name: ip,
                    ip: ip,
                    os: 'NA',
                    os_image: '/images/default.png'
                }
            }
            device_details_list.push(device_details);
        }
        resolve(device_details_list);
    });    
}

function init() {
    try {
        linux_initialize();
        generateListOfDevices();
        setInterval(() => {
            generateListOfDevices();
        }, REFRESH_TIME);
    } catch (error) {
        error_handler("Error Initializing Linux dependencies!" + msg);
    }
}

function generateListOfDevices() {
    try {
        let device_list = [];
        for (device_ip of linux_get_devices()) {
            device_list.push(device_ip);
        }
        LIST_OF_DEVICES = [...device_list];
    } catch (error) {
        error_handler("error while getting the list of devices " + error);
    }
}

module.exports = {
    initialize: init,
    getListOfDevices: getListOfDevices
}