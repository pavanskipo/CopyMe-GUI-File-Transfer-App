
const linux_initialize = require('./initialize');



function init() {
    try {
        linux_initialize();
    } catch (error) {
        throw "Error Initializing Linux dependencies!";
    }
}

module.exports = {
    initialize: init
}

