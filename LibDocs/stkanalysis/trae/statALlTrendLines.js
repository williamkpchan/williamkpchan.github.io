// collect all the data and put it in an object with `code`, `stkname`, and `data` values

const codeTable = ['00388','02208','01951','01448','01171','02800','00700','09988','00005','00883','02828','00857','00939','02318','01299','03968','00941','01398','00522','09618','00386','01211','02899','03988','09999','01088','00016','01288','02269','09961','01816','02382','00992','01919','01109','00981','00836','00001','09633','01093','02601','01910','00027','00669','06690','02020','00011','02388','00916','01928','00020','00175','02628','00291','01833','01378','00728','02359','09626','00002','02331','06862','01113','00780','00006','01801','00762','09901','02688','03993','01548','02618','09992','00288','06160','02319','01766','00285','01972','01800','00003','00960','06030','01658','00966','01138','02057','00688','06881','01336','03908','02313','01898','00968','02333','03692','03328','01347','01038','03888','09987','01339','01177','02018','02328','01099','02883','00135','01193','01876','06865','02338','01209','03800','00316','01818','00358','02600','01071','01913','00241','00019','01997','03067','02380','00868','03998','02202','00322','02588','00819','00998','00384','00763','01787','02099','00101','00425','00914','03898','00570','01797','00390','00257','00267','00012','00066','06186','00270','00881','03320','02400','00136','02013','03618','01066','01908','01030','00683','06823','01798','03323','01208','03759','01952','06088','01918','01772','00467','01186','03969','01302','00921','01357','06110','09969','01929','02666','00772','06078','00696','03311','00293','00371','03900','00956','02162','02607','00991','06855','02238','00083','01776','02386','06818','00220','00576','06060','01157','00017','03808','01044','02357','00142','03347','01359','06098','01415','00354','01179','00014','03110','02196','01128','00189','03032','00123','01896','02343','00934','00867','01368','00995','00177','00552','01883','00639','00151','09922','00489','00152','00148','00586','01381','01530','00853','01882','00813','03360','00799','00598','02096','00667','09698','01610','01618','02888','01821','03738','06066','02186','06699','00880','02128','00884','01072','06886','00874','01070','01516','00551','06049','02669','02257','01513','09995','02255','00694','01681','01999','01508','00631','01478','01385','00777','01055','00525','01199','02039','01060','03613','00004','00579','00338','00817','02869','02638','00856','00548','01963','06869','00081','00363','00590','00303','01958','00200','03377','00317','03709','01579','01316','00656','01119','01811','00341','06099','00909','02689','03319','00087','03958','00297','01907','02145','02276','01888','01313','00861','01310','00038','06185','09959','02777','00345','00010','03899','01666','02005','09966','00460','02877','00023','00440','06808','00179','00855','00596','02866','02285','00347','06666','01995','01877','02362','06127','01428','01691','02158','01515','02155','03983','01600','00165','02801','00710','09911','00708','00670','02611','02252','00308','00823','01613','02009','02823','02822','07226','07299','02840','01858','01860','07200','07288','03037','00412','00751','02727','02356','02342','06178','03188','00778','00636','07568','07522','07552','00182','07500','03606','06969','00268','00144','00564','03668','00300','06181','01698','02556','01164','00788','02577','09896','01810', '02015', '03690', '06618', '09888', '01024','09926','03033','09868',];
//const codeTable = ['00388', '02208', '02800', '00700'];
//const codeTable = ['300098','300346','000099','002373','300107','300284','300177','002902','601669','301091','600487','600489','001309','300398','301308'];
const hsReservedCode = ["110000", "110001", "110002", "110003", "110004", "110010", "110030", "110041", "110050", "110078", "111000", "111100", "221000",]

const curr_date = new Date();
// Format as YYYY-MM-DD 2025-04-17"
const currentDate = curr_date.toISOString().split('T')[0];


