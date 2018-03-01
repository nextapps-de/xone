#!/usr/bin/env node

var platform = process.argv[2];
var lib = require('./lib.js');
var fs = require('fs');
var crypto = require('crypto');

if(platform) {

    if(!lib.checkPlatform(platform)) {

        return;
    }
}

var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');
var dependencies = xone_manifest.dependencies.copy;

for(var i = 0; i < dependencies.length; i++){

    if(dependencies[i].indexOf('.') === -1) {

        if(platform){

            lib.copyFolderRecursiveSync('app/' + dependencies[i], 'public/' + platform, true);
        }
        else{

            lib.copyFolderRecursiveSync('app/' + dependencies[i], 'public/www/', true);
        }
    }
    else {

        if(platform){

            lib.copyFileSync('app/' + dependencies[i], 'public/' + platform + '/' + dependencies[i], true);
        }
        else{

            lib.copyFileSync('app/' + dependencies[i], 'public/www/' + dependencies[i], true);
        }
    }
}

//var package = lib.loadJSON('package.json', '');
var content_html = fs.readFileSync('public/' + platform + '/index.html', 'utf8');

// ---------------------

var content_js = fs.readFileSync('public/' + platform + '/js/build.js', 'utf8');

var checksum_js = crypto.createHash('md5')
                        .update(content_js, 'utf8')
                        .digest('hex');

content_html = content_html.replace('XONE_BUILD_JS', checksum_js);

// ---------------------

var content_css = fs.readFileSync('public/' + platform + '/css/style.css', 'utf8');

var checksum_css = crypto.createHash('md5')
                         .update(content_css, 'utf8')
                         .digest('hex');

content_html = content_html.replace('XONE_BUILD_CSS', checksum_css);

// ---------------------

fs.writeFileSync('public/' + platform + '/index.html', content_html, 'utf8');
