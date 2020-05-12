const sudo = require('sudo-prompt');
const {
  exec
} = require("child_process");
const path = require('path');

var options = {
  name: 'CopyME',
};

module.exports = function () {
  return new Promise((resolve, reject) => {
    exec("dpkg-query -W -f='${Status} ${Version}\n' nmap | grep 'installed'", (error, stdout, stderr) => {
      if (stdout.includes("installed")) {
        resolve(true);
      } else {
        console.log("Installing dependencies, please wait...")
        let path_url = path.join(process.cwd(), 'linux_source', 'install_dependencies.sh');
        sudo.exec('sh ' + path_url, options,
          function (error, stdout, stderr) {
            if (stdout.includes("checked")) {
              console.log("Intialization complete");
              resolve(true);
            }
            if (error) throw error
          }
        );
      }
    });
  });
}