// show status messages
// display the array
// load array from localStorage
// save array to localStorage
// add a random item to the array
// clear the array


// Initialize array with default value or from localStorage
let historyArray = [];
const STORAGE_KEY = 'historyArrayData';

// Function to show status messages
function showStatus(message, type = 'info') {
  statusMessage.textContent = message;
  statusMessage.className = `status ${type}`;
  statusMessage.style.display = 'block';
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 3000);
}

// Function to display the array
function displayArray() {
  if (historyArray.length === 0) {
    arrayDisplay.innerHTML = '<span class="empty-array">Array is empty.</span>';
  } else {
    arrayDisplay.textContent = JSON.stringify(historyArray, null, 2);
  }
}

// Function to load array from localStorage
function loadArrayFromLocalStorage() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
        historyArray = JSON.parse(storedData);
        showStatus(`Array loaded from localStorage with ${historyArray.length} items`, 'success');
    } else {
        // Initialize with default data if nothing is stored
        historyArray = [
          "First item loaded from default",
          "Second item",
          "Third item"
        ];
        showStatus('No data found in localStorage. Using default array.', 'info');
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    historyArray = ["Error loading data"];
    showStatus('Error loading data from localStorage. Using empty array.', 'error');
  }
  
  displayArray();
}

// Function to save array to localStorage
function saveArrayToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyArray));
    showStatus(`Array saved to localStorage with ${historyArray.length} items`, 'success');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    showStatus('Error saving data to localStorage', 'error');
  }
}

// Function to add a random item to the array
function addRandomItem() {
  const items = [
    "Random Item " + Math.floor(Math.random() * 1000),
    "New Entry " + Date.now().toString().slice(-4),
    "Sample Data " + Math.floor(Math.random() * 100),
    "Test Item " + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    "Generated at " + new Date().toLocaleTimeString()
  ];
  
  const randomItem = items[Math.floor(Math.random() * items.length)];
  historyArray.push(randomItem);
  displayArray();
  showStatus(`Added: "${randomItem}" to the array`, 'info');
}

// Function to add an item to the array
function addItem(theItem) {
  historyArray.push(theItem);
  saveArrayToLocalStorage();
}

// Function to clear the array
function clearArray() {
  if (historyArray.length > 0) {
    historyArray = [];
    displayArray();
    showStatus('Array cleared', 'info');
  } else {
    showStatus('Array is already empty', 'info');
  }
}

// Event listeners
addItem("anItem");
clearButton.addEventListener('click', clearArray);

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadArrayFromLocalStorage);

// Also show localStorage info on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('LocalStorage Array Manager initialized');
  console.log('LocalStorage key:', STORAGE_KEY);
  console.log('Current array:', historyArray);
});
