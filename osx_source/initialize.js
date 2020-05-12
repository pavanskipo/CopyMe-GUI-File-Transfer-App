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
    exec("brew list nmap", (error, stdout, stderr) => {
      if (stderr.includes("No such keg")) {
          console.log("Installing dependencies, please wait...");
          let path_url = path.join(process.cwd(), 'osx_source', 'install_dependencies.sh');
          exec('sh ' + path_url, options,
            function (error, stdout, stderr) {
                console.log(stdout); console.log(stderr);
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