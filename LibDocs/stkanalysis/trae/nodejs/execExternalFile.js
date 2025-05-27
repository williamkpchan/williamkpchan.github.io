const fs = require('node:fs');
const content = 'Some content!';

fs.writeFile('test.html', content, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});

var run = require('child_process').exec;
//run('Minute.html');
run('test.html');
