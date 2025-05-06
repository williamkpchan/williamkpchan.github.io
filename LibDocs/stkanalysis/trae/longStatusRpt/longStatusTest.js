
//const codeTable = ['00001', '00002', '00003', '00005', '00006', '00011', '00012'];
// 老千 '00302','02233','00357',
codeTable = ['00388', '02208', '01951', '01448', '01171', '02800', '00700', '09988', '00005', '00883', '02828', '00857', '00939', '02318', '01299', '03968', '00941', '01398', '00522', '09618', '00386', '01211', '02899', '03988', '09999', '01088', '00016', '01288', '02269', '09961', '01816', '02382', '00992', '01919', '01109', '00981', '00836', '00001', '09633', '01093', '02601', '01910', '00027', '00669', '06690', '02020', '00011', '02388', '00916', '01928', '00020', '00175', '02628', '00291', '01833', '01378', '00728', '02359', '09626', '00002', '02331', '06862', '01113', '00780', '00006', '01801', '00762', '09901', '02688', '03993', '01548', '02618', '09992', '00288', '06160', '02319', '01766', '00285', '01972', '01800', '00003', '00960', '06030', '01658', '00966', '01138', '02057', '00688', '06881', '01336', '03908', '02313', '01898', '00968', '02333', '03692', '03328', '01347', '01038', '03888', '09987', '01339', '01177', '02018', '02328', '01099', '02883', '00135', '01193', '01876', '06865', '02338', '01209', '03800', '00316', '01818', '00358', '02600', '01071', '01913', '00241', '00019', '01997', '03067', '02380', '00868', '03998', '02202', '00322', '02588', '00819', '00998', '00384', '00763', '01787', '02099', '00101', '00425', '00914', '03898', '00570', '01797', '00390', '00257', '00267', '00012', '00066', '06186', '00270', '00881', '03320', '02400', '00136', '02013', '03618', '01066', '01908', '01030', '00683', '06823', '01798', '03323', '01208', '03759', '01952', '06088', '01918', '01772', '00467', '01186', '03969', '01302', '00921', '01357', '06110', '09969', '01929', '02666', '00772', '06078', '00696', '03311', '00293', '00371', '03900', '00956', '02162', '02607', '00991', '06855', '02238', '00083', '01776', '02386', '06818', '00220', '00576', '06060', '01157', '00017', '03808', '01044', '02357', '00142', '03347', '01359', '06098', '01415', '00354', '01179', '00014', '03110', '02196', '01128', '00189', '03032', '00123', '01896', '02343', '00934', '00867', '01368', '00995', '00177', '00552', '01883', '00639', '00151', '09922', '00489', '00152', '00148', '00586', '01381', '01530', '00853', '01882', '00813', '03360', '00799', '00598', '02096', '00667', '09698', '01610', '01618', '02888', '01821', '03738', '06066', '02186', '06699', '00880', '02128', '00884', '01072', '06886', '00874', '01070', '01516', '00551', '06049', '02669', '02257', '01513', '09995', '02255', '00694', '01681', '01999', '01508', '00631', '01478', '01385', '00777', '01055', '00525', '01199', '02039', '01060', '03613', '00004', '00579', '00338', '00817', '02869', '02638', '00856', '00548', '01963', '06869', '00081', '00363', '00590', '00303', '01958', '00200', '03377', '00317', '03709', '01579', '01316', '00656', '01119', '01811', '00341', '06099', '00909', '02689', '03319', '00087', '03958', '00297', '01907', '02145', '02276', '01888', '01313', '00861', '01310', '00038', '06185', '09959', '02777', '00345', '00010', '03899', '01666', '02005', '09966', '00460', '02877', '00023', '00440', '06808', '00179', '00855', '00596', '02866', '02285', '00347', '06666', '01995', '01877', '02362', '06127', '01428', '01691', '02158', '01515', '02155', '03983', '01600', '00165', '02801', '00710', '09911', '00708', '00670', '02611', '02252', '00308', '00823', '01613', '02009', '02823', '02822', '07226', '07299', '02840', '01858', '01860', '07200', '07288', '03037', '00412', '00751', '02727', '02356', '02342', '06178', '03188', '00778', '00636', '07568', '07522', '07552', '00182', '07500', '03606', '06969', '00268', '00144', '00564', '03668', '00300', '06181', '01698', '02556', '01164', '00788', '02577', '09896', '01810', '02015', '03690', '06618', '09888', '01024', '09926', '03033', '09868',];

const BaseObj = {};
let dataObj = [];
dateArr = [];
let stkName = "";
status3UpCnt = 0
status3DnCnt = 0
status4UpCnt = 0
status4DnCnt = 0
status5UpCnt = 0
status5DnCnt = 0
status10UpCnt = 0
status10DnCnt = 0

