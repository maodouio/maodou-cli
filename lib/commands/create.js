var btoa = require('btoa');
var fs = require('fs');
var rp = require('request-promise');
var simpleGit = require('simple-git');
var Spinner = require('cli-spinner').Spinner;
var netrc = require('netrc');

function createProject(appName) {
  var myNetrc = netrc();

  if (!myNetrc['git.maodouapp.com']) {
    console.log('Please run "maodou login" first');
    return;
  }

  fs.mkdirSync(appName);

  var options = {
    method: 'POST',
    uri: 'https://maodouapp.com/api/projects',
    headers: {
      Authorization: `Basic ${btoa(myNetrc['git.maodouapp.com'].login + ':' + myNetrc['git.maodouapp.com'].password)}`
    },
    body: {
      appName: appName
    },
    json: true // Automatically stringifies the body to JSON
  };

  rp(options)
    .then(function(_) {
      console.log(`Creating a new Maodou app in ${appName} ...`);
      var spinner = new Spinner('%s');
      spinner.setSpinnerString('|/-\\');
      spinner.start();

      simpleGit(`${process.cwd()}/${appName}`)
        .init()
        .addRemote('maodou', `https://git.maodouapp.com/${myNetrc['git.maodouapp.com'].login}/${appName}`)
        .pull('maodou', 'master', {'--depth': '1'})
        .then(function () {
          spinner.stop(true);
          console.log('Create project Succeeded!'.green);
        });
    })
    .catch(function(err) {
      console.log(err.message);
      console.log('Create project failed.'.red)
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('create', '<appName>')
    .description('Create a site both locally and on maodou.io.')
    .action(createProject);
};
