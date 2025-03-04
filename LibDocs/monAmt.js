const BaseObj = {};
const allResults = {};
prevallResults = {};
firstTime = false
sortmode = false
upcount = 0
dncount = 0

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
          }else{
            amtdiff = 0
            pricediff = 0
          }


          // check grades
          if(amtdiff>28 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade30").append( warnMsg);
            $("#grade30Hist").append( warnMsg);
            grade30Count=grade30Count+1
          }else if(amtdiff>21 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade25").append( warnMsg);
            $("#grade25Hist").append( warnMsg);
            grade25Count=grade25Count+1
          }else if(amtdiff>15 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade20").append( warnMsg);
            $("#grade20Hist").append( warnMsg);
            grade20Count=grade20Count+1
          }else if(amtdiff>10 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade15").append( warnMsg);
            $("#grade15Hist").append( warnMsg);
            grade15Count=grade15Count+1
          }else if(amtdiff>6 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade10").append( warnMsg);
            $("#grade10Hist").append( warnMsg);
            grade10Count=grade10Count+1
          }else if(amtdiff>3 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade05").append( warnMsg);
            $("#grade05Hist").append( warnMsg);
            grade05Count=grade05Count+1
          }else if(amtdiff>=1 && pricediff>0){
            warnMsg = codeStr + stkname+", "
            $("#grade01").append( warnMsg);
            $("#grade01Hist").append( warnMsg);
            grade01Count=grade01Count+1
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
    }else{
      cell4.textContent = allResults[stockCode].pct;
    }

    if(allResults[stockCode].pctdiff<0){
      cell5.innerHTML = "<r>"+allResults[stockCode].pctdiff+"</r>";
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
}

// Start the main process
main();
setInterval(updateChanges, 60000);
