// collect all the data and put it in an object with `code`, `stkname`, and `data` values

// const codeTable = ['00388','02208','01951','01448','01171','02800','00700','09988','00005','00883','02828','00857','00939','02318','01299','03968','00941','01398','00522','09618','00386','01211','02899','03988','09999','01088','00016','01288','02269','09961','01816','02382','00992','01919','01109','00981','00836','00001','09633','01093','02601','01910','00027','00669','06690','02020','00011','02388','00916','01928','00020','00175','02628','00291','01833','01378','00728','02359','09626','00002','02331','06862','01113','00780','00006','01801','00762','09901','02688','03993','01548','02618','09992','00288','06160','02319','01766','00285','01972','01800','00003','00960','06030','01658','00966','01138','02057','00688','06881','01336','03908','02313','01898','00968','02333','03692','03328','01347','01038','03888','09987','01339','01177','02018','02328','01099','02883','00135','01193','01876','06865','02338','01209','03800','00316','01818','00358','02600','01071','01913','00241','00019','01997','03067','02380','00868','03998','02202','00322','02588','00819','00998','00384','00763','01787','02099','00101','00425','00914','03898','00570','01797','00390','00257','00267','00012','00066','06186','00270','00881','03320','02400','00136','02013','03618','01066','01908','01030','00683','06823','01798','03323','01208','03759','01952','06088','01918','01772','00467','01186','03969','01302','00921','01357','06110','09969','01929','02666','00772','06078','00696','03311','00293','00371','03900','00956','02162','02607','00991','06855','02238','00083','01776','02386','06818','00220','00576','06060','01157','00017','03808','01044','02357','00142','03347','01359','06098','01415','00354','01179','00014','03110','02196','01128','00189','03032','00123','01896','02343','00934','00867','01368','00995','00177','00552','01883','00639','00151','09922','00489','00152','00148','00586','01381','01530','00853','01882','00813','03360','00799','00598','02096','00667','09698','01610','01618','02888','01821','03738','06066','02186','06699','00880','02128','00884','01072','06886','00874','01070','01516','00551','06049','02669','02257','01513','09995','02255','00694','01681','01999','01508','00631','01478','01385','00777','01055','00525','01199','02039','01060','03613','00004','00579','00338','00817','02869','02638','00856','00548','01963','06869','00081','00363','00590','00303','01958','00200','03377','00317','03709','01579','01316','00656','01119','01811','00341','06099','00909','02689','03319','00087','03958','00297','01907','02145','02276','01888','01313','00861','01310','00038','06185','09959','02777','00345','00010','03899','01666','02005','09966','00460','02877','00023','00440','06808','00179','00855','00596','02866','02285','00347','06666','01995','01877','02362','06127','01428','01691','02158','01515','02155','03983','01600','00165','02801','00710','09911','00708','00670','02611','02252','00308','00823','01613','02009','02823','02822','07226','07299','02840','01858','01860','07200','07288','03037','00412','00751','02727','02356','02342','06178','03188','00778','00636','07568','07522','07552','00182','07500','03606','06969','00268','00144','00564','03668','00300','06181','01698','02556','01164','00788','02577','09896','01810', '02015', '03690', '06618', '09888', '01024','09926','03033','09868',];
const codeTable = ['00388', '02208', '01951', '01448', '01171', '02800', '00700', '09988', '00005', '00883', '02828', '00857', '00939', '02318', '01299', '03968', '00941', '01398', '00522', '09618', '00386', '01211', '02899', '03988', '09999', '01088'];

//const codeTable = ['300098','300346','000099','002373','300107','300284','300177','002902','601669','301091','600487','600489','001309','300398','301308'];
const hsReservedCode = ["110000", "110001", "110002", "110003", "110004", "110010", "110030", "110041", "110050", "110078", "111000", "111100", "221000",]

const curr_date = new Date();
// Format as YYYY-MM-DD 2025-04-17"
const currentDate = curr_date.toISOString().split('T')[0];

const BaseObj = {}; // This will store all the collected data
const allResults = {};
prevallResults = {};
firstTime = false


