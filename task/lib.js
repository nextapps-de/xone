var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

module.exports = {

    checkPlatform: checkPlatform,
    copyFileSync: copyFileSync,
    copyFolderRecursiveSync: copyFolderRecursiveSync,
    getDirectories: getDirectories,
    getFiles: getFiles,
    deleteFiles: deleteFiles,
    loadJSON: loadJSON,
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

        json = json.substring(json.indexOf('var ' + parse_from_js));
        json = json.substring(json.indexOf('{'), json.lastIndexOf('};') + 1);
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

    if(fs.lstatSync(source).isDirectory()){

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

function checkPlatform(parameter){

    if(parameter !== 'www' && !fs.existsSync('app/platform/' + parameter)){

        console.log("Error: Platform '" + parameter + "' was not specified in 'app/platform/'");

        return false;
    }

    else if(!fs.existsSync('bin/' + parameter)){

        fs.mkdirSync('bin/' + parameter);
    }

    return true;
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

function checkXoneIntegration(path){

    return fs.existsSync(path + '/xone.json');
}
