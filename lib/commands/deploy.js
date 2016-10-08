var simpleGit = require('simple-git');
var netrc = require('netrc');

function pushCommits() {
  var myNetrc = netrc();

  if (!myNetrc['git.maodouapp.com']) {
    console.log('Please run "maodou login" first');
    return;
  }

  // TODO: check if there's no change to push to server
  simpleGit(process.cwd())
    .push('maodou', 'master')
    .then(function () {
      console.log('Your code has been pushed to server and scheduled for deployment.'.green);
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('deploy')
    .description('Deploy to server.')
    .action(pushCommits);
};
