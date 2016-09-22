/*
 * Copyright (c) 2016 Maodou.io
 *
 */
var fs = require('fs');
var maodou = module.exports;
var colors = require('colors');

maodou.program = require('commander-plus');
maodou.program.Settings.autoHelp = false;

maodou.commands         = {};
maodou.commands.user    = require('./commands/user');
maodou.commands.help    = require('./commands/help');
maodou.commands.status  = require('./commands/status');
maodou.commands.whoami  = require('./commands/whoami');
maodou.commands.create  = require('./commands/create');


maodou.common          = {};
maodou.common.userAuth = require('./common/userAuth');
maodou.common.userConfig = require('./common/userConfig');

maodou.program.on('noCommand', maodou.printHelp);

maodou.program
  .command('*')
  .action(function () {
    console.log('Command not found.');
  });

maodou.program.parse(process.argv);