status3UpCnt = 0
status3DnCnt = 0
status4UpCnt = 0
status4DnCnt = 0
status5UpCnt = 0
status5DnCnt = 0
status10UpCnt = 0
status10DnCnt = 0

statusUpXCnt3 = 0
statusUpXCnt4 = 0
statusUpXCnt5 = 0
statusUpXCnt10 = 0
statusDnXCnt3 = 0
statusDnXCnt4 = 0
statusDnXCnt5 = 0
statusDnXCnt10 = 0

highpassCnt = 0
highFailCnt = 0
lowpassCnt = 0
lowFailCnt = 0
closepassCnt = 0
closeFailCnt = 0

// prepare basic materials
const baseurl = "https://sqt.gtimg.cn/?q=";
//   A stk       https://qt.gtimg.cn/?q=sh000001,sz000002 seems the same

const chunkSize = 60;
const chunks = [];
const urlReqStr = [];

for (let i = 0; i < codeTable.length; i += chunkSize) {
	chunks.push(codeTable.slice(i, i + chunkSize));
}

for (let i = 0; i < chunks.length; i++) {
	urlReqStr.push(baseurl + chunks[i].map(element => "r_hk" + element).join(","));
}


function checkCodeLen(theCode) {
	let codewidth = theCode.length;
	let modifiedCode = "";
	let url = "";

	if (codewidth <= 5) {
		theCode = "00000" + theCode;
		codewidth = theCode.length;
		theCode = theCode.slice(codewidth - 5, codewidth);
		codewidth = theCode.length;
		url = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,60,qfq';
		modifiedCode = "hk" + theCode;
	} else {
		if ((codewidth == 6) && !hsReservedCode.includes(theCode)) {
			if (theCode.charAt(0) == "6") {
				modifiedCode = "sh" + theCode;
			} else {
				modifiedCode = "sz" + theCode;
			}
		} else if (codewidth == 9) {
			modifiedCode = theCode.substring(7, 9) + theCode.substring(0, 7);
		}
		codewidth = modifiedCode.length;
		url = 'https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=' + modifiedCode + ',day,,,60,qfq';
	}

	return { modifiedCode, url };
}

