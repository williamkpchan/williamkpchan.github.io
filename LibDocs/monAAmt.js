
BaseRef = {};
const BaseObj = {};
const allResults = {};
prevallResults = {};
firstTime = false
sortmode = false
upcount = 0
dncount = 0

// Initialize variables for data recording
let upDnDiffArr = [];

// Initialize variables for data recording
let upCounter = [];
let downCounter = [];

let freqTable = {};

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

  // Get the canvas element for the chart
  const ctx = document.getElementById('ChartRecord').getContext('2d');
  const ChartRecord = new Chart(ctx, {
   type: 'line',
   data: {
    labels: [],
    datasets: [
     {
        label: 'upDnDiff',
        data: upDnDiffArr,
        borderColor: 'green', // Blue-green color
        borderWidth: 1,
        fill: false,
        pointStyle: 'dash', // Set the point shape
     },
    ]
   },
   options: {
    scales: {
     y: {
      beginAtZero: true,
      display: true,
     }
    }
   }
  });

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


// Function to collect data for a single stock code
async function collectdata(stknum) {
  const stkcode = "hk" + stknum;
  const url = "https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=" + stkcode + ",day,,,10,qfq";

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
    const highArray = stockData.map(row => Number(row[3]));
    const lowArray = stockData.map(row => Number(row[4]));

    // setup the base reference
     // chk the array last day same as today
     const today = new Date();
     const day = today.getDate();

    if(dateArray[dateArray.length-1]==day){ // if same, remove last element
      amtArray = amtArray.slice(0, -1);
    }

    const avgAmt = Math.round(averageOfLastN(amtArray, 5));
    const avgAmt2 = Math.round(averageOfLastN(amtArray, 2));
    const amtIdx = Math.round(avgAmt2/avgAmt*100);
    const maxH = Math.max(...highArray);
    const minL = Math.min(...lowArray);

    // Store the result in BaseObj
    BaseObj[stknum] = { stockName, avgAmt, maxH, minL, amtIdx };
  } catch (error) {
    console.error(`Error ${stknum}:`, error);
  }
}

// Function to add a new element, increment the up counts, and add timestamps
function addToFreqTable(obj, stknumber, stkname, counts, direction) {
 const key = stknumber;
 timestamp = showTime().split(':')
 timestamp = timestamp[0]+timestamp[1]

 if (!obj[key]) {
  // If the key is not present, add a new object with the first timestamp
  obj[key] = { stkname, upCounts: 0, downCounts: 0, timestamps: [timestamp] };
 }

 if (direction === 'up') {
  // Increment the up counts and add a new timestamp
  obj[key].upCounts += counts;
 } else if (direction === 'down') {
  // Increment the down counts and add a new timestamp
  obj[key].downCounts += counts;
 }
}

