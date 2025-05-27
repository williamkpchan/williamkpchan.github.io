// server.js
const express = require('express');
const WebSocket = require('ws');
const readline = require('readline');

const app = express();
const port = 3000;

// Create HTTP server
const server = app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static('public'));

// Set up command line interface
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

const clients = new Set();
const historicalData = []; // Array to store all historical data

wss.on('connection', (ws) => {
 clients.add(ws);
 console.log('New client connected');

 // Send all historical data to the new client
 if (historicalData.length > 0) {
  ws.send(JSON.stringify({
   type: 'init',
   data: historicalData
  }));
 }

 ws.on('close', () => {
  clients.delete(ws);
  console.log('Client disconnected');
 });

 ws.on('error', (error) => {
  console.log('Client error:', error);
 });
});

function sendDataToClients(data) {
 // Add new data to historical array
 historicalData.push(data);
 console.log(`Historical data count: ${historicalData.length}`);

 // Send to all connected clients
 clients.forEach(client => {
  if (client.readyState === WebSocket.OPEN) {
   client.send(JSON.stringify({
    type: 'update',
    data: data
   }));
  }
 });
}

function promptForData() {
 rl.question('Enter a number (or "stop" to end): ', (input) => {
  if (input.toLowerCase() === 'stop') {
   console.log('Ending data collection');
   sendDataToClients({ command: 'stop' });
   rl.close();
   process.exit(0);
  } else {
   const num = parseFloat(input);
   if (!isNaN(num)) {
    const timestamp = new Date().toISOString();
    const dataPoint = { value: num, timestamp };
    sendDataToClients(dataPoint);
    promptForData(); // Continue prompting
   } else {
    console.log('Invalid input. Please enter a number.');
    promptForData();
   }
  }
 });
}

// Start the data collection process
console.log('Waiting for clients to connect...');
wss.on('listening', () => {
 setTimeout(promptForData, 1000);
});