const BaseObjD = {}; // This will store all the collected data

  // Initialize arrays (with proper declarations)
  const closeUpArr = new Array(1).fill(null);
  const closeDnArr = new Array(1).fill(null);
  const wma3UpArr = new Array(2).fill(null);
  const wma3DnArr = new Array(2).fill(null);
  const gtPrevWma3Arr = new Array(2).fill(null);
  const ltPrevWma3Arr = new Array(2).fill(null);
  const u3X6Arr = new Array(5).fill(null);
  const d3X6Arr = new Array(5).fill(null);
  const u4X10Arr = new Array(9).fill(null);
  const d4X10Arr = new Array(9).fill(null);
  const u5X10Arr = new Array(9).fill(null);
  const d5X10Arr = new Array(9).fill(null);
  const u10X20Arr = new Array(19).fill(null);
  const d10X20Arr = new Array(19).fill(null);

stdDArr = []
trendline3 = []
trendline4 = []
trendline5 = []
trendline6 = []
trendline10 = []
trendline20 = []

updcnt = 0
trend3UpCnt = 0
trend3DnCnt = 0
trend4UpCnt = 0
trend4DnCnt = 0
trend5UpCnt = 0
trend5DnCnt = 0
trend10UpCnt = 0
trend10DnCnt = 0

trendUpXCnt3 = 0
trendUpXCnt4 = 0
trendUpXCnt5 = 0
trendUpXCnt10 = 0
trendDnXCnt3 = 0
trendDnXCnt4 = 0
trendDnXCnt5 = 0
trendDnXCnt10 = 0

highpassCnt = 0
highFailCnt = 0
lowpassCnt = 0
lowFailCnt = 0
closepassCnt = 0
closeFailCnt = 0

cUpPrevCloseCnt = 0
cDnPrevCloseCnt = 0