async function fetchKline(theCode, theurl) {
	try {
		const response = await fetch(theurl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();
		const jsonStr = text.replace('kline_dayqfq=', '');
		const stkdata = JSON.parse(jsonStr);

		if (stkdata.data && stkdata.data[theCode]) {
			const stkName = stkdata.data[theCode].qt[theCode][1];
			const dataObj = stkdata.data[theCode].qfqday || stkdata.data[theCode].day;

			const closeArr = [];
			const lastPointer = dataObj.length - 1;
			const highValue = dataObj[lastPointer][3];
			const lowValue = dataObj[lastPointer][4];
			const lastDate = dataObj[lastPointer][0];

			// test mode here
			//   if (currentDate != lastDate) {
			//    alert("Data not up to date: " + lastDate);
			//    return null;
			//   }

			for (let i = 0; i < dataObj.length; i++) {
				closeArr.push(Number(dataObj[i][2]));
			}

			return {
				theCode: theCode.replace('hk', ''),
				stkname: stkName,
				lastDateValue: lastDate,
				closes: closeArr,
				high: highValue,
				low: lowValue,
			};
		}
		throw new Error(`No data found for ${theCode}`);
	} catch (error) {
		console.error(`Error fetching data for ${theCode}:`, error);
		return null;
	}
}

async function fetchAllData() {
	let hasError = false;  // Add flag to track errors
	console.log("fetchAllData...")
	timearr = showTime().split(':')
	timestr = timearr[0] + timearr[1]

	//test mode here
	     if(!(Number(timestr)>925 && Number(timestr)<1201 || 
	       Number(timestr)>1259 && Number(timestr)<1601)){
	       console.log("Market Closed");
	       hasError = true
	     }

	for (let i = 0; i < codeTable.length; i++) {
		if (hasError) break;  // Stop if error occurred
		const { modifiedCode, url } = checkCodeLen(codeTable[i]);

		try {
			const stockData = await fetchKline(modifiedCode, url);
			if (!stockData) {
				hasError = true;
				break;
			}
			BaseObj[codeTable[i]] = stockData;
			//console.log("fetching ", `${modifiedCode}`);
		} catch (error) {
			console.error(`Error fetching data for ${modifiedCode}:`, error);
			hasError = true;
			break;
		}

		await new Promise(resolve => setTimeout(resolve, 100));
	}

	return hasError ? null : BaseObj;
}






async function updateChanges() {
	console.log("updateChanges...")

	const timearr = showTime().split(':')
	const timestr = timearr[0] + timearr[1]
	if (!(Number(timestr) > 925 && Number(timestr) < 1201 ||
		Number(timestr) > 1259 && Number(timestr) < 1601)) {
		// document.getElementById("dateAndTime").innerHTML = "<lg>" + showDate() + "</lg> " + showTime() + "<o> Market Closed</o>";
		//return
	}
	await updateInfo()
	compareAll()
     console.log("compareAll loop")
}


// Function to update chart
function updateChart() {
	// Update the chart data
	timemark = showTime().split(':')
	timemark = timemark[0] + timemark[1]

	ChartRecord.data.labels.push(timemark);
	ChartRecord.update();
}

async function updateInfo() {
	console.log("updateInfo...")
	firstTime = false
	if (Object.keys(prevallResults).length === 0 && Object.keys(allResults).length == 0) {
		firstTime = true
	} else if (Object.keys(allResults).length != 0) {
		prevallResults = { ...allResults };
		firstTime = false
	}
	for (let i = 0; i < urlReqStr.length; i++) {
		await fetchSegments(urlReqStr[i]);
	}
	// process data
}


// Function to fetch data chunks
async function fetchSegments(url) {
	// backup allResults
	try {
		const response = await fetch(url);
		const data = await response.text();
		const rows = data.split(";");

		rows.forEach(row => {
			const columns = row.split("~");
			if (columns.length > 1) {
				const stockCode = columns[2]; // e.g., "s_hk00700"
				const stknum = stockCode.replace("s_hk", ""); // Extract stock code (e.g., "00700")

				// Check if BaseObj has data for this stock code
				if (BaseObj[stknum]) {
					// high columns[33] low columns[34] close columns[35]  amt columns[38] columns[30] is date n time 

					const currentPrice = parseFloat(columns[35]);
					BaseObj[stknum].high = parseFloat(columns[33])
					BaseObj[stknum].low = parseFloat(columns[34])

					const closesArray = BaseObj[stknum].closes;
					closesArray[closesArray.length - 1] = currentPrice;

					//console.log(stockCode, BaseObj[stknum].stkname, " high: ", BaseObj[stknum].high, " low: ", BaseObj[stknum].low, " close: ", closesArray[closesArray.length - 1]);

					timestamp = showTime().split(':')
					timestamp = timestamp[0] + timestamp[1]

					// Store the result in allResults

				} else {
					console.warn(`No BaseObj data found for stock code: ${stknum}`);
				}
			}
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

function compareAll() {
  status3UpCnt = 0
  status3DnCnt = 0
  status4UpCnt = 0
  status4DnCnt = 0
  status5UpCnt = 0
  status5DnCnt = 0
  status10UpCnt = 0
  status10DnCnt = 0

  statusUpXCnt3 = 0
  statusUpXCnt4 = 0
  statusUpXCnt5 = 0
  statusUpXCnt10 = 0
  statusDnXCnt3 = 0
  statusDnXCnt4 = 0
  statusDnXCnt5 = 0
  statusDnXCnt10 = 0

  highpassCnt = 0
  highFailCnt = 0
  lowpassCnt = 0
  lowFailCnt = 0
  closepassCnt = 0
  closeFailCnt = 0

	for (let i = 0; i < codeTable.length; i++) {
		const statusMsgHLC = checkHLC(codeTable[i]); // checkHLC status and then checkX

		const statusMsg3 = checkXStat(3, 6);
		const statusMsg4 = checkXStat(4, 10);
		const statusMsg5 = checkXStat(5, 10);
		const statusMsg10 = checkXStat(10, 20);

		if (statusMsg3.includes('升穿')) { statusUpXCnt3 = statusUpXCnt3 + 1 }
		if (statusMsg4.includes('升穿')) { statusUpXCnt4 = statusUpXCnt4 + 1 }
		if (statusMsg5.includes('升穿')) { statusUpXCnt5 = statusUpXCnt5 + 1 }
		if (statusMsg10.includes('升穿')) { statusUpXCnt10 = statusUpXCnt10 + 1 }

		if (statusMsg3.includes('跌穿')) { statusDnXCnt3 = statusDnXCnt3 + 1 }
		if (statusMsg4.includes('跌穿')) { statusDnXCnt4 = statusDnXCnt4 + 1 }
		if (statusMsg5.includes('跌穿')) { statusDnXCnt5 = statusDnXCnt5 + 1 }
		if (statusMsg10.includes('跌穿')) { statusDnXCnt10 = statusDnXCnt10 + 1 }
	}

	allResults = {
	  status3UpCnt: status3UpCnt,
	  status3DnCnt: status3DnCnt,
	  status4UpCnt: status4UpCnt,
	  status4DnCnt: status4DnCnt,
	  status5UpCnt: status5UpCnt,
	  status5DnCnt: status5DnCnt,
	  status10UpCnt: status10UpCnt,
	  status10DnCnt: status10DnCnt,

	  statusUpXCnt3: statusUpXCnt3,
	  statusUpXCnt4: statusUpXCnt4,
	  statusUpXCnt5: statusUpXCnt5,
	  statusUpXCnt10: statusUpXCnt10,
	  statusDnXCnt3: statusDnXCnt3,
	  statusDnXCnt4: statusDnXCnt4,
	  statusDnXCnt5: statusDnXCnt5,
	  statusDnXCnt10: statusDnXCnt10,

	  highpassCnt: highpassCnt,
	  highFailCnt: highFailCnt,
	  lowpassCnt: lowpassCnt,
	  lowFailCnt: lowFailCnt,
	  closepassCnt: closepassCnt,
	  closeFailCnt: closeFailCnt,
	}

	showStat()
}


function checkHLC(stkNum) {
	curHigh = BaseObj[stkNum].high;
	curLow = BaseObj[stkNum].low;
	closeArr = BaseObj[stkNum].closes
	curClose = closeArr[closeArr.length - 1];

	curWma3 = calculateWeightedMovingAverage(closeArr, 3); // calc 3 days
	if (curHigh > curWma3) {
		highpassCnt = highpassCnt + 1
	} else if (curHigh < curWma3) {
		highFailCnt = highFailCnt + 1
	}

	if (curLow > curWma3) {
		lowpassCnt = lowpassCnt + 1
	} else if (curLow < curWma3) {
		lowFailCnt = lowFailCnt + 1
	}

	if (curClose > curWma3) {
		closepassCnt = closepassCnt + 1
	} else if (curClose < curWma3) {
		closeFailCnt = closeFailCnt + 1
	}
}

function checkXStat(shortperiod, longperiod) {
	closeArr = BaseObj["00388"].closes
	curPointer = closeArr.length - 1

	const prevArray = closeArr.slice(0, curPointer - 1);

	const prevLWma = calculateWeightedMovingAverage(prevArray, longperiod);
	const prevSWma = calculateWeightedMovingAverage(prevArray, shortperiod);
	const curLWma = calculateWeightedMovingAverage(closeArr, longperiod);
	const curSWma = calculateWeightedMovingAverage(closeArr, shortperiod);

	// 添加返回值
	if (curSWma > prevSWma) {
		if (shortperiod == 3) { status3UpCnt = status3UpCnt + 1 }
		if (shortperiod == 4) { status4UpCnt = status4UpCnt + 1 }
		if (shortperiod == 5) { status5UpCnt = status5UpCnt + 1 }
		if (shortperiod == 10) { status10UpCnt = status10UpCnt + 1 }
		return '升穿';
	} else {
		if (shortperiod == 3) { status3DnCnt = status3DnCnt + 1 }
		if (shortperiod == 4) { status4DnCnt = status4DnCnt + 1 }
		if (shortperiod == 5) { status5DnCnt = status5DnCnt + 1 }
		if (shortperiod == 10) { status10DnCnt = status10DnCnt + 1 }
		return '跌穿';
	}
}

function showStat() {
	statElement = document.createElement("div");
	statMsg = showDate() + " " + showTime() + "<br>" + "趋势统计表 总数：" + codeTable.length + "<br><br>"

	statMsg = statMsg + " <bpk>收</bpk>: 比3日趋势高：<r>" + closepassCnt + "</r>&emsp;"
	statMsg = statMsg + " <bpk>收</bpk>: 比3日趋势低：<gr>" + closeFailCnt + "</gr>&emsp;"
	statMsg = statMsg + " 高: 比3日趋势高：<r>" + highpassCnt + "</r>&emsp; "
	statMsg = statMsg + " 高: 比3日趋势低：<gr>" + highFailCnt + "</gr>&emsp;"
	statMsg = statMsg + " 低: 比3日趋势高：<r>" + lowpassCnt + "</r>&emsp;"
	statMsg = statMsg + " 低: 比3日趋势低：<gr>" + lowFailCnt + "</gr>&emsp;<br>"

	statMsg = statMsg + " 3日趋势升：<r>" + status3UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 3日趋势跌：<gr>" + status3DnCnt + "</gr>" + "&emsp;"

	statMsg = statMsg + " 4日趋势升：<r>" + status4UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 4日趋势跌：<gr>" + status4DnCnt + "</gr>" + "&emsp;"

	statMsg = statMsg + " 5日趋势升：<r>" + status5UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 5日趋势跌：<gr>" + status5DnCnt + "</gr>" + "&emsp;"

	statMsg = statMsg + " 10日趋势升：<r>" + status10UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 10日趋势跌：<gr>" + status10DnCnt + "</gr>" + "&emsp;<br>"

	statMsg = statMsg + " 3日升穿6日：<r>" + statusUpXCnt3 + "</r>&emsp; "
	statMsg = statMsg + " 3日跌穿6日：<gr>" + statusDnXCnt3 + "</gr>" + "&emsp;"

	statMsg = statMsg + " 4日升穿10日：<r>" + statusUpXCnt4 + "</r>&emsp; "
	statMsg = statMsg + " 4日跌穿10日：<gr>" + statusDnXCnt4 + "</gr>" + "&emsp;"

	statMsg = statMsg + " 5日升穿10日：<r>" + statusUpXCnt5 + "</r>&emsp; "
	statMsg = statMsg + " 5日跌穿10日：<gr>" + statusDnXCnt5 + "</gr>" + "&emsp;"

	statMsg = statMsg + " 10日升穿20日：<r>" + statusUpXCnt10 + "</r>&emsp; "
	statMsg = statMsg + " 10日跌穿20日：<gr>" + statusDnXCnt10 + "</gr>" + "&emsp;<br>"

	statElement.innerHTML = statMsg

	const outputDiv = document.getElementById('output');
	outputDiv.parentNode.insertBefore(statElement, outputDiv);

	//document.body.appendChild(statElement);
	//document.body.insertBefore(newDiv, document.body.firstChild);
}

function calculateWeightedMovingAverage(data, period) {
	if (data.length < period) {
		throw new Error("Data array is shorter than the period.");
	}

	const weights = Array.from({ length: period }, (_, i) => i + 1);
	const weightSum = weights.reduce((a, b) => a + b, 0);

	const recentData = data.slice(data.length - period);

	const weightedSum = recentData.reduce((sum, value, index) => {
		return sum + value * weights[index];
	}, 0);

	return weightedSum / weightSum;
}


// Function to process the next request in the queue
async function processQueue() {
 // return after loop completed
 while (requestQueue.length > 0 || activeRequests > 0) {
  console.log("requestQueue.length ", requestQueue.length)
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

// Main function to collect basic data
async function main() {
	// fetchAllData --> processQueue -->
	await fetchAllData()
	compareAll()
     //console.log("fetchAllData loop")

}


// Start the main process
main();

setInterval(updateChanges, 60000);
