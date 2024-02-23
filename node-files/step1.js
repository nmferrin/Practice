const fs = require('fs');
const process = require('process');

function cat(path){
    fs.readfile(path,'utf8', function(err,data){
        if (err){
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1);
        } else{
            console.log(data);
        }
    });
}

cat(process.argv[2]);