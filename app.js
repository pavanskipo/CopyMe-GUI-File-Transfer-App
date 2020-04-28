// Local Imports
const os_utility = require('./utilities/determine_os');
const error_log_and_Exit = require('./errors/log_and_exit');


// Declarations
MY_OPERATING_SYSTEM = '';
const SUPPORTED_OS = {
    LINUX: 'linux_source',
    WINDOWS: 'windows_source',
    MAC: 'mac_source',
}

// Initializations 
try {
    MY_OPERATING_SYSTEM = SUPPORTED_OS[os_utility()];
} catch (error) {
    error_log_and_Exit(error);
}

