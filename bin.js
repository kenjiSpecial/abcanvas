#!/usr/bin/env node
require('shelljs/global');

var wzrd = require('./')
var argv = require('minimist')(process.argv.slice(2))
var fs = require('fs');


var port = argv.port || argv.p || (argv.https ? 4443 : 9966)

argv.entries = [];


argv._.map(function (arg) {
    if (arg.indexOf(':') === -1) {
        argv.entries.push({from: arg, to: arg})
        return
    }
    var parts = arg.split(':')
    argv.entries.push({from: parts[0], to: parts[1]})
})

if (!argv.entries.length) {
    console.error('Usage: abcCanvas create [filename]');
    console.error('Usage: abcCanvas [filename]');
    process.exit(1)
}


if (argv._[0] == "create") {
    var fileName, inputDirectory;
    fileName = argv._[1];

    if(fileName){
        inputDirectory = __dirname + '/template/template.js';

        cp( inputDirectory, './' + fileName );
        
        console.log(fileName + 'has been created.');
    }else{
        console.error('Usage: abcCanvas create [filename]');
    }

    process.exit(1);
} else if (argv._[0] == "setup") {

    var inputDirectory = __dirname + '/template/package.json';
    cp(inputDirectory, './package.json');
    exec('npm install');

    process.exit(1);
} else {

    if (argv.https) {
        wzrd.https(argv, function (err, server) {
            if (err) {
                console.error('error generating certificate', err)
                process.exit(1)
            }
            server.listen(port, listening)
        })
    } else {
        wzrd.http(argv).listen(port, listening)
    }

    function listening(err) {
        if (err) {
            console.error('error starting server', err)
            process.exit(1)
        }
        console.error('server started at ' + (argv.https ? 'https' : 'http') + '://localhost:' + port);

        // open 'http://localhost:9966/'
        require("openurl").open("http://localhost:9966/");

    }

}

