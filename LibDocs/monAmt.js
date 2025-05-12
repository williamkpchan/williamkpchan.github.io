// mon HK stk big amt
const BaseObj = {};
const allResults = {};
prevallResults = {};
firstTime = false
sortmode = 3
upcount = 0
dncount = 0

newUpList = []
newDnList = []

// Global array to store standard deviations
const period = 10;
//const std = new Array(period - 1).fill(null); // Initialize with null
std = []
// Initialize variables for data recording
let upCounter = [];
let downCounter = [];

let freqTable = {};
let prevfreqTable = {};
let largeAmtTable = {};
let largeAmtDnTable = {};
let systemClock;

// prepare basic materials
const baseurl = "https://sqt.gtimg.cn/?q=";
const chunkSize = 60;
const chunks = [];
const urlReqStr = [];

for (let i = 0; i < codetable.length; i += chunkSize) {
	chunks.push(codetable.slice(i, i + chunkSize));
}

for (let i = 0; i < chunks.length; i++) {
	urlReqStr.push(baseurl + chunks[i].map(element => "r_hk" + element).join(","));
}


// queue

// Concurrent request limit
const MAX_CONCURRENT_REQUESTS = 10; // Set the maximum number of concurrent requests

// Queue to manage concurrent requests
const requestQueue = [];
let activeRequests = 0;

// Function to process the next request in the queue
async function processQueue() {
	// return after loop completed
	while (requestQueue.length > 0 || activeRequests > 0) {
		if (activeRequests < MAX_CONCURRENT_REQUESTS && requestQueue.length > 0) {
			activeRequests++;
			const request = requestQueue.shift();
			await request();
			activeRequests--;
		} else {
			// Wait for a short time before checking the queue again
			await new Promise(resolve => setTimeout(resolve, 10));
		}
	}
}

// Add requests to the queue
codetable.forEach(code => {
	requestQueue.push(async () => {
		await collectdata(code); // collect 10 days data
	});
});

// Start processing the queue
// processQueue();


// Function to collect day kline data for a single stock code
async function collectdata(stknum) {
	const stkcode = "hk" + stknum;
	const url = "https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=" + stkcode + ",day,,,10,qfq";
	//const url = `https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=${stkcode},day,,,10,qfq`;
console.log(".")
	try {
		const responseText = await $.get(url);
		const jsonString = responseText.split("=")[1];
		const jsonData = JSON.parse(jsonString);
		const stockName = jsonData.data[stkcode].qt[stkcode][1];

		// Check if qfqday or day exists
		const stockData = jsonData.data[stkcode].qfqday || jsonData.data[stkcode].day;

		if (!stockData || !Array.isArray(stockData)) {
			throw new Error(`Invalid/missing stock data for ${stkcode} ${url}`);
		}

		// Get the array
		dateArray = stockData.map(row => row[0].slice(-2));
		amtArray = stockData.map(row => Number(row[8]));
		const closeArray = stockData.map(row => Number(row[2]));
		const highArray = stockData.map(row => Number(row[3]));
		const lowArray = stockData.map(row => Number(row[4]));
		prevClose = closeArray[closeArray.length - 1];

		// setup the base reference
		// chk the array last day same as today
		const today = new Date();
		const day = today.getDate();

		if (dateArray[dateArray.length - 1] == day) { // if same, remove last element
			amtArray = amtArray.slice(0, -1);
			prevClose = closeArray[closeArray.length - 2];
		}

		const avgAmt = Math.round(averageOfLastN(amtArray, 5));
		const avgAmt2 = Math.round(averageOfLastN(amtArray, 2));
		const amtIdx = Math.round(avgAmt2 / avgAmt * 100);
		const maxH = Math.max(...highArray);
		const minL = Math.min(...lowArray);

		// Store the result in BaseObj
		BaseObj[stknum] = { stockName, avgAmt, maxH, minL, amtIdx, prevClose };
	} catch (error) {
		console.error(`Error ${stknum}:`, error);
	}
}

// Function to add a new element, increment the up counts, and add timestamps
function addToFreqTable(obj, stknumber, stkname, counts, direction) {
	const key = stknumber;
	timestamp = showTime().split(':')
	timestamp = timestamp[0] + timestamp[1] + " " + direction

	if (!obj[key]) {
		// If the key is not present, add a new object with the first timestamp
		obj[key] = { stkname, upCounts: 0, downCounts: 0, difference: 0, timestamps: [timestamp] };
	}

	if (direction === 'up') {
		// Increment the up counts and add a new timestamp
		obj[key].upCounts += counts;
	} else if (direction === 'down') {
		// Increment the down counts and add a new timestamp
		obj[key].downCounts += counts;
	}
}

