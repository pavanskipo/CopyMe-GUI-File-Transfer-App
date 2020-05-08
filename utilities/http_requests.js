const request = require('request-promise');


function httpGetDevice(ip) {
    return new Promise((resolve, reject) => {
        request({
            "method": "GET",
            "uri": "http://" + ip + ":3000/getdevicedetails",
            "json": true,
        }).then((device) => {
            resolve(device);
        }).catch(function (err) {
            resolve(null);
        });
    });
}


module.exports = {
    httpGetDevice: httpGetDevice
}