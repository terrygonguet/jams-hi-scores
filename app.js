const fs = require('fs')

fs.writeFileSync("test.json", "{ \"test\":2 }", { flag: "w+" })

console.log(fs.readFileSync("test.json").toString())

//Test d'écriture coucou - James :)