function showLargeAmtTable() {
	// Convert the object to an array for sorting
	sortedArray = Object.values(largeAmtTable).sort((a, b) => b.amtRatio - a.amtRatio);

	// Create a string to display the sorted results
	displayContent = sortedArray.map(item => {
		return `Ratio: ${item.amtRatio}  ${item.codeStr}`;
	}).join('<br>');
	totalStr = `<br>Total: ${sortedArray.length} <br>`
	// Display the sorted results in the div with ID amtNote
	document.getElementById('amtNote').innerHTML = displayContent + totalStr;


	// Convert the object to an array for sorting
	sortedArray = Object.values(largeAmtDnTable).sort((a, b) => b.amtRatio - a.amtRatio);

	// Create a string to display the sorted results
	displayContent = sortedArray.map(item => {
		return `Ratio: ${item.amtRatio}  ${item.codeStr}`;
	}).join('<br>');
	totalStr = `<br>Total: ${sortedArray.length} <br>`
	// Display the sorted results in the div with ID amtNote
	document.getElementById('dnAmtNote').innerHTML = displayContent + totalStr;


     const newUp = document.getElementById('newUp');
     newUp.innerHTML = ""
     newUpList.forEach(item => {
       const element = document.createElement('o'); // or any other element type
       element.innerHTML = item; // or innerHTML if needed
       newUp.appendChild(element);
     });

     const newDn = document.getElementById('newDn');
     newDn.innerHTML = ""
     newDnList.forEach(item => {
       const element = document.createElement('gr'); // or any other element type
       element.innerHTML = item; // or innerHTML if needed
       newDn.appendChild(element);
     });

}

// Function to generate an HTML table from the freqTable data sorted by upCounts or downCounts
function generateTable(freqTable, sortBy) {
	// Convert the freqTable object into an array of objects
	const tableData = Object.keys(freqTable).map(key => ({
		key,
		stkname: freqTable[key].stkname,
		upCounts: freqTable[key].upCounts,
		downCounts: freqTable[key].downCounts,
		difference: freqTable[key].upCounts - freqTable[key].downCounts,
		timestamps: freqTable[key].timestamps
	}));

	// Sort the tableData array based on the sortBy key (upCounts or downCounts)
	tableData.sort((a, b) => b[sortBy] - a[sortBy]);

	let table = '<table><tr><th>Stock Number</th><th>Stock Name</th><th>upCounts</th><th>downCounts</th><th>difference</th><th>Firsttime</th></tr>';

	// Loop through each object in the sorted tableData array
	tableData.forEach(data => {
		table += '<tr>';
		table += `<td>${data.key}</td>`;
		table += `<td>${data.stkname}</td>`;
		table += `<td>${data.upCounts}</td>`;
		table += `<td>${data.downCounts}</td>`;
		table += `<td>${data.difference}</td>`;
		table += `<td>${data.timestamps}</td>`;
		table += '</tr>';
	});

	table += '</table>';
	sortButton = `<span class="redbut" onclick='generateTable(freqTable, "upCounts")'>up</span><span class="greenbut" onclick='generateTable(freqTable, "downCounts")'>dn</span><span class="goldbut" onclick='generateTable(freqTable, "difference")'>diff</span><span class="bluebut" onclick='generateTable(freqTable, "timestamps")'>FirstTime</span>`
	sortButton = sortButton + table
	$('#FreqTable').html(sortButton);  // 'upCounts' can sort by downCounts

	if (!firstTime) {
		prevfreqTable = { ...freqTable };
	}

}

// Function to calculate the average of the last 10 elements
function averageOfLastN(arr, n) {
	if (arr.length < n) {
		throw new Error("Array must have at least n elements");
	}
	const lastN = arr.slice(-n);
	const sum = lastN.reduce((acc, val) => acc + val, 0);
	return sum / n;
}

// Function to calculate the current amount position
function calcCurAmtPosition(amtArray) {
	const amtavg = averageOfLastN(amtArray, 5);
	const lastAmt = amtArray[amtArray.length - 1];
	let curAmtPosition = Math.round((lastAmt / amtavg) * 100);

	return curAmtPosition;
}

