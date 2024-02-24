const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

//commmand line arguments
const [,, cmd, path] = process.argv;

if (!cmd || !path) {
    console.error("Usage: node makeText.js <file|url> <path-to-file|url>");
    process.exit(1);
}

async function generateTextFromFIle(filePath) {
    try {
        const text = fs.readFileSync(filePath, 'utf8');
        const mm = new MarkovMachine(text);
        console.log(mm.makeText());
    } catch (err) {
        console.error("Error reading file: ", err);
        process.exit(1);
    }
}

async function generateTextFromUrl(url) {
    try {
        const response = await axios.get(url);
        const mm = new MarkovMachine(response.data);
        console.log(mm.makeText());
    } catch (err) {
        console.error("Error reading url: ", err);
        process.exit(1);
    }
}

//execute based on cmd line args
if (cmd === 'file') {
    generateTextFromFIle(path);
} else if (cmd === 'url') {
    generateTextFromUrl(path);
} else {
    console.error("Invalid command: ", cmd);
    process.exit(1);
}