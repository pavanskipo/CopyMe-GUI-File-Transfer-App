
var sudo = require('sudo-prompt');

var options = {
  name: 'CopyME',
};

module.exports = function() {
  let path = process.cwd() + '/linux_source/install_dependencies.sh';
  sudo.exec('sh ' + path, options,
    function(error, stdout, stderr) {
      if(stdout.includes("checked")) {
        console.log("Intialization complete");
      }
      if (error) throw error
    }
  );  
}
