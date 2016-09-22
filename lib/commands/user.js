var maodou = require('../maodou')
var user = {};


user.auth = function (username, password) {
  userAuth(username, password);
};

maodou.login = function () {
  maodou.program.prompt('Username(email): ', function(username){
    maodou.program.password('Password: ', function(password){
      console.log(' ');
      user.auth(username, password);
      process.stdin.destroy();
    });
  });
};

maodou.program
  .command('login')
  .description('Log in to your Meteor developer account.')
  // .on('--help', maodou.printHelp)
  .action(maodou.login);


















// var maodou = require('../maodou')
//
// var user = {};
//
// maodou.program
//   .command('login')
//   .description('Print help for all commands.')
//   // .on('--help', maodou.printHelp)
//   .action(maodou.printHelp);
//
// // if (maodou.program.login) {
// //   console.log('login success!');
// //   if (typeof maodou.program.login == 'string') {
// //     console.log('you are ' + maodou.program.login);
// //   };
// // }
//
// module.exports = user;
//
// var maodou = require('../maodou')
//
// maodou.program
//   .command('login')
//   .description('Print help for all commands.')
  // .action(maodou.printHelp);
