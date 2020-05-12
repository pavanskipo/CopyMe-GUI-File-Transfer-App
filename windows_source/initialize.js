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
    exec("nmap", (error, stdout, stderr) => {
      if (stderr.includes("not recognized")) {
          console.log("Installing dependencies, please wait...");
          let path_url = path.join(process.cwd(), 'windows_source', 'install_dependencies.bat');
          exec(path_url, options,
            function (error, stdout, stderr) {
              if (stdout.includes("checked")) {
                console.log("Intialization complete");
                resolve(true);
              }
              if (error) throw error
            }
            );
        } else {
            resolve(true);
      }
    });
  });
}