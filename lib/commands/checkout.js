var btoa = require('btoa');
var fs = require('fs');
var simpleGit = require('simple-git');
var Spinner = require('cli-spinner').Spinner;
var netrc = require('netrc');

function createProject(subdomain) {
  var myNetrc = netrc();

  if (!myNetrc['git.maodouapp.com']) {
    console.log('Please run "maodou login" first');
    return;
  }

  fs.mkdirSync(subdomain);

  console.log(`Check out a maodou app in ${subdomain} ...`);
  var spinner = new Spinner('%s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  simpleGit(`${process.cwd()}/${subdomain}`)
    .init()
    .addRemote('maodou', `https://git.maodouapp.com/${myNetrc['git.maodouapp.com'].login}/${subdomain}`)
    .pull('maodou', 'master', {'--depth': '1'}, function (err) {
      if (err) {
        spinner.stop(true);
        console.log('Checkout project failed.'.red);
      }
    })
    .then(function() {
      spinner.stop(true);
      console.log('Checkout project succeeded!'.green);
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('checkout', '<subdomain>')
    .description('Check out the code of your app on maodou.io.')
    .action(createProject);
};
