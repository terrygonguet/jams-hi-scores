const fs = require('fs')

fs.writeFileSync("test.json", "{ \"test\":1 }", "w+")

console.log(fs.readFileSync("test.json"))