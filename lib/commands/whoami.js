var netrc = require('netrc');

function whoami() {
  var myNetrc = netrc();
  var login = myNetrc['git.maodou.io'] && myNetrc['git.maodou.io'].login;
  console.log(login || 'Not logged in');
}

module.exports = function(maodou) {
  maodou.program
    .command('whoami')
    .description('print current Logged user')
    .action(whoami);
};
