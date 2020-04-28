// Local Imports
const os_utility = require('./utilities/determine_os');
const error_log_and_Exit = require('./errors/log_and_exit');
const linux_controller = require('./linux_source/linux_controller');

// Declarations
Controller = '';
const SUPPORTED_OS = {
    LINUX: linux_controller,
    WINDOWS: 'windows_source',
    MAC: 'mac_source',
}

// Initializations 
try {
    Controller = SUPPORTED_OS[os_utility()];
    Controller.initialize();
} catch (error) {
    error_log_and_Exit(error);
}