function checkCodeLen(theCode) {
	let codewidth = theCode.length;
	let modifiedCode = "";
	let url = "";

	if (codewidth <= 5) {
		theCode = "00000" + theCode;
		codewidth = theCode.length;
		theCode = theCode.slice(codewidth - 5, codewidth);
		codewidth = theCode.length;
		url = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,63,qfq';
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
			const dateArr = [];
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
				dateArr.push(dataObj[i][0]);
			}

			return {
				theCode: theCode.replace('hk', ''),
				stkname: stkName,
				lastDateValue: lastDate,
				closes: closeArr,
				date: dateArr,
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
	let hasError = false;
	console.log("fetchAllData...\nmay take long time!\nStart: ", showTime())
	document.getElementById("dateAndTime").append("趋势统计表 总数：" + codeTable.length)

	timearr = showTime().split(':')
	timestr = timearr[0] + timearr[1]

	for (let i = 0; i < codeTable.length; i++) {
		const { modifiedCode, url } = checkCodeLen(codeTable[i]);

		try {
			const stockData = await fetchKline(modifiedCode, url);
			if (!stockData) {
				console.warn(`Failed to fetch data for ${codeTable[i]}, skipping...`);
				continue; // Skip this stock instead of breaking
			}
			BaseObjD[codeTable[i]] = stockData;
		} catch (error) {
			console.error(`Error fetching data for ${modifiedCode}:`, error);
			continue; // Skip this stock instead of breaking
		}

		await new Promise(resolve => setTimeout(resolve, 50));
	}
	console.log("fetchAllData...\nFinished!\n", showTime())
	console.log("BaseObjD length:", Object.keys(BaseObjD).length)

	return Object.keys(BaseObjD).length > 0 ? BaseObjD : null; // Return BaseObjD if any data was fetched
}

function compareAll() {
	trend3UpCnt = 0
	trend3DnCnt = 0
	trend4UpCnt = 0
	trend4DnCnt = 0
	trend5UpCnt = 0
	trend5DnCnt = 0
	trend10UpCnt = 0
	trend10DnCnt = 0

	trendUpXCnt3 = 0
	trendUpXCnt4 = 0
	trendUpXCnt5 = 0
	trendUpXCnt10 = 0
	trendDnXCnt3 = 0
	trendDnXCnt4 = 0
	trendDnXCnt5 = 0
	trendDnXCnt10 = 0

	highpassCnt = 0
	highFailCnt = 0
	lowpassCnt = 0
	lowFailCnt = 0
	closepassCnt = 0
	closeFailCnt = 0

	cUpPrevCloseCnt = 0
	cDnPrevCloseCnt = 0

	for (let i = 0; i < codeTable.length; i++) {
		//console.log("compareAll ", codeTable[i])
		const statusMsgHLC = checkHLC(codeTable[i]); // checkHLC status and then checkX

		const statusMsg3 = checkXStat(3, 6, codeTable[i]);
		const statusMsg4 = checkXStat(4, 10, codeTable[i]);
		const statusMsg5 = checkXStat(5, 10, codeTable[i]);
		const statusMsg10 = checkXStat(10, 20, codeTable[i]);

		if (statusMsg3.includes('升穿')) { trendUpXCnt3 = trendUpXCnt3 + 1 }
		if (statusMsg4.includes('升穿')) { trendUpXCnt4 = trendUpXCnt4 + 1 }
		if (statusMsg5.includes('升穿')) { trendUpXCnt5 = trendUpXCnt5 + 1 }
		if (statusMsg10.includes('升穿')) { trendUpXCnt10 = trendUpXCnt10 + 1 }

		if (statusMsg3.includes('跌穿')) { trendDnXCnt3 = trendDnXCnt3 + 1 }
		if (statusMsg4.includes('跌穿')) { trendDnXCnt4 = trendDnXCnt4 + 1 }
		if (statusMsg5.includes('跌穿')) { trendDnXCnt5 = trendDnXCnt5 + 1 }
		if (statusMsg10.includes('跌穿')) { trendDnXCnt10 = trendDnXCnt10 + 1 }
	}

	allResults = {
		closepassCnt: closepassCnt,
		closeFailCnt: closeFailCnt,
		highpassCnt: highpassCnt,
		highFailCnt: highFailCnt,
		lowpassCnt: lowpassCnt,
		lowFailCnt: lowFailCnt,

		trend3UpCnt: trend3UpCnt,
		trend3DnCnt: trend3DnCnt,
		trend4UpCnt: trend4UpCnt,
		trend4DnCnt: trend4DnCnt,
		trend5UpCnt: trend5UpCnt,
		trend5DnCnt: trend5DnCnt,
		trend10UpCnt: trend10UpCnt,
		trend10DnCnt: trend10DnCnt,

		trendUpXCnt3: trendUpXCnt3,
		trendDnXCnt3: trendDnXCnt3,
		trendUpXCnt4: trendUpXCnt4,
		trendDnXCnt4: trendDnXCnt4,
		trendUpXCnt5: trendUpXCnt5,
		trendDnXCnt5: trendDnXCnt5,
		trendUpXCnt10: trendUpXCnt10,
		trendDnXCnt10: trendDnXCnt10,

		cUpPrevClose: cUpPrevCloseCnt,
		cDnPrevClose: cDnPrevCloseCnt,

	}
	closeUpArr.push(closepassCnt)
	highUpArr.push(highpassCnt)
	lowUpArr.push(lowpassCnt)
	trend3UpArr.push(trend3UpCnt)
	cUpPrevCloseArr.push(cUpPrevCloseCnt)

	showStat()
}


function checkHLC(stkNum) {
	curHigh = BaseObjD[stkNum].high;
	curLow = BaseObjD[stkNum].low;
	closeArr = BaseObjD[stkNum].closes
	curClose = closeArr[closeArr.length - 1];
	prevClose = closeArr[closeArr.length - 2];

	curWma3 = calculateWeightedMovingAverage(closeArr, 3, stkNum); // calc 3 days
	//console.log("High ", curHigh, "Low ", curLow, "Close ", curClose, "curWma3 ", curWma3)

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

	if (curClose > prevClose) {  // compare with prev close
		cUpPrevCloseCnt = cUpPrevCloseCnt + 1
	} else if (curClose < prevClose) {
		cDnPrevCloseCnt = cDnPrevCloseCnt + 1
	}

}

function checkXStat(shortperiod, longperiod, stkNum) {  // Add stkNum parameter
	//console.log("BaseObjD[stkNum] Object.keys: ", Object.keys(BaseObjD[stkNum]))

	if (!BaseObjD[stkNum]) {  // Add safety check
		console.warn(`Skipping checkXStat for ${stkNum}: no data available`);
		return '';
	}

	closeArr = BaseObjD[stkNum].closes  // Use the provided stock number
	curPointer = closeArr.length - 1

	const prevArray = closeArr.slice(0, curPointer - 1);

	const prevLWma = calculateWeightedMovingAverage(prevArray, longperiod);
	const prevSWma = calculateWeightedMovingAverage(prevArray, shortperiod);
	const curLWma = calculateWeightedMovingAverage(closeArr, longperiod);
	const curSWma = calculateWeightedMovingAverage(closeArr, shortperiod);

	// 添加返回值
	if (curSWma > prevSWma) {
		if (shortperiod == 3) { trend3UpCnt = trend3UpCnt + 1 }
		if (shortperiod == 4) { trend4UpCnt = trend4UpCnt + 1 }
		if (shortperiod == 5) { trend5UpCnt = trend5UpCnt + 1 }
		if (shortperiod == 10) { trend10UpCnt = trend10UpCnt + 1 }
		return '升穿';
	} else {
		if (shortperiod == 3) { trend3DnCnt = trend3DnCnt + 1 }
		if (shortperiod == 4) { trend4DnCnt = trend4DnCnt + 1 }
		if (shortperiod == 5) { trend5DnCnt = trend5DnCnt + 1 }
		if (shortperiod == 10) { trend10DnCnt = trend10DnCnt + 1 }
		return '跌穿';
	}
}

function showStat() {
	statElement = document.createElement("div");

	// Calculate differences first
	let result = [];
	if (Object.keys(prevallResults).length !== 0) {
		result = findDifferences(allResults, prevallResults);
	} else {
		result = new Array(24).fill(0); // Create array of zeros for initial state
	}

	const tableHTML = `
        <div class="stat-table">
            <table>
                <tr>
                    <th colspan="4">${showDate()} ${showTime()} <r>lastDateValue</r> ${BaseObjD["00388"].lastDateValue}</th>
                </tr>
                <tr>
                    <td><bpk>收</bpk>: 比3日线高：<r>${closepassCnt}</r></td>
                    <td><bpk>收</bpk>: 差：<r>${result[0]}</r></td>
                    <td><bpk>收</bpk>: 比3日线低：<gr>${closeFailCnt}</gr></td>
                    <td><bpk>收</bpk>: 差：<gr>${result[1]}</gr></td>
                </tr>
                <tr>
                    <td>高: 比3日线高：<r>${highpassCnt}</r></td>
                    <td>高: 差：<r>${result[2]}</r></td>
                    <td>高: 比3日线低：<gr>${highFailCnt}</gr></td>
                    <td>高: 差：<gr>${result[3]}</gr></td>
                </tr>
                <tr>
                    <td>低: 比3日线高：<r>${lowpassCnt}</r></td>
                    <td>低: 差：<r>${result[4]}</r></td>
                    <td>低: 比3日线低：<gr>${lowFailCnt}</gr></td>
                    <td>低: 差：<gr>${result[5]}</gr></td>
                </tr>
                <tr class="trend-section">
                    <td>3日线升：<r>${trend3UpCnt}</r></td>
                    <td>差：<r>${result[6]}</r></td>
                    <td>3日线跌：<gr>${trend3DnCnt}</gr></td>
                    <td>差：<gr>${result[7]}</gr></td>
                </tr>
                <tr>
                    <td>4日线升：<r>${trend4UpCnt}</r></td>
                    <td>差：<r>${result[8]}</r></td>
                    <td>4日线跌：<gr>${trend4DnCnt}</gr></td>
                    <td>差：<gr>${result[9]}</gr></td>
                </tr>
                <tr>
                    <td>5日线升：<r>${trend5UpCnt}</r></td>
                    <td>差：<r>${result[10]}</r></td>
                    <td>5日线跌：<gr>${trend5DnCnt}</gr></td>
                    <td>差：<gr>${result[11]}</gr></td>
                </tr>
                <tr>
                    <td>10日线升：<r>${trend10UpCnt}</r></td>
                    <td>差：<r>${result[12]}</r></td>
                    <td>10日线跌：<gr>${trend10DnCnt}</gr></td>
                    <td>差：<gr>${result[13]}</gr></td>
                </tr>
                <tr class="cross-section">
                    <td>3日升穿6日：<r>${trendUpXCnt3}</r></td>
                    <td>差：<r>${result[14]}</r></td>
                    <td>3日跌穿6日：<gr>${trendDnXCnt3}</gr></td>
                    <td>差：<gr>${result[15]}</gr></td>
                </tr>
                <tr>
                    <td>4日升穿10日：<r>${trendUpXCnt4}</r></td>
                    <td>差：<r>${result[16]}</r></td>
                    <td>4日跌穿10日：<gr>${trendDnXCnt4}</gr></td>
                    <td>差：<gr>${result[17]}</gr></td>
                </tr>
                <tr>
                    <td>5日升穿10日：<r>${trendUpXCnt5}</r></td>
                    <td>差：<r>${result[18]}</r></td>
                    <td>5日跌穿10日：<gr>${trendDnXCnt5}</gr></td>
                    <td>差：<gr>${result[19]}</gr></td>
                </tr>
                <tr>
                    <td>10日升穿20日：<r>${trendUpXCnt10}</r></td>
                    <td>差：<r>${result[20]}</r></td>
                    <td>10日跌穿20日：<gr>${trendDnXCnt10}</gr></td>
                    <td>差：<gr>${result[21]}</gr></td>
                </tr>
                <tr>
                    <td>比昨日升：<r>${cUpPrevCloseCnt}</r></td>
                    <td>差：<r>${result[22]}</r></td>
                    <td>比昨日跌：<gr>${cDnPrevCloseCnt}</gr></td>
                    <td>差：<gr>${result[23]}</gr></td>
                </tr>
            </table>
        </div>
    `;

	// Add some CSS for the table
	const styleElement = document.createElement('style');
	styleElement.textContent = `
        .stat-table table {
            border-collapse: collapse;
            width: 100%;
            margin: 0px 0;
            background-color: black;
        }
        .stat-table td, .stat-table th {
            padding: 5px;
            text-align: left;
            border: 1px solid #333;
        }
        .stat-table th {
            background-color: black;
        }
        .trend-section td {
            border-top: 2px solid #444;
        }
        .cross-section td {
            border-top: 2px solid #444;
        }
    `;
	document.head.appendChild(styleElement);

	statElement.innerHTML = tableHTML;
	const outputDiv = document.getElementById('output');
	//outputDiv.parentNode.insertBefore(statElement, outputDiv);
	outputDiv.innerHTML = tableHTML
}


function findDifferences(objA, objB) {
	const differences = [];

	// Get all keys from allResults
	const keys = Object.keys(objA);

	// Calculate differences and store in array
	keys.forEach(key => {
		if (objB.hasOwnProperty(key)) {
			differences.push(objA[key] - objB[key]);
		}
	});

	return differences;
}



function calculateWeightedMovingAverage(data, period, stkNum) {
	if (data.length < period) {
		console.log("stkNum: ", stkNum, "data.length: ", data.length, "period ", period)
		throw new Error("Data array is shorter than the period. stkNum: ", stkNum);
	}

	const weights = Array.from({ length: period }, (_, i) => i + 1);
	const weightSum = weights.reduce((a, b) => a + b, 0);

	const recentData = data.slice(data.length - period);

	const weightedSum = recentData.reduce((sum, value, index) => {
		return sum + value * weights[index];
	}, 0);

	return weightedSum / weightSum;
}

// <y>标准差</y>
function standardDeviation(data, period) {
	const std = new Array(period - 1).fill(null); // <y>填充 null</y>
	for (let i = period - 1; i < data.length; i++) {
		const avg = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
		const variance = data.slice(i - period + 1, i + 1).reduce((a, b) => a + Math.pow(b - avg, 2), 0) / period;
		std.push(Math.sqrt(variance));
	}
	return std;
}


// <y>计算保力加通道</y>
function bollingerBands(data, period, multiplier) {
	const wma = calculateWeightedMovingAverage(data, period);
	const std = standardDeviation(data, period);
	const upperBand = wma.map((val, i) => val === null ? null : val + multiplier * std[i]);
	const lowerBand = wma.map((val, i) => val === null ? null : val - multiplier * std[i]);
	//console.log("lowerBand: ",lowerBand)
	return { wma, upperBand, lowerBand, std };
}


function plotChart(dataArray, chartId, label, color) {
 // <y>创建标题</y>


 const img = document.createElement('img');
 img.src = 'http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=T&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=10&indpara2=1.6&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&scheme=3&com=100&chartwidth=800&chartheight=500&stockid=110000&period=7&type=1&logoStyle=1';

 const title = document.createElement('pk');
 //title.textContent = label + "<br>";
 title.innerHTML = label + "<br>";

	// Create canvas element if it doesn't exist
	let chartContainer = document.getElementById(chartId);
	if (!chartContainer) {
		chartContainer = document.createElement('div');
		chartContainer.id = chartId;
		document.getElementById('chartOutput').appendChild(title);
		document.getElementById('chartOutput').appendChild(img);
		document.getElementById('chartOutput').appendChild(chartContainer);
	}
	chartContainer.innerHTML = '<canvas></canvas>';

	const minValue = Math.min(...dataArray);
	const ctx = chartContainer.querySelector('canvas').getContext('2d');

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: stdDArr,
			datasets: [{
				label: label,
				data: dataArray,
				borderColor: color,
				fill: false,
				borderWidth: 1,
				pointStyle: false,
			}]
		},
		options: {
			responsive: false,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: false,
					min: minValue,
				}
			}
		}
	});
}

