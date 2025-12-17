const fs = require('fs');

const file1 = 'text1.txt';

function ensureFileExists(file) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '');
  } else {
    console.log('File Already Exists');
  }
}

ensureFileExists(file1);
fs.writeFileSync(file1, 'Hello dear friends');

let file2 = 'text2.txt';

ensureFileExists(file2);

fs.copyFileSync(file1, file2);

console.log(fs.readFileSync(file1, 'utf8'));
console.log(fs.readFileSync(file2, 'utf8'));

fs.renameSync(file2, 'copiedText2.txt');

console.log(fs.readdirSync('./'));
