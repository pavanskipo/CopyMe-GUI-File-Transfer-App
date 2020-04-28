const sudo = require('sudo-prompt');
const {
  exec
} = require("child_process");

var options = {
  name: 'CopyME',
};

module.exports = function () {
  exec("dpkg-query -W -f='${Status} ${Version}\n' nmap | grep 'installed'", (error, stdout, stderr) => {
    if (stdout.includes("installed")) {
      return true;
    } else {
      console.log("Installing dependencies, please wait...")
      let path = process.cwd() + '/linux_source/install_dependencies.sh';
      sudo.exec('sh ' + path, options,
        function (error, stdout, stderr) {
          if (stdout.includes("checked")) {
            console.log("Intialization complete");
          }
          if (error) throw error
        }
      );
    }
  });
}