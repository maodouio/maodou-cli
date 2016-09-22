var simpleGit = require('simple-git')(process.cwd());
var Spinner = require('cli-spinner').Spinner;
var netrc = require('netrc');
var myNetrc = netrc();

var maodou = require('../maodou');

function createProject() {
  if (!myNetrc['git.maodou.io']) {
    console.log('Please run "maodou login" first');
    return;
  }

  var repoPath = 'https://github.com/maodouio/meteor-react-redux-base.git';
  var argv = process.argv[3] ? process.argv[3] : "newApp";
  var localPath = process.cwd() + '/' + argv;
  var dotGitPath = localPath + '/.git';
  // console.log(dotGitPath);

  console.log('Creating a new Maodou app in ' + `'` + argv + `' ...`);
  var spinner = new Spinner('%s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  // console.log(localPath);
  simpleGit.clone(repoPath, localPath, '--depth 1')
    .then(function() {
      simpleGit.cwd(localPath).addRemote('maodou', 'https://git.maodou.io/username/random-project');
    }).then(function () {
      spinner.stop(true);
      console.log("\nCreated.");
    });
}

maodou.program
  .command('create')
  .description('Print help for all commands.')
  // .on('--help', maodou.printHelp)
  .action(createProject);