// Function to generate an HTML table from the freqTable data sorted by upCounts or downCounts
function generateTable(freqTable, sortBy) {
    // Convert the freqTable object into an array of objects
    const tableData = Object.keys(freqTable).map(key => ({ 
        key, 
        stkname: freqTable[key].stkname, 
        upCounts: freqTable[key].upCounts, 
        downCounts: freqTable[key].downCounts, 
        timestamps: freqTable[key].timestamps 
    }));

    // Sort the tableData array based on the sortBy key (upCounts or downCounts)
    tableData.sort((a, b) => b[sortBy] - a[sortBy]);

    let table = '<table><tr><th>Stock Number</th><th>Stock Name</th><th>upCounts</th><th>downCounts</th><th>Firsttime</th></tr>';

    // Loop through each object in the sorted tableData array
    tableData.forEach(data => {
        table += '<tr>';
        table += `<td>${data.key}</td>`;
        table += `<td>${data.stkname}</td>`;
        table += `<td>${data.upCounts}</td>`;
        table += `<td>${data.downCounts}</td>`;
        table += `<td>${data.timestamps}</td>`;
        table += '</tr>';
    });

    table += '</table>';
    return table;
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

// Function to fetch data chunks
async function fetchDataChunks(url) {
  // backup allResults
  try {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split(";");

          grade30Count=0
          grade25Count=0
          grade20Count=0
          grade15Count=0
          grade10Count=0
          grade05Count=0
          grade01Count=0

          $("#grade30").text("")
          $("#grade25").text("")
          $("#grade20").text("")
          $("#grade15").text("")
          $("#grade10").text("")
          $("#grade05").text("")
          $("#grade01").text("")

    rows.forEach(row => {
      const columns = row.split("~");
      if (columns.length > 1) {
        const stockCode = columns[2]; // e.g., "s_hk00700"
        const stknum = stockCode.replace("s_hk", ""); // Extract stock code (e.g., "00700")

        // Check if BaseObj has data for this stock code
        if (BaseObj[stknum] && BaseObj[stknum].avgAmt) {
          const currentAmt = parseFloat(columns[37]); // Current amount from the API
          const todaypct = parseFloat(columns[32]); // Current amount from the API
          const currentPrice = parseFloat(columns[3]); // Current amount from the API
          const avgAmt = BaseObj[stknum].avgAmt; // Average amount from BaseObj
          const stkname = BaseObj[stknum].stockName
          const amtIdx = BaseObj[stknum].amtIdx
          const codeStr = `<o onclick="xunbao('` + columns[2] + `')">`+ columns[2] + "</o>"
          // console.log(stknum, stkname, currentPrice)

          // Calculate the percentage
          const amtPercentage = Math.round((currentAmt / avgAmt)/100); // unit size diff

          // Calculate minute amtdiff

          if (!firstTime) {
            amtdiff = amtPercentage - prevallResults[stknum].amt;
            pricediff = (todaypct - prevallResults[stknum].pct).toFixed(2);

            if(pricediff>0){upcount = upcount +1}
            if(pricediff<0){dncount = dncount +1}
            // Record the data
          }else{
            amtdiff = 0
            pricediff = 0
          }


          // check grades
          if(amtdiff>=1 && pricediff<0){
            warnMsg = codeStr + stkname+", "
            addToFreqTable(freqTable, codeStr, stkname, 1, 'down');
          }
          if(amtdiff>28 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade30").append( warnMsg);
            $("#grade30Hist").append( warnMsg);
            grade30Count=grade30Count+1
            addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

          }else if(amtdiff>21 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade25").append( warnMsg);
            $("#grade25Hist").append( warnMsg);
            grade25Count=grade25Count+1
            addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

          }else if(amtdiff>15 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade20").append( warnMsg);
            $("#grade20Hist").append( warnMsg);
            grade20Count=grade20Count+1
            addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

          }else if(amtdiff>10 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade15").append( warnMsg);
            $("#grade15Hist").append( warnMsg);
            grade15Count=grade15Count+1
            addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

          }else if(amtdiff>6 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade10").append( warnMsg);
            $("#grade10Hist").append( warnMsg);
            grade10Count=grade10Count+1
            addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

          }else if(amtdiff>3 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade05").append( warnMsg);
            $("#grade05Hist").append( warnMsg);
            grade05Count=grade05Count+1
            addToFreqTable(freqTable, codeStr, stkname, 1, 'up');

          }else if(amtdiff>=1 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade01").append( warnMsg);
            $("#grade01Hist").append( warnMsg);
            grade01Count=grade01Count+1
            addToFreqTable(freqTable, codeStr, stkname, 1, 'up');
          }

          updateUniqueItems("#grade30Hist");
          updateUniqueItems("#grade25Hist");
          updateUniqueItems("#grade20Hist");
          updateUniqueItems("#grade15Hist");
          updateUniqueItems("#grade10Hist");
          updateUniqueItems("#grade05Hist");
          updateUniqueItems("#grade01Hist");

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
          $("#grade30Count").html("Total:"+"<r>"+grade30Count+"</r>");
          $("#grade25Count").html("Total:"+"<r>"+grade25Count+"</r>");
          $("#grade20Count").html("Total:"+"<r>"+grade20Count+"</r>");
          $("#grade15Count").html("Total:"+"<r>"+grade15Count+"</r>");
          $("#grade10Count").html("Total:"+"<r>"+grade10Count+"</r>");
          $("#grade05Count").html("Total:"+"<r>"+grade05Count+"</r>");
          $("#grade01Count").html("Total:"+"<r>"+grade01Count+"</r>");


  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateUniqueItems(elemId) {  // set unique items in history record
    let elem = $(elemId);
    let elemArr = elem.html().split(', ');
    let uniqueItems = [...new Set(elemArr)];
    elem.html(uniqueItems.join(", "));
}

// Function to update the HTML page with sorted data
function updateHTML() {
  if(sortmode == false){
    sortedResults = Object.keys(allResults).sort((a, b) => {
      return allResults[b].pctdiff - allResults[a].pctdiff;
    });
    $('#mode').html("<y>转分钟金额排序</y>")
  }else{
    sortedResults = Object.keys(allResults).sort((a, b) => {
      return allResults[b].amtdiff - allResults[a].amtdiff;
    });
    $('#mode').html("转分钟价差排序")
  }
  sortmode = !sortmode;

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

    cell1.innerHTML  = allResults[stockCode].code;
    cell2.textContent = allResults[stockCode].name;
    cell3.textContent = allResults[stockCode].cPrice;

    if(allResults[stockCode].pct<0){
      cell4.innerHTML = "<r>"+allResults[stockCode].pct+"</r>";
    }else if(allResults[stockCode].pct>0){
      cell4.innerHTML = "<lg>"+allResults[stockCode].pct+"</lg>";
    }else{
      cell4.textContent = allResults[stockCode].pct;
    }

    if(allResults[stockCode].pctdiff<0){
      cell5.innerHTML = "<r>"+allResults[stockCode].pctdiff+"</r>";
    }else if(allResults[stockCode].pctdiff>0){
      cell5.innerHTML = "<lg>"+allResults[stockCode].pctdiff+"</lg>";
    }else{
      cell5.textContent = allResults[stockCode].pctdiff;
    }

    if (allResults[stockCode].amt>allResults[stockCode].amtIdx) {
      cell6.innerHTML = "<lg>"+allResults[stockCode].amt+"</lg>";
    }else{
      cell6.textContent = allResults[stockCode].amt;
    }

    cell7.textContent = allResults[stockCode].amtdiff;
    cell8.textContent = allResults[stockCode].amtIdx;
  });
}

function xunbao(xunbaocode) {
       localStorage.setItem("randomcode", xunbaocode)
       localStorage.setItem("otherCode", xunbaocode)
       localStorage.setItem("stkCode", xunbaocode)

       window.open("Random Charts.html");
       // locs = ["HIghLowTrend.html", "Random Charts.html", ]
       //  window.open("HIghLowTrend.html")
}

function chkKey() {
       var testkey = getChar(event);
       if(testkey == 't'){window.scrollTo(0,0);}
       else if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
       else if(testkey == 's'){updateHTML();}
       else{chkOtherKeys(testkey)} 
}

function getChar(event) {
       if (event.which!=0 && event.charCode!=0) {
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
  const timestr = timearr[0]+timearr[1]
  if(!(Number(timestr)>925 && Number(timestr)<1201 || 
       Number(timestr)>1259 && Number(timestr)<1601)){
    document.getElementById("dateAndTime").innerHTML ="<lg>"+showDate() +"</lg> "+ showTime() + "<o> Market Closed</o>";
    return
  }
  sortmode = true
  upcount = 0
  dncount = 0
  await updateInfo()
}

async function updateInfo() {
  firstTime = false
  if (Object.keys(prevallResults).length === 0 && Object.keys(allResults).length == 0 ) {
    firstTime = true
  }else if (Object.keys(allResults).length != 0 ) {
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
  updnStr = " <lg>Up "+ upcount + "</lg> <r>Dn " + dncount +"</r>"

  $("#dateAndTime").html("<y>"+showDate() +"</y> "+ showTime() + updnStr)

  // Call the function to generate the freqTable
  htmlTable = generateTable(freqTable, 'upCounts');
  // Display the HTML table on the page
  $('#FreqTable').html(htmlTable);
  upDnDiffArr.push(upcount-dncount);
  updateChart();
}

  // Function to update chart
  function updateChart() {
   // Update the chart data
   timemark = showTime().split(':')
   timemark = timemark[0]+timemark[1]

   ChartRecord.data.labels.push(timemark);
   ChartRecord.update();
  }

// Start the main process
main();
setInterval(updateChanges, 60000);



// Function to collect data for a single stock code
async function collectdata(stkcode) {
 // 10 days kline A 股
 const url = "https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=" + stkcode + ",day,,,10,qfq";

 try {
  const responseText = await $.get(url);
  const jsonString = responseText.split("=")[1];
  const jsonData = JSON.parse(jsonString);
  const stockName = jsonData.data[stkcode].qt[stkcode][1];
  $('h1').text(codeNum + " "+ stockName);

  // Check if qfqday or day exists
  const stockData = jsonData.data[stkcode].qfqday || jsonData.data[stkcode].day;

  if (!stockData || !Array.isArray(stockData)) {
   throw new Error(`Invalid/missing stock data for ${stkcode} ${url}`);
  }

  // Get the array
  const dateArray = stockData.map(row => row[0].replace(/-/g, ''));
  const closeArray = stockData.map(row => Number(row[2])); // [1] is open
  const highArray = stockData.map(row => Number(row[3]));
  const lowArray = stockData.map(row => Number(row[4]));
  volArray = stockData.map(row => Number(row[5])); // volumn

  volMA5 = calculateMA(volArray, 5) // days
  volMA2 = calculateMA(volArray, 2) // days
  volArray = calculateMA(volArray, 3) // days

  // Calculate volIdx for each corresponding pair of elements in volMA5 and volMA2
  let volIdxArray = [];
  for (let i = 0; i < volMA5.length; i++) {
    if (volMA2[i] !== null && volMA5[i] !== null && volMA5[i] !== 0) {
        let volIdx = Math.round(volMA2[i] / volMA5[i] * 100);
        volIdxArray.push(volIdx);
    } else {
        volIdxArray.push(null);
    }
  }

  const maxH = Math.max(...highArray);
  const minL = Math.min(...lowArray);

  // Store the result in BaseRef
  BaseRef = {
    dateArray: dateArray,
    closeArray: closeArray,
    volArray: volArray,
    highArray: highArray,
    lowArray: lowArray,
    volIdx: volIdxArray,
  };
  console.log("dateArray",dateArray, "closeArray",closeArray, "volArray",volArray)
 } catch (error) {
  console.error(`Error ${stknum}:`, error);
 }
}

async function executeAsyncFunction() {
    await collectdata(codeNum)
        const objectName = "fdays_data_" + codeNum; // Construct the object name
        // Access the object dynamically using bracket notation
        const resultantObject = window[objectName]; // Use `window` if it's in the global scope
        const code = Object.keys(resultantObject.data);

            resultantObject.data[code].data.forEach((dateObj) => {
                const date = dateObj.date;
                BaseRefdateIndex = BaseRef.dateArray.indexOf(date)-1 // previous day
                basePrice = BaseRef.closeArray[BaseRefdateIndex]
                baseVol = BaseRef.volArray[BaseRefdateIndex]

                const tableData = [];

                dateObj.data.forEach((row, index) => {
                    const parts = row.split(' ');
                    const time = parts[0];
                    const price = parseFloat(parts[1]);
                    const vol = parseInt(parts[2]);
                    const amt = parseFloat(parts[3]/100); // make in wan

                    let pricedifference = 0;
                    let voldifference=0;

                    if (index > 0) {
                        const prevRow = tableData[index - 1];
                        const prevPrice = prevRow.price;
                        const prevVol = prevRow.vol;
                        pricedifference = 100*(price - prevPrice) / basePrice;
                        voldifference = 100*(vol - prevVol) / baseVol;
                    }

                    tableData.push({
                        time,
                        price,
                        pricedifference,
                        vol,
                        voldifference,
                        amt
                    });
                });


                // createble of bigamt
                // Create an h2 element with the date
                const bigh2 = document.createElement('h2');
                bigh2.textContent = `${date} BigAmt`;
                document.body.appendChild(bigh2);

                const bigtable = document.createElement('table');
                const caption = document.createElement('caption');
                caption.textContent = `Big Amt ${date}`;
                bigtable.appendChild(caption);

                const bigthead = document.createElement('thead');
                const bigheaderRow = document.createElement('tr');
                const bigheaders = ['Time', 'Price', 'Price Difference (%)', 'Volume', 'Volume Difference (%)', 'Amount(w)'];
                bigheaders.forEach((headerText) => {
                    const bigth = document.createElement('th');
                    bigth.textContent = headerText;
                    bigheaderRow.appendChild(bigth);
                });
                bigthead.appendChild(bigheaderRow);
                bigtable.appendChild(bigthead);

                const bigtbody = document.createElement('tbody');
                tableData.forEach((rowData) => {
                  voldiffval = rowData.voldifference.toFixed(1)
                  if(voldiffval>=1){
                    const row = document.createElement('tr');

                    pricediffval = rowData.pricedifference.toFixed(1)
                    voldiffval = rowData.voldifference.toFixed(1)
                    if(pricediffval <0){
                       pricediffval = "<r>"+pricediffval+"</r>"
                       voldiffval = "<r>"+voldiffval+"</r>"
                    }else if(pricediffval >=0){
                       voldiffval = "<lg>"+voldiffval+"</lg>"
                    }
                    //amt = parseInt(rowData.amt/10)
                    amt = parseInt(rowData.amt/100).toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");
                    vol = parseInt(rowData.vol).toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");

                    const cells = [
                        rowData.time,
                        rowData.price,
                        pricediffval,
                        vol,
                        voldiffval,
                        amt
                    ];
                    cells.forEach((cellData) => {
                        const bigtd = document.createElement('td');
                        bigtd.innerHTML = cellData;
                        row.appendChild(bigtd);
                    });
                    bigtbody.appendChild(row);
                  }
                });
                bigtable.appendChild(bigtbody);
                document.body.appendChild(bigtable);

                // Create an h2 element with the date
                const h2 = document.createElement('h2');
                h2.textContent = `${date}`;
                document.body.appendChild(h2);

                const table = document.createElement('table');
                //const caption = document.createElement('caption');
                //caption.textContent = `Data for ${date}`;
                //table.appendChild(caption);

                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headers = ['Time', 'Price', 'Price Difference (%)', 'Volume', 'Volume Difference (%)', 'Amount(w)'];
                headers.forEach((headerText) => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                const tbody = document.createElement('tbody');
                tableData.forEach((rowData) => {
                    const row = document.createElement('tr');

                    pricediffval = rowData.pricedifference.toFixed(1)
                    if(pricediffval <0){
                       pricediffval = "<r>"+pricediffval+"</r>"
                    }

                    voldiffval = rowData.voldifference.toFixed(1)
                    if(voldiffval >=5){
                       voldiffval = "<o>"+voldiffval+"</o>"
                    }else if(voldiffval >=3){
                       voldiffval = "<y>"+voldiffval+"</y>"
                    }else if(voldiffval >=1){
                       voldiffval = "<dr>"+voldiffval+"</dr>"
                    }

                    amt = parseInt(rowData.amt/100).toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");
                    vol = parseInt(rowData.vol).toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");

                    const cells = [
                        rowData.time,
                        rowData.price,
                        pricediffval,
                        vol,
                        voldiffval,
                        amt
                    ];
                    cells.forEach((cellData) => {
                        const td = document.createElement('td');
                        td.innerHTML = cellData;
                        row.appendChild(td);
                    });
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);
                document.body.appendChild(table);

            });
  // add toc
  $(markerName).each(function(i) {
      // prepare for the toc
      var topic = $(this), topicNumber = i; topicLength = topicNumber +1;

      // make a content list
      var markerContent = $(this).text();
      markerList.push(markerContent);
  
      // toc coding here
      if (typeof(showTopicNumber) !== 'undefined'){
        if (showTopicNumber == true){
          toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a>'+topicEnd);
        }else{
          toc.append('<a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a>'+topicEnd);
        }
      }else{
        toc.append('<a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a><br>');
      }
      // toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');

      // modify the target id
      topic.attr('id', 'topic-' + topicNumber);
      topic.after('&emsp;<a href=#top target="_self"><b>&#8679;</b></a><br>')
  });


}
executeAsyncFunction();
