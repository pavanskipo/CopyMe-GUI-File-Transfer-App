const os = require('os');

module.exports = function getOS() {
    switch(os.platform()) {
        case 'linux':
            return 'LINUX';
        case 'win32':
            return 'WINDOWS';
        case 'darwin':
            return 'MAC';
        default:
            throw 'Unsupported OS type :('
    }
}