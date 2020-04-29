
const linux_initialize = require('./initialize');
const linux_get_devices = require('./list_devices');

// Constants
const LIST_OF_DEVICES = [];

function init() {
    try {
        linux_initialize();
    } catch (error) {
        throw "Error Initializing Linux dependencies!";
    }
}

function getListOfDevices() {
    try {
        for(device_ip of linux_get_devices()) {
            LIST_OF_DEVICES.push(device_ip);
        }
    } catch (error) {
        throw "Error Initializing Linux dependencies!";
    }
}

function main() {
    getListOfDevices();
}

module.exports = {
    initialize: init,
    start: main
}

