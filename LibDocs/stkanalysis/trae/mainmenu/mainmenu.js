const fs = require('fs');
const readline = require('readline');
const { spawn } = require('child_process');

// Read the text file
const readTextFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.trim().split('\n');
    const fileContent = lines.map((line, index) => `${index + 1}: ${line}`).join('\n');
    console.log("\nMain menu\n\n");
    console.log(fileContent,"\n\n");
    return lines;
};

// Process the command based on the line number
const processCommand = (lines, lineNumber) => {
    const line = lines[lineNumber - 1];
    if (!line) {
        console.log('Invalid line number.');
        return;
    }

    const [path, fileName] = line.split('\t');
    console.log(`Executing ${lineNumber}: node ${path}/${fileName}`);
    // Execute the command here

    // Spawn a new process to run another script
    const childProcess = spawn('node', [`${path}/${fileName}`]);

    // Listen for the 'close' event to know when the child process has finished
    childProcess.on('close', (code) => {
        console.log(`Child process finished with code ${code}`);
    // Code to execute after the child process has completed
});

};

// Main function
const main = (filePath) => {
    const lines = readTextFile(filePath);
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Select number: ', (answer) => {
        const lineNumber = parseInt(answer);
        processCommand(lines, lineNumber);
        rl.close();
    });
};

// Path to the text file containing paths and file names
const filePath = 'mainmenu.txt';
main(filePath);
