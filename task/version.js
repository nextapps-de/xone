#!/usr/bin/env node

var lib = require('./lib.js');
var xone_config = lib.loadJSON(__dirname + '/../package.json');

console.log("Xone Version: " + xone_config.version);