function singleWMA(arr, n) {
	arr = arr.map(Number); // Convert to Number
	if (n > arr.length || n < 1) {
		return 0;
	}
	let weightedSum = 0;
	let weightSum = 0;

	for (let i = 0; i < n; i++) {
		weightedSum += arr[arr.length - n + i] * (i + 1);
		weightSum += (i + 1);
	}

	return Number((weightedSum / weightSum).toFixed(1));
}

function makeMovAve(bigArray, intv) {
	// the intv-1 is correct
	return bigArray.slice(0, intv - 1).concat(calcMovAve(bigArray, intv));
}

function calcAve(aveArray) {
	const add = (a, b) => a + b;
	return aveArray.reduce(add) / aveArray.length;
}

function calcMovAve(bigArray, intv) {
	const ma = [];
	for (let i = 0; i < bigArray.length - intv + 1; i++) {
		ma[i] = Number(calcWAve(bigArray.slice(i, i + intv)).toFixed(1));
	}
	return ma;
}

function calcWAve(aveArray) {
	let sum = 0;
	for (let i = 1; i <= aveArray.length; i++) {
		sum += aveArray[i - 1] * i;
	}
	return sum / ((1 + aveArray.length) * aveArray.length / 2);
}

function updateMovAve(bigArray, intv, newElement) {
	const lastIndex = bigArray.length - 1;
	const lastIntv = bigArray.slice(lastIndex - intv + 1, lastIndex + 1);
	const lastMovAve = calcWAve(lastIntv);
	const updatedMovAve = (lastMovAve * intv - lastIntv[0] + newElement) / intv;
	return updatedMovAve;
}


