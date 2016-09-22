var maodou = require('../maodou')


maodou.program
  .command('heihei')
  .description('Print help for all commands.')
  // .on('--help', maodou.printHelp)
  .action(function(){console.log("heihei");});
