var fs = require('fs');

var maodou = require('../maodou')

whoami = function() {
  var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  this.dir = home + '/.maodou/';
  var configFile = this.dir + 'current-modc.json';
  if(fs.existsSync(configFile)) {
    try {
      this.data = JSON.parse(fs.readFileSync(configFile));
      console.log(this.data.username);
    } catch(e) {
      this.data = null;
    }
    return true;
  } else {
    console.log('Not logged in.');
    return false;
  }
};

maodou.program
  .command('whoami')
  .description('print current Logged user')
  // .on('--help', maodou.printHelp)
  .action(whoami);
