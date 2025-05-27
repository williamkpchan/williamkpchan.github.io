const WebSocket = require('ws');
const fs = require('fs').promises;
const path = require('path');

// Data storage configuration
const DATA_FILE = path.join(__dirname, 'historical_data.json');
let historicalData = [];
let clients = new Set();

// Initialize server
const wss = new WebSocket.Server({ port: 8080 });
console.log('Server running on port 8080');

// Load historical data from file (if exists)
loadHistoricalData();

// Save data automatically every 5 minutes
setInterval(saveHistoricalData, 5 * 60 * 1000);

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send historical data to new client
  ws.send(JSON.stringify({ type: 'historicalData', data: historicalData }));
  
  // Add client to connections list
  clients.add(ws);
  
  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'command') {
        handleCommand(data.command);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  // Remove client when disconnected
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

// Handle console commands
process.stdin.on('data', (input) => {
  const command = input.toString().trim().toLowerCase();
  handleCommand(command);
});

// Process commands
async function handleCommand(command) {
  if (command === 'save') {
    await saveHistoricalData();
    console.log('✅ Historical data saved to file');
  } else if (command === 'export') {
    // Broadcast export command to all clients
    broadcast({ type: 'command', command: 'exportChart' });
    console.log('📊 Export command sent to browsers');
  } else if (command === 'list') {
    console.log(`📈 Current data points: ${historicalData.length}`);
    console.log(historicalData.slice(-5)); // Show last 5 entries
  } else if (command === 'help') {
    console.log('Available commands: save, export, list, help');
  } else {
    // Treat as data input
    addData(command);
  }
}

// Add new data point
function addData(value) {
  const timestamp = new Date().toISOString();
  const dataPoint = { value, timestamp };
  historicalData.push(dataPoint);
  
  // Broadcast new data to all clients
  broadcast({ type: 'newData', data: dataPoint });
  
  console.log(`➕ Added data: ${value} at ${timestamp}`);
}

// Broadcast message to all clients
function broadcast(message) {
  const msgString = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msgString);
    }
  });
}

// Save historical data to file
async function saveHistoricalData() {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(historicalData, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Load historical data from file
async function loadHistoricalData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    historicalData = JSON.parse(data);
    console.log(`✅ Loaded ${historicalData.length} historical data points`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('📄 No historical data file found, starting fresh');
    } else {
      console.error('Error loading data:', error);
    }
  }
}
