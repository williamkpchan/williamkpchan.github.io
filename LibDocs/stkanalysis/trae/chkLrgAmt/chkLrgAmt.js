// mon HK stk big amt

// prepare basic materials

// Function to collect day kline data for a single stock code
async function collectdata(stknum) {
console.log(".")
     chartOutput = document.getElementById('chartOutput')
     chartOutput.innerHTML = ""

	const stkcode = "hk" + stknum;
	const url = "https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=" + stkcode + ",day,,,60,qfq";

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
		plotBollingerBands(amtArray, 3, 1,"amt wma", stknum);

	} catch (error) {
		console.error(`Error ${stknum}:`, error);
	}
}

function plotBollingerBands(data, period, multiplier, chartTitle, stknum) {
    // 计算保力加通道数据
    bands = bollingerBands(data, period, multiplier);

    // 创建标题
    title = document.createElement('pk');
    codeStr = `<o onclick="xunbao('` + stknum + `')">` + stknum + "</o>"

    title.innerHTML = chartTitle + " "+ codeStr;
    chartOutput = document.getElementById('chartOutput')
    chartOutput.innerHTML = ""

    chartOutput.appendChild(title);

    // 动态创建画布
    canvas = document.createElement('canvas');
    aspectRatio = 1.2; // 预设宽高比
    containerWidth = document.body.clientWidth; // 获取页面宽度
    canvas.style.width = '100%';
    canvas.width = containerWidth;
    canvas.height = containerWidth / aspectRatio; 
    chartOutput.appendChild(canvas);

    // 获取画布上下文
    ctx = canvas.getContext('2d');

    // 绘制图表
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: data.length }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'amt',
                    data: data,
                    borderColor: 'yellow',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },

                {
                    label: 'wmaL1',
                    data: bands.wmaL1,
                    borderColor: 'blue',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },

            ]
        },
        options: {
            responsive: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: false,
                        text: 'Time'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: false,
                        text: 'amt'
                    }
                }
            }
        }
    });
}

function bollingerBands(data, period, multiplier) {
 wmaL1 = weightedMovingAverage(data, period);

 std = standardDeviation(data, period);
 upperBand = wmaL1.map((val, i) => val === null ? null : val + multiplier * std[i]);
 lowerBand = wmaL1.map((val, i) => val === null ? null : val - multiplier * std[i]);
//console.log("lowerBand: ",lowerBand)
 return { wmaL1, upperBand, lowerBand, std };
}

// <y>加权移动平均 (WMA)</y>
function weightedMovingAverage(data, period) {
 const weights = Array.from({length: period}, (_, i) => period - i);
 const wma = new Array(period - 1).fill(null); // <y>填充 null</y>
 for (let i = period - 1; i < data.length; i++) {
  let sum = 0;
  let weightSum = 0;
  for (let j = 0; j < period; j++) {
   sum += data[i - j] * weights[j];
   weightSum += weights[j];
  }
  wma.push(sum / weightSum);
 }
 return wma;
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

function calculateWeightedMovingAverage(data, period) {
 if (data.length < period) {
  throw new Error("Data array is shorter than the period.");
 }

 // calculate the weights and sum of weights
 const weights = Array.from({ length: period }, (_, i) => i + 1);
 const weightSum = weights.reduce((a, b) => a + b, 0);
 
 // extract recentData
 const recentData = data.slice(data.length - period);

 // calculate weightedSum, this is still the sum
 const weightedSum = recentData.reduce((sum, value, index) => {
  return sum + value * weights[index];
 }, 0);

 return weightedSum / weightSum;  // this is ema value
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


function askforCode() {
    thecode = prompt("Code Number:", "");
    if (thecode != null && thecode != "") {
        thecode = "00000" + thecode
        codewidth = thecode.length
        thecode = thecode.slice(codewidth-5, codewidth)

        collectdata(thecode)
    }else{
      return;
    }
}

function chkKey() {
	var testkey = getChar(event);
	if (testkey == 't') { window.scrollTo(0, 0); }
	else if (testkey == 'F') { window.location = '#FreqTable'; }
	else if (testkey == 's') { window.location = '#amtNote'; }
	else if (testkey == 'd') { window.location = '#dnAmtNote'; }
	else if (testkey == 'e') { window.scrollTo(0, document.body.scrollHeight); }
	else if (testkey == 'c') { askforCode(); }
	else { chkOtherKeys(testkey) }
}


// Start the main process
stknum = '01508'
collectdata(stknum)
