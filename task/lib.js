var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

module.exports = {

    checkPlatform: checkPlatform,
    checkEnvironment: checkEnvironment,
    copyFileSync: copyFileSync,
    copyFolderRecursiveSync: copyFolderRecursiveSync,
    buildFolders: buildFolders,
    getDirectories: getDirectories,
    getFiles: getFiles,
    getModule: getModule,
    deleteFiles: deleteFiles,
    loadJSON: loadJSON,
    crc32: crc32,
    exec: exec
};

function exec(prompt, callback){

    var child = child_process.exec(prompt, function(err, stdout, stderr){

        if(err) {

            console.log(err);
        }
        else {

            if(callback) {

                callback();
            }
        }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}

function loadJSON(path_to_file, parse_from_js){

    var json = fs.readFileSync(path_to_file, {

        encoding: 'utf8'
    });

    if(parse_from_js){

        var pos_var = json.indexOf('var ' + parse_from_js);
        var pos_brackets = json.indexOf('{', pos_var);
        var pos_square = json.indexOf('[', pos_var);

        if((pos_brackets > -1) && ((pos_square === -1) || (pos_brackets < pos_square))){

            json = json.substring(pos_brackets, json.lastIndexOf('};') + 1);
        }
        else{

            json = json.substring(pos_square, json.lastIndexOf('];') + 1);
        }
    }

    return JSON.parse(json.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1'));
}

function copyFileSync(source, target, force){

    if(source.constructor === Array){

        var content = '';

        for(var i = 0; i < source.length; i++){

            if(fs.existsSync(source[i])){

                content += fs.readFileSync(source[i], {encoding: 'utf8'});
            }
        }

        fs.writeFileSync(target, content, 'utf8');
    }
    else{

        var targetFile = target;

        //if target is a directory a new file with the same name will be created
        if(fs.existsSync(target)){

            if(fs.lstatSync(target).isDirectory()){

                targetFile = path.join(target, path.basename(source));
            }
            else if(!force) return;
        }

        //fs.createReadStream(source).pipe(fs.createWriteStream(targetFile));
        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }
}

function copyFolderRecursiveSync(source, target, force){

    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));

    if(!fs.existsSync(targetFolder)){

        fs.mkdirSync(targetFolder);
    }

    if(fs.existsSync(source) && fs.lstatSync(source).isDirectory()){

        files = fs.readdirSync(source);

        files.forEach(function(file){

            var curSource = path.join(source, file);

            if(fs.lstatSync(curSource).isDirectory()){

                copyFolderRecursiveSync(curSource, targetFolder, force);
            }
            else{

                copyFileSync(curSource, targetFolder, force);
            }
        });
    }
}

function getDirectories(dir){

    return fs.readdirSync(dir).filter(function(file) {

        return fs.statSync(dir + '/' + file).isDirectory();
    });
}

function getFiles(dir, type){

    return fs.readdirSync(dir).reduce(function(list, file) {

        var name = path.join(dir, file);
        var isDir = fs.statSync(name).isDirectory();

        if(isDir || (file.lastIndexOf('.' + type) === file.length - type.length - 1)) {

            list = list.concat(isDir ? getFiles(name) : [name]);
        }

        return list;

    }, []);
}

function deleteFiles(dirPath){

    var files;

    try {

        files = fs.readdirSync(dirPath);
    }
    catch(e) {

        console.log(e.message);

        return;
    }

    if(files.length > 0){

        for(var i = 0; i < files.length; i++) {

            var filePath = dirPath + '/' + files[i];

            if(fs.statSync(filePath).isFile()){

                fs.unlinkSync(filePath);
            }
            else{

                deleteFiles(filePath);
            }
        }
    }

    fs.rmdirSync(dirPath);
}

function checkPlatform(parameter){

    if(parameter !== 'www' && !fs.existsSync('app/platform/' + parameter)){

        console.log("Error: Platform '" + parameter + "' was not specified in 'app/platform/'");

        return false;
    }

    else if(!fs.existsSync('public/' + parameter)){

        buildFolders('public/' + parameter);
    }

    return true;
}

function checkEnvironment(env){

    if(!fs.existsSync('app/config/' + env + '.js')){

        console.log("Error: Environment '" + env + "' was not specified in 'app/config/'");

        return false;
    }

    return true;
}

function checkXoneIntegration(path){

    return fs.existsSync(path + '/xone.json');
}

function getModule(name){

    var xone_config = loadJSON('xone.json');
    var xone_manifest = loadJSON('app/manifest.js', 'MANIFEST');
    var resolved_path;

    if(fs.existsSync(resolved_path = path.resolve("./app", xone_manifest.dependencies.xone, "node_modules", name))){

        return resolved_path;
    }
    else if(fs.existsSync(resolved_path = path.resolve("./app", xone_manifest.dependencies.xone, "..", name))){

        return resolved_path;
    }

    // lookup in default node_modules:
    else if(fs.existsSync(resolved_path = path.resolve(xone_config.node_modules_path, name))){

        return resolved_path;
    }
    // lookup in xones node_modules:
    else if(fs.existsSync(resolved_path = path.resolve(xone_config.node_modules_path, 'xone/node_modules/', name))){

        return resolved_path;
    }
    // lookup in default node_modules if already in xone/node_modules/:
    else if(fs.existsSync(resolved_path = path.resolve(xone_config.node_modules_path, '..', '..', name))){

        return resolved_path;
    }

    // alternatives:
    else if(fs.existsSync(resolved_path = path.resolve('app/node_modules/', name))){

        return resolved_path;
    }
    else if(fs.existsSync(resolved_path = path.resolve('app/xone/', name))){

        return resolved_path;
    }
    else if(fs.existsSync(resolved_path = path.resolve('xone/', name))){

        return resolved_path;
    }

    console.warn("Cannot find module: '" + name + "'");

    return false;
}

var crcTable = (function(){

    var c;
    var crcTable = [];

    for(var n = 0; n < 256; n++){

        c = n;

        for(var k = 0; k < 8; k++){

            c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }

        crcTable[n] = c;
    }

    return crcTable;

})();

function crc32(str){

    var crc = 0 ^ (-1);

    for(var i = 0; i < str.length; i++){

        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
}

function buildFolders(folder){

    var folders = (

        folder.indexOf("/") !== -1 ?

            folder.split("/")
            :
            folder.indexOf("\\\\") !== -1 ?

                folder.split("\\\\")
                :
                folder.split("\\")
    );

    var initial_folder = ".";

    for(var i = 0; i < folders.length; i++){

        if(!fs.existsSync(initial_folder += "/" + folders[i])){

            fs.mkdirSync(initial_folder);
        }
    }
}
