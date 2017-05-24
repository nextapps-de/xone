#!/usr/bin/env node

require('./task/lib.js').exec('node "' + __dirname + '/task/version.js" ' + (process.argv[2] || '') + ' ' + (process.argv[3] || ''));
