const sudo = require('sudo-prompt');
const {
  execSync
} = require("child_process");

var options = {
  name: 'CopyME',
};
const IP_ADDR_COMMAND = "ifconfig | grep 'inet ' | awk -F'[: ]+' '{ print $3 }'"


function getHostIPAddresses() {
    let ip_addresses = [];
    ip_addresses =[...execSync(IP_ADDR_COMMAND).toString().split('\n')];
    return ip_addresses;
}

function getListOfAvailableDevices(ip_addresses) {
    let list_of_devices = [];
    for(ip of ip_addresses) {
        if(ip !== '' && !ip.includes('127.0.0')) {
            let command = "nmap -sn " + ip.substring(0, ip.lastIndexOf('.') + 1) + "* | grep 'scan report'";
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