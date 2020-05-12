const sudo = require('sudo-prompt');
const {
  execSync
} = require("child_process");

var options = {
  name: 'CopyME',
};
const IP_ADDR_COMMAND = 'ipconfig | findstr /R /C:"IPv4 Address"'


function getHostIPAddresses() {
    let ip_addresses = [];
    var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    ip_addresses = execSync(IP_ADDR_COMMAND).toString().split('\n').map((raw_ip) => {
        let ip = raw_ip.match(r);
        if(ip) {
            return ip[0];
        }
    });
    return ip_addresses;
}

function getListOfAvailableDevices(ip_addresses) {
    let list_of_devices = [];
    for(ip of ip_addresses) {
        if(ip !== undefined && !ip.includes('169.254.55.105')) {
            let command = 'nmap -sn --max-parallelism 100 ' + ip.substring(0, ip.lastIndexOf('.') + 1) + '* | findstr "scan report"';
            for (raw_ip of execSync(command).toString().split('Nmap scan report for ')) {
                extracted_ip = raw_ip.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
                if (extracted_ip != null) list_of_devices.push(extracted_ip[0]);
            }
        }
    }
    return list_of_devices;
}

module.exports = function () {
    const ip_addresses = getHostIPAddresses();
    return getListOfAvailableDevices(ip_addresses);
}