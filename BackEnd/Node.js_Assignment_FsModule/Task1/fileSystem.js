const fs = require("fs");

const file = "data.json";


function ensureFileExists(file) {
    if (!fs.existsSync(file)) {
        console.log("File not found. Creating a new empty file...");
        fs.writeFileSync(file, "");
    } else {
        console.log("\nFile already exists.");
    }
}


const objectJson = {
    name: "Arman",
    age: 25,
    isStudent: true,
};


ensureFileExists(file);


console.log("\nWriting object to file...");
fs.writeFileSync(file, JSON.stringify(objectJson, null, 2));

console.log("\nFile content after writing:");
console.log("--------------------------------");
console.log(fs.readFileSync(file, "utf8"));
console.log("--------------------------------");

const text = "Hello dear friends";
console.log("\nAdding a new line to the file...");
fs.appendFileSync(file, text + "\n", "utf8");

console.log("\nFile content after append:");
console.log("--------------------------------");
console.log(fs.readFileSync(file, "utf8"));
console.log("--------------------------------");

console.log("\nRemoving the file...");
fs.unlinkSync(file);

console.log("All operations completed successfully!");


