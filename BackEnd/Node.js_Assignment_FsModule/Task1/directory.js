const fs = require('fs');

let folder = 'logs';

function ensureFolderExists(folder) {
    if (!fs.existsSync(folder)) {
        console.log("Folder not found. Creating a new  folder...");
        fs.mkdirSync(folder);
    } else {
        console.log("\nFolder already exists");
    }
}

ensureFolderExists(folder);

fs.writeFileSync('logs/info.log','Information about logs');
fs.writeFileSync('logs/warning.log','Information about Warnings');
fs.writeFileSync('logs/error.log','Information about Errors');

const files = fs.readdirSync(folder);
console.log('\nFiles in folder:', files);

console.log('\n', fs.readFileSync('logs/info.log', 'utf8'));
console.log(fs.readFileSync('logs/warning.log', 'utf8'));
console.log(fs.readFileSync('logs/error.log', 'utf8'));

fs.unlinkSync('logs/info.log');
fs.unlinkSync('logs/warning.log');
fs.unlinkSync('logs/error.log');

fs.rmdirSync(folder);
