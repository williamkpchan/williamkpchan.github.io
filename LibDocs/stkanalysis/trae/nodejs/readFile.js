var fs = require('fs');
thisFileName = 'myjsonfile.json'

fs.readFile(thisFileName, 'utf8', function read(err, data) {
    if (err) { throw err; }
    const content = data;
    processFile(content);
});

function processFile(content) { console.log(content);}

