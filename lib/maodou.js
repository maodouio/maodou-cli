/*
 * Copyright (c) 2016 Maodou.io
 *
 */

var maodou = module.exports;
require('colors');

maodou.program = require('commander-plus');

require('./commands/login')(maodou);
require('./commands/create')(maodou);
require('./commands/checkout')(maodou);
require('./commands/deploy')(maodou);
require('./commands/whoami')(maodou);
require('./commands/list')(maodou);

maodou.program.on('noCommand', maodou.program.help);
maodou.program.on('*', () => console.log('Command not found.'));

maodou.program.parse(process.argv);
