var btoa = require('btoa');
var fs = require('fs');
var rp = require('request-promise');
var simpleGit = require('simple-git');
var Spinner = require('cli-spinner').Spinner;
var netrc = require('netrc');
var sleep = require('sleep-promise');

function createProject(subdomain) {
  var myNetrc = netrc();

  if (!myNetrc['git.maodouapp.com']) {
    console.log('Please run "maodou login" first');
    return;
  }

  fs.mkdirSync(subdomain);

  var options = {
    method: 'POST',
    uri: 'https://maodou.io/api/projects',
    headers: {
      Authorization: `Basic ${btoa(myNetrc['git.maodouapp.com'].login + ':' + myNetrc['git.maodouapp.com'].password)}`
    },
    body: {
      subdomain: subdomain
    },
    json: true // Automatically stringifies the body to JSON
  };

  rp(options)
    .then(sleep(2000)) // TODO: find other ways to ensure project creation is completed on server
    .then(function(_) {
      console.log(`Creating a new maodou app in ${subdomain} ...`);
      var spinner = new Spinner('%s');
      spinner.setSpinnerString('|/-\\');
      spinner.start();

      simpleGit(`${process.cwd()}/${subdomain}`)
        .init()
        .addRemote('maodou', `https://git.maodouapp.com/${myNetrc['git.maodouapp.com'].login}/${subdomain}`)
        .pull('maodou', 'master', {'--depth': '1'}, function (err) {
          if (err) {
            spinner.stop(true);
            console.log('Create project failed.'.red);
          }
        })
        .then(function () {
          spinner.stop(true);
          console.log('Create project succeeded!'.green);
        });
    })
    .catch(function(err) {
      console.log(err.message);
      console.log('Create project failed.'.red)
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('create', '<subdomain>')
    .description('Create a site both locally and on maodou.io.')
    .action(createProject);
};
