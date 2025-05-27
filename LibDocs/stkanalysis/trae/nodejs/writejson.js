var fs = require('fs');

var obj = {
   date: []
};
obj.date.push({id: 1, username:'bill'});
var json = JSON.stringify(obj);

thisFileName = 'myjsonfile.json'

function readaFile(filename, aStr) {
  fs.readFile(thisFileName, 'utf8', function read(err, data) {
    if (err) { throw err; }
  });
}

function writeaFile(filename, aStr) {
  fs.writeFile(filename, aStr, (err) => {
    if (err) console.log(err);
    else {
        console.log("File written successfully\n");
    }
  });
}

newdata = ""

let aobj = fs.readFileSync(thisFileName, "utf8");
console.log(aobj);
//aobj = JSON.parse(aobj); //now it an object
//aobj.date.push({id: 20, username: "mic"});
//aStr = JSON.stringify(aobj);
//console.log(aStr)
//writeaFile(thisFileName, aStr)

var text = fs.readFileSync(thisFileName,'utf8')
console.log ("\ntext:\n",text)

var uXSound = new Audio('toneBeep.mp3'); 
uXSound.play();
