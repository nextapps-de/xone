#!/usr/bin/env node

require('./task/lib.js').exec('node "' + __dirname + '/cli/install.js" ' + (process.argv[2] || ''));