status3UpCntArr = []
status3DnCntArr = []
status4UpCntArr = []
status4DnCntArr = []
status5UpCntArr = []
status5DnCntArr = []
status10UpCntArr = []
status10DnCntArr = []

statusUpXCnt3 = 0
statusUpXCnt4 = 0
statusUpXCnt5 = 0
statusUpXCnt10 = 0
statusDnXCnt3 = 0
statusDnXCnt4 = 0
statusDnXCnt5 = 0
statusDnXCnt10 = 0

statusUpXCnt3Arr = [];
statusUpXCnt4Arr = [];
statusUpXCnt5Arr = [];
statusUpXCnt10Arr = [];
statusDnXCnt3Arr = [];
statusDnXCnt4Arr = [];
statusDnXCnt5Arr = [];
statusDnXCnt10Arr = [];

highpassCnt = 0
highFailCnt = 0
lowpassCnt = 0
lowFailCnt = 0
closepassCnt = 0
closeFailCnt = 0

highpassCntArr = []
highFailCntArr = []
lowpassCntArr = []
lowFailCntArr = []
closepassCntArr = []
closeFailCntArr = []

function main() {
  (async () => {

    for (let i = 0; i < codeTable.length; i++) {
      await fetchKline(codeTable[i]);
    }

    arrLength = BaseObj["00388"].closeArr.length
        highpassCntArr = []
        highFailCntArr = []
        lowpassCntArr = []
        lowFailCntArr = []
        closepassCntArr = []
        closeFailCntArr = []

        status3UpCntArr = []
        status3DnCntArr = []
        status4UpCntArr = []
        status4DnCntArr = []
        status5UpCntArr = []
        status5DnCntArr = []
        status10UpCntArr = []
        status10DnCntArr = []

        statusUpXCnt3Arr = [];
        statusUpXCnt4Arr = [];
        statusUpXCnt5Arr = [];
        statusUpXCnt10Arr = [];
        statusDnXCnt3Arr = [];
        statusDnXCnt4Arr = [];
        statusDnXCnt5Arr = [];
        statusDnXCnt10Arr = [];

        dateArr = dateArr.slice((arrLength-21), arrLength);

      for (let day = 21; day < arrLength; day++) {
        highpassCnt=0
        highFailCnt=0
        lowpassCnt=0
        lowFailCnt=0
        closepassCnt=0
        closeFailCnt=0

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

		for (let i = 0; i < codeTable.length; i++) {
			thisStk = BaseObj[codeTable[i]]
			thisHighArr = thisStk.highArr;
			thisLowArr = thisStk.lowArr;
			thisCloseArr = thisStk.closeArr;

			curHigh = thisHighArr[day];
			curLow = thisLowArr[day];
			curClose = thisCloseArr[day];
			thisCloseArr = thisCloseArr.slice(0, day);

			const statusMsgHLC = compareHLC(curHigh, curLow, curClose, thisCloseArr);
			const statusMsg3 = checkXStatus(3, 6, day, thisCloseArr);
			const statusMsg4 = checkXStatus(4, 10, day, thisCloseArr);

			const statusMsg5 = checkXStatus(5, 10, day, thisCloseArr);
			const statusMsg10 = checkXStatus(10, 20, day, thisCloseArr);

				if (statusMsg3.includes('升穿')) {
					statusUpXCnt3 = statusUpXCnt3 +1
				}
				if (statusMsg4.includes('升穿')) {
					statusUpXCnt4 = statusUpXCnt4 +1
				}
				if (statusMsg5.includes('升穿')) {
					statusUpXCnt5 = statusUpXCnt5 +1
				}
				if (statusMsg10.includes('升穿')) {
					statusUpXCnt10 = statusUpXCnt10 +1
				}

				if (statusMsg3.includes('跌穿')) {
					statusDnXCnt3 = statusDnXCnt3 +1
				}
				if (statusMsg4.includes('跌穿')) {
					statusDnXCnt4 = statusDnXCnt4 +1
				}
				if (statusMsg5.includes('跌穿')) {
					statusDnXCnt5 = statusDnXCnt5 +1
				}
				if (statusMsg10.includes('跌穿')) {
					statusDnXCnt10 = statusDnXCnt10 +1
				}
		}

        highpassCntArr.push(highpassCnt)
        highFailCntArr.push(highFailCnt)
        lowpassCntArr.push(lowpassCnt)
        lowFailCntArr.push(lowFailCnt)
        closepassCntArr.push(closepassCnt)
        closeFailCntArr.push(closeFailCnt)

        status3UpCntArr.push(status3UpCnt)
        status3DnCntArr.push(status3DnCnt)
        status4UpCntArr.push(status4UpCnt)
        status4DnCntArr.push(status4DnCnt)
        status5UpCntArr.push(status5UpCnt)
        status5DnCntArr.push(status5DnCnt)
        status10UpCntArr.push(status10UpCnt)
        status10DnCntArr.push(status10DnCnt)

        statusUpXCnt3Arr.push(statusUpXCnt3)
        statusUpXCnt4Arr.push(statusUpXCnt4)
        statusUpXCnt5Arr.push(statusUpXCnt5)
        statusUpXCnt10Arr.push(statusUpXCnt10)
        statusDnXCnt3Arr.push(statusDnXCnt3)
        statusDnXCnt4Arr.push(statusDnXCnt4)
        statusDnXCnt5Arr.push(statusDnXCnt5)
        statusDnXCnt10Arr.push(statusDnXCnt10)
      }

	   showStat()
	})();

}