// Function to fetch data chunks
async function fetchDataChunks(url) {
	// backup allResults
	try {
		const response = await fetch(url);
		const data = await response.text();
		const rows = data.split(";");

		grade30Count = 0
		grade25Count = 0
		grade20Count = 0
		grade15Count = 0
		grade10Count = 0
		grade05Count = 0
		grade01Count = 0
		DownsCount = 0

		$("#grade30").text("")
		$("#grade25").text("")
		$("#grade20").text("")
		$("#grade15").text("")
		$("#grade10").text("")
		$("#grade05").text("")
		$("#grade01").text("")
		$("#Downs").text("")

		rows.forEach(row => {
			const columns = row.split("~");
			if (columns.length > 1) {
				const stockCode = columns[2]; // e.g., "s_hk00700"
				const stknum = stockCode.replace("s_hk", ""); // Extract stock code (e.g., "00700")

				// Check if BaseObj has data for this stock code
				if (BaseObj[stknum] && BaseObj[stknum].avgAmt) {
					const currentAmt = parseFloat(columns[37]); // Current amount from the API
					const todaypct = parseFloat(columns[32]);
					const currentPrice = parseFloat(columns[3]);
					const avgAmt = BaseObj[stknum].avgAmt; // Average amount from BaseObj
					const stkname = BaseObj[stknum].stockName
					const amtIdx = BaseObj[stknum].amtIdx
					const codeStr = `<o onclick="xunbao('` + columns[2] + `')">` + columns[2] + "</o>"
					// console.log(stknum, stkname, currentPrice)


					// Calculate the percentage
					const amtPercentage = Math.round((currentAmt / avgAmt) / 100); // unit size diff

					// check amtPercentage and alert
					checkAmtPercentage(stknum, stkname, currentAmt, avgAmt, todaypct)

					// Calculate minute amtdiff

					if (!firstTime) {
						amtdiff = amtPercentage - prevallResults[stknum].amt;
						pricediff = Number((todaypct - prevallResults[stknum].pct).toFixed(2));

						if (pricediff > 0) { upcount = upcount + 1 }
						if (pricediff < 0) { dncount = dncount + 1 }
						// Record the data
					} else {
						amtdiff = 0
						pricediff = 0
					}

					timestamp = showTime().split(':')
					timestamp = timestamp[0] + timestamp[1]


					// check grades
					if (amtdiff >= 1 && pricediff < 0) {
						warnMsg = codeStr + " " + stkname + " <r>-" + amtdiff + "</r> " + timestamp + ", "
						$("#Downs").append(warnMsg);
						$("#DownsHist").append(warnMsg);
						DownsCount = DownsCount + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'down');
					}

					if (amtdiff > 28 && pricediff > 0) {
						warnMsg = codeStr + " " + stkname + " <lg>+" + amtdiff + "</lg> " + timestamp + ", "
						$("#grade30").append(warnMsg);
						$("#grade30Hist").append(warnMsg);
						grade30Count = grade30Count + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

					} else if (amtdiff > 21 && pricediff > 0) {
						warnMsg = codeStr + " " + stkname + " <lg>+" + amtdiff + "</lg> " + timestamp + ", "
						$("#grade25").append(warnMsg);
						$("#grade25Hist").append(warnMsg);
						grade25Count = grade25Count + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

					} else if (amtdiff > 15 && pricediff > 0) {
						warnMsg = codeStr + " " + stkname + " <lg>+" + amtdiff + "</lg> " + timestamp + ", "
						$("#grade20").append(warnMsg);
						$("#grade20Hist").append(warnMsg);
						grade20Count = grade20Count + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

					} else if (amtdiff > 10 && pricediff > 0) {
						warnMsg = codeStr + " " + stkname + " <lg>+" + amtdiff + "</lg> " + timestamp + ", "
						$("#grade15").append(warnMsg);
						$("#grade15Hist").append(warnMsg);
						grade15Count = grade15Count + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

					} else if (amtdiff > 6 && pricediff > 0) {
						warnMsg = codeStr + " " + stkname + " <lg>+" + amtdiff + "</lg> " + timestamp + ", "
						$("#grade10").append(warnMsg);
						$("#grade10Hist").append(warnMsg);
						grade10Count = grade10Count + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

					} else if (amtdiff > 3 && pricediff > 0) {
						warnMsg = codeStr + " " + stkname + " <lg>+" + amtdiff + "</lg> " + timestamp + ", "
						$("#grade05").append(warnMsg);
						$("#grade05Hist").append(warnMsg);
						grade05Count = grade05Count + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

					} else if (amtdiff >= 1 && pricediff > 0) {
						warnMsg = codeStr + " " + stkname + " <lg>+" + amtdiff + "</lg> " + timestamp + ", "
						$("#grade01").append(warnMsg);
						$("#grade01Hist").append(warnMsg);
						grade01Count = grade01Count + 1
						addToFreqTable(freqTable, codeStr, stkname, 1, 'up');
					}

					//updateUniqueItems("#grade30Hist");
					//updateUniqueItems("#grade25Hist");
					//updateUniqueItems("#grade20Hist");
					//updateUniqueItems("#grade15Hist");
					//updateUniqueItems("#grade10Hist");
					//updateUniqueItems("#grade05Hist");
					//updateUniqueItems("#grade01Hist");

					// Store the result in allResults
					allResults[stknum] = {
						code: codeStr,
						name: stkname,
						cPrice: currentPrice,
						pct: todaypct,
						pctdiff: pricediff,
						amt: amtPercentage, // Replace amt with the calculated percentage
						amtdiff: amtdiff,
						amtIdx: amtIdx,
					};

				} else {
					console.warn(`No BaseObj data found for stock code: ${stknum}`);
				}
			}
		});
		$("#grade30Count").html("Total:" + "<r>" + grade30Count + "</r>");
		$("#grade25Count").html("Total:" + "<r>" + grade25Count + "</r>");
		$("#grade20Count").html("Total:" + "<r>" + grade20Count + "</r>");
		$("#grade15Count").html("Total:" + "<r>" + grade15Count + "</r>");
		$("#grade10Count").html("Total:" + "<r>" + grade10Count + "</r>");
		$("#grade05Count").html("Total:" + "<r>" + grade05Count + "</r>");
		$("#grade01Count").html("Total:" + "<r>" + grade01Count + "</r>");

	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

function checkAmtPercentage(stknum, stkname, currentAmt, avgAmt, todaypct) {
    // Ensure largeAmtTable exists
    if (!largeAmtTable) {
        largeAmtTable = {};
    }

    // Calculate ratio
    const amtRatio = Math.round(currentAmt / 10000 / avgAmt * 100);

    // Get current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const systemClock = hours * 100 + minutes;

    // Define threshold conditions
    const conditions = [
        systemClock < 1000 && amtRatio > 70,
        systemClock < 1100 && amtRatio > 80,
        systemClock < 1200 && amtRatio > 90,
        systemClock < 1400 && amtRatio > 100,
        systemClock < 1500 && amtRatio > 110,
        systemClock <= 2359 && amtRatio > 130
    ];

    // Check if any condition is met and price is positive
    if (conditions.some(condition => condition) && todaypct > 0) {
        const codeStr = `<o onclick="xunbao('${stknum}')">${stknum} ${stkname}</o>, `;

        // Update if exists, add if doesn't
        if (largeAmtTable[stknum]) {
            largeAmtTable[stknum].amtRatio = amtRatio; // Update the ratio
        } else {
            largeAmtTable[stknum] = {
                stknum: stknum,
                amtRatio: amtRatio,
                codeStr: codeStr
            };

            newUpList.push(codeStr)
        }
    }

    // Check if any condition is met and price is negative
    if (conditions.some(condition => condition) && todaypct < 0) {
        const codeStr = `<gr onclick="xunbao('${stknum}')">${stknum} ${stkname}</gr>, `;
        
        // Update if exists, add if doesn't
        if (largeAmtDnTable[stknum]) {
            largeAmtDnTable[stknum].amtRatio = amtRatio; // Update the ratio
        } else {
            largeAmtDnTable[stknum] = {
                stknum: stknum,
                amtRatio: amtRatio,
                codeStr: codeStr
            };
            newDnList.push(codeStr)
        }
    }
}

function updateUniqueItems(elemId) {  // set unique items in history record
	let elem = $(elemId);
	let elemArr = elem.html().split(', ');
	let uniqueItems = [...new Set(elemArr)];
	elem.html(uniqueItems.join(", "));
}

function countUniqueItems(elemId) {  // set unique items in history record
	let elem = $(elemId);
	let elemArr = elem.html().split(', ');
	let uniqueItems = [...new Set(elemArr)];
	uniqueItemsLen = uniqueItems.length - 1
	elem.prepend("<lg>Total: " + uniqueItemsLen + "</lg>, ")
}

// Function to update the HTML page with sorted data
function updateHTML() {
	if (sortmode == 0) {
		sortedResults = Object.keys(allResults).sort((a, b) => {
			return allResults[b].pct - allResults[a].pct;
		});

	} else if (sortmode == 1) {
		sortedResults = Object.keys(allResults).sort((a, b) => {
			return allResults[b].pctdiff - allResults[a].pctdiff;
		});

	} else if (sortmode == 2) {
		sortedResults = Object.keys(allResults).sort((a, b) => {
			return allResults[b].amtdiff - allResults[a].amtdiff;
		});

	} else if (sortmode == 4) {
		sortedResults = Object.keys(allResults).sort((a, b) => {
			return allResults[b].cPrice - allResults[a].cPrice;
		});

	} else if (sortmode == 3) {
		sortedResults = Object.keys(allResults).sort((a, b) => {
			return allResults[b].amt - allResults[a].amt;
		});
	}

	const tableBody = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
	tableBody.innerHTML = '';

	sortedResults.forEach(stockCode => {
		const row = tableBody.insertRow();
		const cell1 = row.insertCell(0); // code number
		const cell2 = row.insertCell(1); // stk name
		const cell3 = row.insertCell(2); // current price
		const cell4 = row.insertCell(3); // day pricediff
		const cell5 = row.insertCell(4); // min pricediff
		const cell6 = row.insertCell(5); // day amtchg
		const cell7 = row.insertCell(6); // min amt chg
		const cell8 = row.insertCell(7); // amtIdx

		cell1.innerHTML = allResults[stockCode].code;
		cell2.textContent = allResults[stockCode].name;
		cell3.textContent = allResults[stockCode].cPrice;

		if (allResults[stockCode].pct < 0) {
			cell4.innerHTML = "<r>" + allResults[stockCode].pct + "</r>";
		} else if (allResults[stockCode].pct > 0) {
			cell4.innerHTML = "<lg>" + allResults[stockCode].pct + "</lg>";
		} else {
			cell4.textContent = allResults[stockCode].pct;
		}

		if (allResults[stockCode].pctdiff < 0) {
			cell5.innerHTML = "<r>" + allResults[stockCode].pctdiff + "</r>";
		} else if (allResults[stockCode].pctdiff > 0) {
			cell5.innerHTML = "<lg>" + allResults[stockCode].pctdiff + "</lg>";
		} else {
			cell5.textContent = allResults[stockCode].pctdiff;
		}

		if (allResults[stockCode].amt > allResults[stockCode].amtIdx) {
			cell6.innerHTML = "<lg>" + allResults[stockCode].amt + "</lg>";
		} else {
			cell6.textContent = allResults[stockCode].amt;
		}

		cell7.textContent = allResults[stockCode].amtdiff;
		cell8.textContent = allResults[stockCode].amtIdx;
	});
}

function xunbao(xunbaocode) {
	sessionStorage.setItem("randomcode", xunbaocode)
	localStorage.setItem("randomcode", xunbaocode)
	localStorage.setItem("otherCode", xunbaocode)
	localStorage.setItem("stkCode", xunbaocode)

	window.open("Random Charts.html");
	// locs = ["HIghLowTrend.html", "Random Charts.html", ]
	//  window.open("HIghLowTrend.html")
}


function getChar(event) {
	if (event.which != 0 && event.charCode != 0) {
		return String.fromCharCode(event.which)   // the rest
	} else {
		return null // special key
	}
}


// Main function to collect basic data
async function main() {
	await processQueue();
	await updateInfo();
}

async function updateChanges() {
	const timearr = showTime().split(':')
	const timestr = timearr[0] + timearr[1]
	systemClock = Number(timestr)
	if (!(systemClock > 925 && systemClock < 1201 ||
		systemClock > 1259 && systemClock < 1601)) {
		document.getElementById("dateAndTime").innerHTML = "<lg>" + showDate() + "</lg> " + showTime() + "<o> Market Closed</o>";
		return
	}
	sortmode = 3
	upcount = 0
	dncount = 0
	newUpList = []
	newDnList = []

	await updateInfo()
}

async function updateInfo() {
	firstTime = false
	if (Object.keys(prevallResults).length === 0 && Object.keys(allResults).length == 0) {
		firstTime = true
	} else if (Object.keys(allResults).length != 0) {
		prevallResults = { ...allResults };
		firstTime = false
	}
	for (let i = 0; i < urlReqStr.length; i++) {
		await fetchDataChunks(urlReqStr[i]);
		// console.log(urlReqStr[i])
	}
	//console.log("check prevallResults value:",prevallResults["00388"])
	//console.log("check allResults value:",allResults["00388"])
	//console.log("firstTime",firstTime)
	updateHTML();
	updnStr = ' <span class="redbut"> <lg>Up ' + upcount + "</lg> <r>Dn " + dncount + "</r></span>"

	$("#dateAndTime").html("<y>" + showDate() + "</y> " + showTime() + updnStr)

	// Call the function to generate the freqTable
	generateTable(freqTable, 'difference')
	showLargeAmtTable()


	updateChart();
}

// <y>标准差</y>
function standardDeviation(data, period) {
	data = data.map(Number); // Convert to Number
	const std = new Array(period - 1).fill(null); // <y>填充 null</y>
	for (let i = period - 1; i < data.length; i++) {
		const avg = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
		const variance = data.slice(i - period + 1, i + 1).reduce((a, b) => a + Math.pow(b - avg, 2), 0) / period;
		std.push(Number(Math.sqrt(variance).toFixed(1)));
	}
	return std;
}

// updateStandardDeviation
function updateStandardDeviation(data, range) {
	// Ensure data is numeric
	latestStd = 0
	const numericData = data.map(Number);

	// Only proceed if we have enough data
	if (numericData.length < range) {
		std.push(0);
	} else {
		// Calculate the latest window
		const latestWindow = numericData.slice(-range); // Take last `range` elements
		const avg = latestWindow.reduce((a, b) => a + b, 0) / range;
		const variance = latestWindow.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / range;
		latestStd = Number(Math.sqrt(variance).toFixed(1));

		// Push the latest value to the global `std` array
		std.push(latestStd);
	}
	return latestStd
}




// Function to update chart
function updateChart() {

	const timestamp = new Date().getTime();
	const imgSrc = `https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=T&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=22&indpara2=1.6&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&scheme=3&com=100&chartwidth=1150&chartheight=500&stockid=110000&period=5012&type=1&logoStyle=1&_=${timestamp}`;
	document.getElementById("imgoutput").innerHTML = `<img src="${imgSrc}" alt="Updated Chart">`;
}


// Start the main process
main();
setInterval(updateChanges, 60000);
