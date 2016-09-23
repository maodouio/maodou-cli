var simpleGit = require('simple-git')(process.cwd());
var Spinner = require('cli-spinner').Spinner;
var netrc = require('netrc');

function createProject(directory) {
  var myNetrc = netrc();

  if (!myNetrc['git.maodou.io']) {
    console.log('Please run "maodou login" first');
    return;
  }

  var repoPath = 'https://github.com/maodouio/meteor-react-redux-base.git';
  var localPath = process.cwd() + '/' + directory;

  console.log(`Creating a new Maodou app in ${directory} ...`);
  var spinner = new Spinner('%s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  simpleGit.clone(repoPath, localPath, '--depth 1')
    .then(function() {
      simpleGit.cwd(localPath).addRemote('maodou', 'https://git.maodou.io/username/random-project');
    })
    .then(function () {
      spinner.stop(true);
      console.log("\nCreated.");
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('create', '<directory>')
    .description('Create a site both locally and on maodou.io.')
    .action(createProject);
};