function showStat() {
  plotArrays("高位数",[highpassCntArr, lowpassCntArr, closepassCntArr], ['Hpass', 'Lpass','Cpass'])
  plotArrays("低位数",[highFailCntArr, lowFailCntArr, closeFailCntArr], ['HFail', 'LFail','CFail'])

  plotArrays("高升数",[status3UpCntArr, status4UpCntArr, status5UpCntArr, status10UpCntArr], ['3Up','4Up','5Up','10Up'])
  plotArrays("低走数",[status3DnCntArr, status4DnCntArr, status5DnCntArr, status10DnCntArr], ['3Dn','4Dn','5Dn','10Dn'])

  plotArrays("上突破数",[statusUpXCnt3Arr, statusUpXCnt4Arr, statusUpXCnt5Arr, statusUpXCnt10Arr],['UpX3','UpX4','UpX5','UpX10'])
  plotArrays("下突破数",[statusDnXCnt3Arr, statusDnXCnt4Arr, statusDnXCnt5Arr, statusDnXCnt10Arr],['DnX3','DnX4','DnX5','DnX10'])


}






async function fetchKline(theCode) {
	console.log(".")
	return new Promise((resolve, reject) => {
		const theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,50,qfq';

		fetch(theurl)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.text();
			})

			.then(text => {
				const jsonStr = text.replace('kline_dayqfq=', '');
				const stkdata = JSON.parse(jsonStr);

				if (stkdata.code === 0) {
					const newDataObj = stkdata.data[`hk${theCode}`].qfqday || stkdata.data[`hk${theCode}`].day;

					stkName = stkdata.data[`hk${theCode}`].qt[`hk${theCode}`][1];

					closeArr = [];
					highArr = [];
					lowArr = [];

					if(theCode="00388"){
    					  for (let i = 0; i < newDataObj.length; i++) {
						dateArr.push(Number(newDataObj[i][0]));
    					  } 
					}

					for (let i = 0; i < newDataObj.length; i++) {
						closeArr.push(Number(newDataObj[i][2]));
						highArr.push(Number(newDataObj[i][3]));
						lowArr.push(Number(newDataObj[i][4]));
					}

					// Store the result in BaseObj
					BaseObj[theCode] = { stkName, closeArr, highArr, lowArr};
					resolve();
				} else {
					console.log(`Request failed with error: ${stkdata.msg}`);
					reject(new Error(`Request failed with error: ${stkdata.msg}`));
				}
			})

			.catch(error => {
				console.log("ERROR!\n" + theCode + "\n" + stkName + "\n" + "newDataObj\n" + newDataObj + error);
				reject(error);
			});

	});
}

function checkX(prevL, prevS, curL, curS) {
	if (curS === curL) { return "<y>平</y>"; }
	if (((prevL === prevS) && (curS > curL)) || ((prevL > prevS) && (curS > curL))) {
		return '<r>升穿</r>';
	}
	if (((prevL === prevS) && (curS < curL)) || ((prevL < prevS) && (curS < curL))) {
		return '<bgr>跌穿</bgr>';
	}
	if ((prevL < prevS) && (curS > curL)) { return '<pk>继续升</pk>'; }
	if ((prevL > prevS) && (curS < curL)) { return '<lg>继续跌</lg>'; }
}

function calculateWeightedMovingAverage(data, period) {
	if (data.length < period) {
		return("Data array is shorter than the period.");
	}

	const weights = Array.from({ length: period }, (_, i) => i + 1);
	const weightSum = weights.reduce((a, b) => a + b, 0);

	const recentData = data.slice(data.length - period);

	const weightedSum = recentData.reduce((sum, value, index) => {
		return sum + value * weights[index];
	}, 0);

	return weightedSum / weightSum;
}

