
var maodou = require('../maodou')

maodou.printHelp = function () {
  console.log(`Usage: meteor [--release <release>] [--help] <command> [args]`);
  console.log(``);
  console.log(`Commands:`);
  console.log(`   run                [default] Run this project in local development mode.`);
  console.log(`   debug              Run the project, but suspend the server process for debugging.`);
  console.log(``);
  console.log(`See 'meteor help <command>' for details on a command.`);
};

maodou.program
  .command('help')
  .description('Print help for all commands.')
  .on('--help', maodou.printHelp)
  .action(maodou.printHelp);

//
//
// var maodou = require('../maodou')
// module.exports.text = function() {
//
// };
//
//
// var dt = new Date();
// if (maodou.program.date) {
//   console.log(dt.getFullYear()
//     + '-'
//     + (dt.getMonth() + 1)
//     + '-'
//     + dt.getDate()
//   );
// }
//
//
//
// if (maodou.program.help) {
//   console.log('hahh');
// }