function calculateWMA(prices, index, period) {
    if (index < period - 1) {
        throw new Error("Not enough data points for the given period.");
    }

    let weightedSum = 0;
    let weightSum = 0;

    for (let i = 0; i < period; i++) {
        const weight = period - i; // Weights: 3, 2, 1 for period=3
        weightedSum += prices[index - i] * weight;
        weightSum += weight;
    }

    return weightedSum / weightSum;
}


// Start the process
async function main() {
  // fetchAllData --> processQueue -->
  await fetchAllData()

    stdArr = BaseObjD["00388"].closes
    stdDArr = BaseObjD["00388"].date
    totalDays = stdArr.length

  for (let loopDay = 1; loopDay < totalDays; loopDay++) {
    let uptotal = 0, dntotal = 0;
    let wma3uptotal = 0, wma3dntotal = 0;
    let gtPrevWma3total = 0, ltPrevWma3total = 0;
    let u3X6total = 0, d3X6total = 0;
    let u4X10total = 0, d4X10total = 0;
    let u5X10total = 0, d5X10total = 0;
    let u10X20total = 0, d10X20total = 0;

    for (let stkPointer = 0; stkPointer < codeTable.length; stkPointer++) {

      const closeArr = BaseObjD[codeTable[stkPointer]].closes;
      const curClose = closeArr[loopDay];
      const prevClose = closeArr[loopDay - 1];

      // Calculate WMAs
      let wma3, wma4, wma5, wma6, wma10, wma20;
      if (loopDay > 1) wma3 = calculateWMA(closeArr, loopDay, 3);
      if (loopDay > 2) wma4 = calculateWMA(closeArr, loopDay, 4);
      if (loopDay > 3) wma5 = calculateWMA(closeArr, loopDay, 5);
      if (loopDay > 4) wma6 = calculateWMA(closeArr, loopDay, 6);
      if (loopDay > 8) wma10 = calculateWMA(closeArr, loopDay, 10);
      if (loopDay > 18) wma20 = calculateWMA(closeArr, loopDay, 20);

      // Compare day up/down
      if (curClose > prevClose) uptotal++;
      if (curClose < prevClose) dntotal++;

      // Compare with trendlines
      if (loopDay > 1) {
        if (curClose > wma3) wma3uptotal++;
        if (curClose < wma3) wma3dntotal++;
      }

      if (loopDay > 2) {
        const prevWma3 = calculateWMA(closeArr, loopDay - 1, 3);
        if (wma3 > prevWma3) gtPrevWma3total++;
        if (wma3 < prevWma3) ltPrevWma3total++;
      }

      if (loopDay > 4) {
        if (wma3 > wma6) u3X6total++;
        if (wma3 < wma6) d3X6total++;
      }

      if (loopDay > 8) {
        if (wma4 > wma10) u4X10total++;
        if (wma4 < wma10) d4X10total++;
        if (wma5 > wma10) u5X10total++;
        if (wma5 < wma10) d5X10total++;
      }

      if (loopDay > 18) {
        if (wma10 > wma20) u10X20total++;
        if (wma10 < wma20) d10X20total++;
      }
    }

    // Push results to arrays
    closeUpArr.push(uptotal);
    closeDnArr.push(dntotal);
    wma3UpArr.push(wma3uptotal);
    wma3DnArr.push(wma3dntotal);
    gtPrevWma3Arr.push(gtPrevWma3total);
    ltPrevWma3Arr.push(ltPrevWma3total);
    u3X6Arr.push(u3X6total);
    d3X6Arr.push(d3X6total);
    u4X10Arr.push(u4X10total);
    d4X10Arr.push(d4X10total);
    u5X10Arr.push(u5X10total);
    d5X10Arr.push(d5X10total);
    u10X20Arr.push(u10X20total);
    d10X20Arr.push(d10X20total);
  }
  plotChart(closeUpArr, "closeUp", "收市升", "#909080")
  plotChart(closeDnArr, "closeDn", "收市跌", "#a08080")
  plotChart(wma3UpArr, "wma3Up", "三日线升", "#b08080")
  plotChart(wma3DnArr, "wma3Dn", "三日线跌", "#c08080")
  plotChart(gtPrevWma3Arr, "gtPrevWma3", "三日线上", "#d08080")
  plotChart(ltPrevWma3Arr, "ltPrevWma3", "三日线下", "#e08080")
  plotChart(u3X6Arr, "u3X6", "3上穿6", "#f08080")
  plotChart(d3X6Arr, "d3X6", "3下穿6", "#800080")
  plotChart(u4X10Arr, "u4X10", "4上穿10", "#801080")
  plotChart(d4X10Arr, "d4X10", "4下穿10", "#802080")
  plotChart(u5X10Arr, "u5X10", "5上穿10", "#803080")
  plotChart(d5X10Arr, "d5X10", "5下穿10", "#804080")
  plotChart(u10X20Arr, "u10X20", "10上穿20", "#806080")
  plotChart(d10X20Arr, "d10X20", "10下穿20", "#805080")
}
main()