function checkXStatus(shortperiod, longperiod, curPointer, thisCloseArr) {
	const prevArray = thisCloseArr.slice(0, curPointer - 1);

	const prevLWma = calculateWeightedMovingAverage(prevArray, longperiod);
	const prevSWma = calculateWeightedMovingAverage(prevArray, shortperiod);
	const curLWma = calculateWeightedMovingAverage(thisCloseArr, longperiod);
	const curSWma = calculateWeightedMovingAverage(thisCloseArr, shortperiod);

	let shortTrendMsg;
	if (curSWma > prevSWma) {
		shortTrendMsg = shortperiod + "<r>日趋势升</r>";
		if (shortperiod == 3) { status3UpCnt = status3UpCnt + 1 }
		if (shortperiod == 4) { status4UpCnt = status4UpCnt + 1 }
		if (shortperiod == 5) { status5UpCnt = status5UpCnt + 1 }
		if (shortperiod == 10) { status10UpCnt = status10UpCnt + 1 }
	} else if (curSWma === prevSWma) {
		shortTrendMsg = shortperiod + "<y>日趋势平</y>";
	} else {
		shortTrendMsg = shortperiod + "<gr>日趋势跌</gr>";
		if (shortperiod == 3) { status3DnCnt = status3DnCnt + 1 }
		if (shortperiod == 4) { status4DnCnt = status4DnCnt + 1 }
		if (shortperiod == 5) { status5DnCnt = status5DnCnt + 1 }
		if (shortperiod == 10) { status10DnCnt = status10DnCnt + 1 }
	}

	return (shortTrendMsg + ",<br>" + shortperiod + "日" + checkX(prevLWma, prevSWma, curLWma, curSWma) + longperiod + "日");
}

function compareHLC(curHigh, curLow, curClose, closeArr ) {
	curWma3 = calculateWeightedMovingAverage(closeArr, 3); // calc 3 days
     // console.log("stkNum ", stkNum, " ",curPointer, " H ", curHigh, " L ", curLow, " C ", curClose)
	if (curHigh > curWma3) {
		highMsg = "<r>高:高过三日趋势</r>"
		highpassCnt = highpassCnt + 1
	} else if (curHigh < curWma3) {
		highMsg = "<gr>高:低过三日趋势</gr>"
		highFailCnt = highFailCnt + 1
	} else {
		highMsg = "<y>高:平三日趋势</y>"
	}

	if (curLow > curWma3) {
		lowMsg = "<r>低:高过三日趋势</r>"
		lowpassCnt = lowpassCnt + 1
	} else if (curLow < curWma3) {
		lowMsg = "<gr>低:低过三日趋势</gr>"
		lowFailCnt = lowFailCnt + 1
	} else {
		lowMsg = "<y>低:平三日趋势</y>"
	}

	if (curClose > curWma3) {
		closeMsg = "<r>收:高过三日趋势</r>"
		closepassCnt = closepassCnt + 1
	} else if (curClose < curWma3) {
		closeMsg = "<gr>收:低过三日趋势</gr>"
		closeFailCnt = closeFailCnt + 1
	} else {
		closeMsg = "<y>收:平三日趋势</y>"
	}

	return (closeMsg + ",<br>" + highMsg + ",<br>" + lowMsg);
}



function xunbao(xunbaocode) {
	sessionStorage.setItem("randomcode", xunbaocode)
	localStorage.setItem("randomcode", xunbaocode)
	window.open("../../Random Charts.html");
	// locs = ["HIghLowTrend.html", "Random Charts.html", ]
	//  window.open("HIghLowTrend.html")
}

const colors = ['white', 'yellow', 'orange','red', 'blue', 'green', 'purple', 'brown']; // Array of colors for the lines

function plotArrays(title,arrays, labels) {
    // Create a canvas element to render the chart
    const canvas = document.createElement('canvas');
    const aspectRatio = 1.5; // 预设宽高比
    const containerWidth = document.body.clientWidth; // 获取页面宽度
    canvas.style.width = '100%';
    canvas.width = containerWidth;
    canvas.height = containerWidth / aspectRatio; 
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
  
  
  // Generate datasets
  const datasets = arrays.map((array, i) => ({
      label: dateArr,
      data: array,
      borderColor: colors[i % colors.length],
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1,
      pointStyle: false,
  }));
  
  // Create the chart
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: arrays[0].map((_, i) => i + 1), // x-axis labels (1, 2, 3...)
          datasets: datasets
      },
      options: {
          responsive: false,
          plugins: {
              title: {
                  display: true,
                  text: title,
                  font: {
                     size: 32
                  }
              },
          },
          scales: {
              y: {
                  beginAtZero: false
              }
          },
      }
  });
}

main();
