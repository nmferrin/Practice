const fs = require('fs');
const process = require('process');
const axios = require('axios');


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


async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) { 
        console.error(`Error reading ${url}: ${err}`)
        process.exit(1);
    }
}




let path = process.argv[2];

if (path.slice(0,4) === 'http') {
    webCat(path);
} else { 
    cat(path);
}