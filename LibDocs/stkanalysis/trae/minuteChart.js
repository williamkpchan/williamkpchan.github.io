let stkCode, stkName, stkTime, stkPrice, stkMaxprice, stkMinprice, stkVol, stkChange, mytimer;
let stkChangeArr = [];
let toFixedLen = 3;
let theString ="";

let theurlHead = 'https://web.ifzq.gtimg.cn/appstock/app/day/query?code=hk'
// let theurlTail = ',day,,,320,qfq'

if (localStorage.getItem("minuteLayersTimer") === null) {
      localStorage.setItem("minuteLayersTimer", 60000)
      minuteLayersTimer = 60000;
} else{
      minuteLayersTimer = Number(localStorage.getItem("minuteLayersTimer"))
}

var theCode = "";
var theStartCode = theCode; // loaded from the _init()

var thestkkey = "";
let rawJSON1 = {};
let thestkdata = [];
let thedrawdata = [];
let diffaccel = [];
let period = 150;
let dateLst = [];
let openLst = [];
let highLst = [];
let lowLst = [];
let closeLst = [];
chartColor = ['red','green','blue','brown', 'orange','gold','yellow', 'cyan', 'violet','silver', 'coral'];
minSteps = [];


var theMax, theMin;
var intv1, intv2, intv3, intv4, intv5, intv6, intv7, showWidth, datawidth;

      if (localStorage.getItem("subtractIdx") === null) {
        baseSubIdx = 1
        baseMinuIdx = 4
      } else{
        subtractIdx = JSON.parse(localStorage.getItem("subtractIdx"));
        baseSubIdx = subtractIdx[0]
        baseMinuIdx = subtractIdx[1]
      }


var stkPointer = 0

function changeStkCode(theCode) {
          $("#minuteStatus").html("");
  // to check A stk or HK stk

          codewidth = theCode.length
          if((theCode == "HSI")|(theCode == "110000")){
            theCode = "HSI"
            theurl = 'https://web.ifzq.gtimg.cn/appstock/app/day/query?code=hk' + "HSI"
          }else{
            if(codewidth <= 5){
              theCode = "00000"+theCode;
              codewidth = theCode.length;
              theCode = theCode.slice(codewidth-5, codewidth);
              codewidth = theCode.length; //update to be used later
              theurl = 'https://web.ifzq.gtimg.cn/appstock/app/day/query?code=hk' + theCode
            }else{
              //codewidth = theCode.length
              //theCode = theCode.slice(codewidth-9, codewidth)
              //theCode = theCode.slice(7, 9) + theCode.slice(0, 6);
              codewidth = theCode.length; //update to be used later
              if((codewidth == 6) && !hsReservedCode.includes(theCode)){
                 if (theCode.charAt(0) == "6"){
                    theCode = "sh"+theCode; 
                 }else{
                    theCode = "sz"+theCode
                 }
                 theStartCode = theCode
                 theurl = 'https://web.ifzq.gtimg.cn/appstock/app/day/query?_var=fdays_data_' + theCode + '&code=' + theCode
              }else if(codewidth == 9){
                 theCode = theCode.substring(7, 9) + theCode.substring(0, 6);
                 theStartCode = theCode
                 theurl = 'https://web.ifzq.gtimg.cn/appstock/app/day/query?_var=fdays_data_' + theCode + '&code=' + theCode

              }else{
                theurl = 'https://web.ifzq.gtimg.cn/appstock/app/day/query?_var=fdays_data_' + theCode + '&code=' + theCode
              }
            }
          }

 	theStartCode = theCode;
	thestkdata = [];
	thedrawdata = [];
	closeLst = [];

      var options = '';  // build the List select option
      for (var i = 0; i < allListNames.length; i++) {
         options += '<option value="' + allListNames[i]+ '">' + allListNames[i] + '</option>';
      }
      $("#selectList").html(options);

      if (localStorage.getItem("stkListArr") === null) {
        localStorage.stkListArr = "07500";
        //stkList = 恒指成分
      } else{
        stkList = localStorage.getItem("stkListArr").split(' ');
      //console.log(stkList)
      }


  if(fraudSTK.includes(theCode)){
    $('#alertMsg').show()
  }else{
    $('#alertMsg').hide()
  }

	//var theurl = theurlHead + theStartCode
	RGraph.AJAX.getJSON(theurl, function (rawJSON){
		keys = Object.keys(rawJSON); // read the structure keys ["code", "msg", "data"]
		var insideDatakey = Object.keys(rawJSON)[2] //
		// myobj[Object.keys(myobj)[0]] this is the extract method

		var thedata = rawJSON[Object.keys(rawJSON)[2]]
		thestkkey = Object.keys(thedata)[0] // this is the stk key name
		var tempdata = thedata[Object.keys(thedata)[0]]; // {data: Array(5), qt: {…}, vcm: ""} five sets of data here
		// old data at the back, new data at 0 location
		allData = tempdata.data[4].data.concat(tempdata.data[3].data).concat(tempdata.data[2].data).concat(tempdata.data[1].data).concat(tempdata.data[0].data)
		//(1599) ["0930 26834.15 375023", "0931 26858.43 469321"
		allData = allData.filter((val) => val != "");

          if(datawidth > allData.length){datawidth = allData.length};
            // console.log("datawidth "+datawidth)
		allData = allData.slice(allData.length-datawidth); // get only req data

		allData.forEach(str => { closeLst.push(Number(str.split(' ')[1])); }); // split the string and select only the middle close 

		theNameObj = tempdata[Object.keys(tempdata)[1]];
		theNameObjName  = theNameObj[Object.keys(theNameObj)[0]];
		stkName = theNameObjName[1]

		thedrawdata =[closeLst]; //closeLst is already originally an array

		// calculate different ma lines and stuff inside thedrawdata.
		thedrawdata.push(makeMovAve(thedrawdata[0], Math.ceil(intv1/2))); // add new trend line
		thedrawdata.push(makeMovAve(thedrawdata[1], Math.ceil(intv1/2))); // add new trend line
		thedrawdata.push(makeMovAve(thedrawdata[1], intv1));
		thedrawdata.push(makeMovAve(thedrawdata[1], intv2));
		thedrawdata.push(makeMovAve(thedrawdata[1], intv3));
		thedrawdata.push(makeMovAve(thedrawdata[1], intv4));
		thedrawdata.push(makeMovAve(thedrawdata[1], intv5));
		thedrawdata.push(makeMovAve(thedrawdata[1], intv6));
		//thedrawdata.push(makeMovAve(thedrawdata[1], intv7)); // length is width + intv7

		// chop and keep the display data only

		// stddev = makeStd(thedrawdata[0], intv4);
          // addSD = thedrawdata[3].map((a, i) => a + stddev[i]);
          // minusSD = thedrawdata[3].map((a, i) => a - stddev[i]);
		// thedrawdata.push(minusSD);
		// thedrawdata.push(addSD);
		// console.log(Math.max(...addSD))
		// console.log(addSD[0], addSD[(addSD.length-1)])
		// console.log(thedrawdata[0].length)
		// console.log(thedrawdata[1].length)

		//thedrawdata.push(thedrawdata-stddev);
          //console.log(thedrawdata[7])
		thedrawdata[0] = thedrawdata[0].slice(intv7+1);
		thedrawdata[1] = thedrawdata[1].slice(intv7+1);
		thedrawdata[2] = thedrawdata[2].slice(intv7+1);
		thedrawdata[3] = thedrawdata[3].slice(intv7+1);
		thedrawdata[4] = thedrawdata[4].slice(intv7+1);
		thedrawdata[5] = thedrawdata[5].slice(intv7+1);
		thedrawdata[6] = thedrawdata[6].slice(intv7+1);
		thedrawdata[7] = thedrawdata[7].slice(intv7+1);
		thedrawdata[8] = thedrawdata[8].slice(intv7+1);
		//thedrawdata[9] = thedrawdata[9].slice(intv7+1);

		//checkXStatus
		checkXStatus(0, 1)
		checkXStatus(0, 2)
		checkXStatus(1, 2)
		checkXStatus(1, 3)
		checkXStatus(2, 4)
		checkXStatus(2, 5)
		checkXStatus(3, 4)
		checkXStatus(3, 5)
		checkXStatus(4, 5)
		checkXStatus(4, 6)

		//checkUpDn
          $("#minuteStatus").append("<br>");

		checkUpDn(thedrawdata[1], 1)
		checkUpDn(thedrawdata[2], 2)
		checkUpDn(thedrawdata[3], 3)
		checkUpDn(thedrawdata[4], 4)
		checkUpDn(thedrawdata[6], 6)
		checkUpDn(thedrawdata[8], 8)

		// thedrawdata[9] = thedrawdata[9].slice(intv7+1);
		theMax = Math.max(...[].concat.apply([], thedrawdata));
		theMin = Math.min(...[].concat.apply([], thedrawdata));


		// find derivative
		derivative = diff(makeMovAve(thedrawdata[2], 3));
		derivative.unshift(0);
		derivative.fill(null,0,intv1+3); //array.fill(value, start, end)

		// find stoch
		stoch1 = makeStoch(thedrawdata[0], 120)
		stochmax1 = Math.max(...stoch1);
		stochmin1 = Math.min(...stoch1);
		// drawTrend(stoch1, stochmax1, stochmin1, '强弱120');

		// diffaccel
		// diffaccel = thedrawdata[baseSubIdx].map(function(item, index) { return item - thedrawdata[baseMinuIdx][index]; })
		diffaccel = []
		diffaccel.push(thedrawdata[1].map(function(item, index) { return item - thedrawdata[8][index]; }))
		diffaccel.push(thedrawdata[2].map(function(item, index) { return item - thedrawdata[8][index]; }))
		diffaccel.push(thedrawdata[3].map(function(item, index) { return item - thedrawdata[8][index]; }))
		diffaccel.push(thedrawdata[4].map(function(item, index) { return item - thedrawdata[8][index]; }))
		diffaccel.push(thedrawdata[5].map(function(item, index) { return item - thedrawdata[8][index]; }))

		diffaccMax = Math.max(...[].concat.apply([], diffaccel));
		diffaccMin = Math.min(...[].concat.apply([], diffaccel));
		// drawTrend(diffaccel, diffaccMax, diffaccMin, 'accel');

		// ddiffaccel
		ddiffaccel = []
		ddiffaccel.push(diffaccel[0].map(function(item, index) { return item - diffaccel[4][index]; }))
		ddiffaccel.push(diffaccel[1].map(function(item, index) { return item - diffaccel[4][index]; }))
		ddiffaccel.push(diffaccel[2].map(function(item, index) { return item - diffaccel[4][index]; }))
		ddiffaccel.push(diffaccel[3].map(function(item, index) { return item - diffaccel[4][index]; }))

		ddiffaccMax = Math.max(...[].concat.apply([], ddiffaccel));
		ddiffaccMin = Math.min(...[].concat.apply([], ddiffaccel));


		// drawchart
		//drawchart(thedrawdata);
		plotChart(thedrawdata)
		showStatus();
		//showComments();
		detectX();
		detectTrend();
		statusMsg = '<br><span class="cyanword">淺藍</span> ' + thedrawdata[3][lastPtr-1].toFixed(3) + "&emsp;" + 
		'<span class="blueword">深藍</span> ' + thedrawdata[4][lastPtr-1].toFixed(3) + "&emsp;" + 
		'<span class="brownword">橙</span> ' + thedrawdata[5][lastPtr-1].toFixed(3) + "&emsp;" + 
		'<span class="redword">red</span> ' + thedrawdata[6][lastPtr-1].toFixed(3) + "&emsp;" + 
		"<br>commands: c, v, f, b, r, m<br>" + "<r>trend intervals</r>: " + minSteps + " datawidth: "+datawidth+"<br>";
		$("#msg").append(statusMsg);
		$("#refreshTimer").html(minuteLayersTimer/1000 +" sec ");

          // show aasctock chart
          imageCode = theCode
          if(imageCode =="HSI"){imageCode = "110000"}
          if(imageCode =="sh000001"){imageCode = "000001.sh"}
          if(imageCode =="sz399001"){imageCode = "399001.sz"}
          console.log("theStartCode",theStartCode, "imageCode",imageCode)
          document.getElementById("image").innerHTML = '<img src="http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=6&indpara3=9&indpara4=12&indpara5=15&subChart1=3&ref1para1=7&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=7&ref3para1=7&ref3para2=5&ref3para3=0&subChart4=7&ref4para1=11&ref4para2=8&ref3para3=0&subChart5=13&ref4para1=0&ref4para2=0&ref4para3=0&scheme=3&com=100&chartwidth=1400&chartheight=760&stockid='+ imageCode +'&period=6&type=1&logoStyle=1" onclick = \"xunbao(\'' + imageCode + '\')\">'

		window.location = '#minuteChart';
	});
}
	function showComments() {
       cmtCode = theStartCode // use another name not to interfere other parts
       var cmtcodewidth = cmtCode.length
       if(cmtcodewidth <= 5){
         cmtCode = "00000"+cmtCode;
         cmtcodewidth = cmtCode.length;
         cmtCode = cmtCode.slice(cmtcodewidth-5, cmtcodewidth);
       }
       else if(cmtcodewidth == 8){
         cmtCode = cmtCode.slice(2, 8);
       }
       else if(cmtcodewidth == 9){
         cmtCode = cmtCode.slice(0, 6);
       }
       commentName = "j" + cmtCode;
       var CommentListNames = Object.keys(theCommentList); // extract the names from comments
       // to show comments

       if(CommentListNames.includes(commentName)){
         cmtLocation = CommentListNames.indexOf(commentName);
         commentTxt = theCommentList[Object.keys(theCommentList)[cmtLocation]]
       }else{commentTxt = "No data!";}

       //document.getElementById("stkcomments").innerHTML = commentTxt;
	}

	function makeStd(bigArray, intv) {
	     // the intv-1 is correct
          newArray = new Array(intv-1).fill(0)
		newArray = newArray.concat(calcStd(bigArray, intv));
		return newArray
	}

	function calcStd(bigArray, intv) {
		var stdArrar = [];
		for (var i =0 ; i < (bigArray.length-intv+1); i++) {stdArrar[i] = Std(bigArray.slice(i, i+intv));} // points to indicator
		return stdArrar;
	}

	function Std(array) {
	  const n = array.length
	  const mean = array.reduce((a, b) => a + b) / n
	  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
	}


function makeMovAve(bigArray, intv) {
	return bigArray.slice(0, intv-1).concat(calcMovAve(bigArray, intv));
}
function calcAve(aveArray) {
	add = (a, b) =>  a + b;
	return aveArray.reduce(add) / aveArray.length;
}

function calcMovAve(bigArray, intv) {
	var ma = [];
	for (var i =0 ; i < (bigArray.length-intv+1); i++) {
//		ma[i] = calcAve(bigArray.slice(i, i+intv));
		ma[i] = calcWAve(bigArray.slice(i, i+intv));
	}
	return ma;
}
function calcWAve(aveArray) {
	var sum = 0
	for( var i = 1; i <= aveArray.length; i++ ) {
		sum += aveArray[i-1] * i;
	}
	return (sum / ((1 + aveArray.length)*aveArray.length/2))
}

function autoRefresh() {
     setTimeout("location.reload(true);", minuteLayersTimer);
}

function askRefreshTime() {
  var refreshTime = prompt("Enter refresh time(sec):", "");
  if (refreshTime != null && refreshTime != "" && Number(refreshTime) != NaN) {
    localStorage.setItem("minuteLayersTimer", Number(refreshTime * 1000));
    location.reload();
  }
}

	function makeStoch(bigArray, intv) {
	     tempArr = bigArray.slice(0, intv-1).concat(calcStoch(bigArray, intv));
		return tempArr.fill(50,0,intv-1)
	}

	function calcStoch(bigArray, intv) {
		var stc = [];
		for (var i =0 ; i < (bigArray.length-intv+1); i++) {
			stc[i] = calc1Stoch(bigArray.slice(i, i+intv));
		}
		return stc;
	}

	function calc1Stoch(stcArray) {
			stcMax = Math.max(...stcArray)
			stcMin = Math.min(...stcArray)
			lastVal = stcArray[stcArray.length - 1]
			stcRange = stcMax - stcMin
			if(stcRange == 0){
				stcVal = 50
			}else{
				stcVal = 100*(lastVal - stcMin) / stcRange
			}
			return stcVal
	}

function transpose(thisArr) { // Swap rows with columns of a matrix
    return Object.keys(thisArr[0]).map(function(column) {
        return thisArr.map(function(row) { return row[column]; });
    });
}


function detectX(){
// var intv1, intv2, intv3, intv4, intv5, intv6, intv7(intv7 disabled)
// localStorage.stkintv1 = "5"; "10"; "20"; "40"; "80"; "160";
// thedrawdata[0] current data 白綫
// thedrawdata[1] 5 minute 綠綫
// thedrawdata[2] 10 minute 黃綫
// thedrawdata[3] 20 minute 淺藍
// thedrawdata[4] 40 minute 藍綫
// thedrawdata[5] 80 minute 橙綫
// thedrawdata[6] 160 minute 紅綫

//警報情況：白綫上穿 黃綫, 白綫上穿 藍綫, 白綫上穿 橙綫, 白綫上穿 紅綫, 白綫上穿 紫綫, 綠綫 上穿 黃綫, 綠綫 上穿 淺藍, 藍綫 上穿 橙綫, 紅線轉勢, 橙線轉勢, 

//	處理白綫
	curS = thedrawdata[0][thedrawdata[0].length-1] // current data
	prevS = thedrawdata[0][thedrawdata[0].length-2]

	curL = thedrawdata[2][thedrawdata[0].length-1] // the 10 minute
	prevL = thedrawdata[2][thedrawdata[0].length-2]
	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;上穿 黃綫" ,"yellowword")}
	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;下破 黃綫", "yellowword")}

	curL = thedrawdata[4][thedrawdata[0].length-1] // the 5th trend, 40minute
	prevL = thedrawdata[4][thedrawdata[0].length-2]
	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;上穿 藍綫" ,"blueword")}
	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;下破 藍綫", "blueword")}

	curL = thedrawdata[5][thedrawdata[0].length-1]
	prevL = thedrawdata[5][thedrawdata[0].length-2]
	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;上穿 橙綫" ,"orangeword")}
	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;下破 橙綫", "orangeword")}

	curL = thedrawdata[6][thedrawdata[0].length-1]
	prevL = thedrawdata[6][thedrawdata[0].length-2]
	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;上穿 紅綫" ,"redword")}
	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;下破 紅綫", "redword")}

//	curL = thedrawdata[7][thedrawdata[0].length-1]
//	prevL = thedrawdata[7][thedrawdata[0].length-2]
//	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;上穿 紫綫" ,"whiteword")}
//	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;下破 紫綫", "whiteword")}

//	處理綠綫
	curS = thedrawdata[1][thedrawdata[0].length-1] // current data
	prevS = thedrawdata[1][thedrawdata[0].length-2]

	curL = thedrawdata[2][thedrawdata[0].length-1] // the 10 minute
	prevL = thedrawdata[2][thedrawdata[0].length-2]
	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;綠綫 上穿 黃綫" ,"goldword")}
	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;綠綫 下破 黃綫", "goldword")}

	curL = thedrawdata[3][thedrawdata[0].length-1] // the 20 minute
	prevL = thedrawdata[3][thedrawdata[0].length-2]
	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;綠綫 上穿 淺藍" ,"goldword")}
	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;綠綫 下破 淺藍", "goldword")}

//	處理藍綫
	curS = thedrawdata[4][thedrawdata[0].length-1] // current 40minute
	prevS = thedrawdata[4][thedrawdata[0].length-2]

	curL = thedrawdata[5][thedrawdata[0].length-1] // the 6th trend, 80minute
	prevL = thedrawdata[5][thedrawdata[0].length-2]
	if (checkUpX(prevL, prevS, curL, curS)=="UpY"){reportIt("&#x25B2;藍綫 上穿 橙綫" ,"goldword")}
	if (checkDnX(prevL, prevS, curL, curS)=="DnY"){reportIt("&#x25BC;藍綫 下破 橙綫", "goldword")}

//	vol changes
//	

}

function detectTrend(){
	curValue = thedrawdata[6][thedrawdata[0].length-1] // the 20 minute trend
	prevValue = thedrawdata[6][thedrawdata[0].length-2]
	if (curValue >0 &&  prevValue<0){reportIt("&#x25B2;紅線轉上" ,"redword")}
	if (curValue <0 &&  prevValue>0){reportIt("&#x25BC;紅線轉落", "redword")}

	curValue = thedrawdata[5][thedrawdata[0].length-1] // the 20 minute trend
	prevValue = thedrawdata[5][thedrawdata[0].length-2]
	if (curValue >0 &&  prevValue<0){reportIt("&#x25B2;橙線轉上" ,"orangeword")}
	if (curValue <0 &&  prevValue>0){reportIt("&#x25BC;橙線轉落", "orangeword")}
}

//	alarm function:
function reportIt(alarmMsg, color){
//	record
//	set color, on msg div, with time and date, up cross (down cross) trigger value is: , present value
	alarmM = alarmMsg
	alarmM = '<span class="' + color + '">' + alarmM + ', </span>'
	$("#msg").append(alarmM);
//	alert(alarmMsg);
//	document.getElementById('alarmPt').play();

//	document.getElementById('audioPop').src = 'https://gget.it/u1urz3zh/popsound.mp3';
//	document.getElementById('audioPop').load();
//	document.getElementById('audioPop').play();
//	alert(alarmMsg);
//	beep(60,620,200);
//	setTimeout(function(){ beep(60,550,200); }, 50);

//	alarmSound.play();
//	navigator.vibrate([500]);
}


//	comparison:
//	up cross
function checkUpX(prevL, prevS, curL, curS){
	if ((prevL==prevS) || (curS == curL )){return "critical"}

	if ((prevL>prevS) && (curS > curL )){return "UpY"
	} else {return "UpN"}
}
//	down cross
function checkDnX(prevL, prevS, curL, curS){
	if ((prevL==prevS) || (curS == curL )){
		return "critical"
	}

	if ((prevL<prevS) && (curS < curL )){
		return "DnY"
	} else {
		return "DnN"
	}
}

function chkKey() {
	var testkey = getChar(event);
	if(testkey == '\\'){        
        prevcode = localStorage.getItem("previousCode")
        changeCode(prevcode);
     }
	if(testkey == 'c'){askCode();}
     if(testkey == '0'){storeCode('sh000001');changeStkCode('sh000001');}
     if(testkey == '3'){storeCode('sz399001');changeStkCode('sz399001');}
     if(testkey == '1'){storeCode('HSI');changeStkCode('HSI');}
     if(testkey == '2'){storeCode('02013');changeStkCode('02013');}
     if(testkey == '4'){storeCode('01766');changeStkCode('01766');}
     if(testkey == '5'){storeCode('02009');changeStkCode('02009');}
     if(testkey == '6'){storeCode('01186');changeStkCode('01186');}
     if(testkey == '7'){storeCode('00788');changeStkCode('00788');}
     if(testkey == '8'){storeCode('00308');changeStkCode('00308');}
     if(testkey == '9'){storeCode('00390');changeStkCode('00390');}
     if(testkey == 'a'){storeCode('00388');changeStkCode('00388');}
     if(testkey == 's'){storeCode('00700');changeStkCode('00700');}
     if(testkey == 'D'){window.location = '#image';}
     if(testkey == 'd'){storeCode('02800');changeStkCode('02800');}
	if(testkey == 'f'){storeCode('09988');changeStkCode('09988');}
	if(testkey == 'g'){storeCode('00981');changeStkCode('00981');}
	if(testkey == 'v'){sCt(theStartCode);}

     if(testkey == 'w'){window.scrollTo(0,0);}
     if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}

     if(testkey == ','){window.open("mlinechart.html");}
     if(testkey == '"'){window.open("mline11Minutechart.html");}
     if(testkey == "'"){window.open("swipeChart.html");}
     if(testkey == '.'){localStorage.setItem("randomcode", thecode); window.open("mlineMinutechart.html");}

     if(testkey == 'X'){storeCode(theCode); window.open("Random Charts.html");}
	if(testkey == 'b'){jpback();}
	// if(testkey == 'B'){baseIdx();}
	if(testkey == 'T'){jpTop();}
	if(testkey == 'I'){fullinit();}
	//if(testkey == 'R'){jprandom();}
     if(testkey == 'R'){askRefreshTime();} // change RefreshTime period

	if(testkey == 't'){window.scrollTo(0,0);}
	if(testkey == 'w'){askWidth();}
	if(testkey == 'i'){chgInterval();}
	if(testkey == 'z'){toggleMinPeriod();}
	if(testkey == 'l'){askList()}
	if(testkey == 'q'){qList()}

	if(testkey == 'j'){chgIntv(120);}
	if(testkey == 'k'){chgIntv(10);}

     if(testkey == 'r'){
       localStorage.setItem("randomcode", theCode);
       window.open('Random Charts.html');
     }
     if(testkey == 'Z'){
       thecode = localStorage.getItem("randomcode");
       localStorage.setItem("stkCode", thecode);
       window.open("minBor.html", "_blank");
     }
}

function getChar(event) {
	if (event.which!=0 && event.charCode!=0) {
       return String.fromCharCode(event.which)
     } else {
       return null
     }
}

function newChart() {
		var thecode = prompt("Code Number:", "");
		if (thecode != null && thecode != "") {changeStkCode(thecode);}
}

function showTime() {
	let d = new Date();
	let secs=d.getSeconds();
	let mins=d.getMinutes();
	let hr=d.getHours();
	let timemsg=FormatNumberLength(hr) +":" + FormatNumberLength(mins) + ":"+ FormatNumberLength(secs)
	return(timemsg)
}

function FormatNumberLength(num) {
		let r = "" + num;
		while (r.length < 2) { r = "0" + r;}
		return r;
}


function drawchart(thedrawdata) {
     // datatips = thedrawdata[0].map(item => Math.round(item * 1000) / 1000)
     // datatips = datatips.map(String)
	RGraph.reset(document.getElementById('cvs'));
	line = new RGraph.Line({
		id:'cvs', data:thedrawdata,
		options: {
			title: showTime()+" " + showDate()+". " + theStartCode + " " + stkName + " 分钟层 ~p1: " + intv1+ "  ~w: "+ datawidth + ", ~C: "+ closeLst[closeLst.length-1] ,
			titleColor: 'grey', 
			titleSize: 16,
			colors: chartColor, scaleDecimals: 2,
			backgroundGrid: true, axisColor: '#864', textColor: '#ccc', numxticks: 0,
               tickmarks: 'plus',

//			tickmarks: '', 
//			xaxis: false, xaxisTickmarks : false, xaxisTickmarksLength: 0,
			tickmarksDotLinewidth: 0,ticksize: 1, 
			linewidth: 1,

			ymax: theMax, ymin: theMin,
//			labels: dateLst,
			spline: false, shadow: false,
               // tooltips: datatips,
			backgroundGridColor: '#002010', backgroundGridVlines: false,
			gutterLeft: 0, gutterRight: 50, gutterTop: 25, gutterBottom: 25
		}
	}).trace();

		yminpct = 100 - (theMax-theMin)*100/theMax,
		ymaxpct = 100,

          yaxis1 = new RGraph.Drawing.YAxis('cvs', 1250)
                .Set('colors', ['gold'])
                .Set('text.color', 'gray')
                .Set('text.size', 8)
                .Set('max', ymaxpct)
                .Set('min', yminpct)
                .Set('linewidth', 2)
                .Set('tickmarkslength', 5)
                .Set('title', '% pct')
                .Draw();

};


function drawTrend(therange,maxValue, minValue, chartID) {
   // dataTooltips = therange.map(item => Math.round(item * 1000) / 1000)
   // dataTooltips = dataTooltips.map(String)
   RGraph.reset(document.getElementById(chartID));
   line = new RGraph.Line({
   	id:chartID, data:therange,
   	options: {
   		title: chartID + ", "+theStartCode + " " + stkName,
			titleColor: 'grey', 
			titleSize: 10,
   		backgroundGrid: true, axisColor: '#864', textColor: '#ccc',
   		colors: chartColor,
		numxticks: 0, colors: chartColor, scaleDecimals: 2,
   		tickmarksDotLinewidth: 0,ticksize: 1, linewidth: 1, 
          tickmarks: 'plus',
   		ymax: maxValue, ymin: minValue,
   		spline: false, shadow: false,
          // tooltips: dataTooltips,
   		backgroundGridColor: '#001000', backgroundGridVlines: false,
   		gutterLeft: 0, gutterRight: 50, gutterTop: 25, gutterBottom: 25
   	}
   }).trace();

		trendyminpct = 100 - (maxValue-minValue)*100/maxValue,
		trendymaxpct = 100,

          trendyaxis1 = new RGraph.Drawing.YAxis(chartID, 1250)
                .Set('colors', ['gold'])
                .Set('text.color', 'gray')
                .Set('text.size', 8)
                .Set('max', trendymaxpct)
                .Set('min', trendyminpct)
                .Set('linewidth', 2)
                .Set('tickmarkslength', 5)
                .Set('title', '% pct')
                .Draw();
};

function diff(arr) {
  return arr.slice(1).map(function(n, i) { return n - arr[i]; });
}

function askCode() {
	var thecode = prompt("Code Number (5 digits):", "");
     changeCode(thecode)
}
function askList() {
	var theList = prompt("set temp stkList, Number (5 digits) sep by space： ", "");
	if (theList != null && theList != "") {
		if (theList != "HSI") {
             localStorage.setItem("stkListArr", theList);
             stkList = theList.split(" ");
          }
	}
}

function storeCode(thecode) {
	if(typeof(Storage) !== "undefined") {
		localStorage.otherCode = thecode;
		localStorage.setItem("randomcode", thecode)
	}
}
function _init() {
	if (localStorage.getItem("otherCodeshowWidth") === null) { fullinit() }
}
function fullinit() {
		localStorage.otherCode = "HSI";
		intvB = 30
		intv1 = intvB *1
 		intv2 = intvB *2
 		intv3 = intvB *3
 		intv4 = intvB *4
 		intv5 = intvB *5
 		intv6 = intvB *6
 		intv7 = intvB *7
		localStorage.otherCodeshowWidth = "1350";

		localStorage.setItem("otherCode","HSI");
          minSteps = [intv1,intv2,intv3,intv4,intv5,intv6,intv7];
          localStorage.setItem("minSteps", JSON.stringify(minSteps));
		localStorage.setItem("otherCodeshowWidth","1350");
		alert("full init: HSI," + minSteps)
}
function initdata() {
	// theCode = localStorage.otherCode; // changed to align with random chart
	theCode = localStorage.randomcode;
	if(localStorage.minSteps !== undefined) {
	  minSteps = JSON.parse(localStorage.getItem("minSteps"));
	  intv1 = parseInt(minSteps[0]);
	  intv2 = parseInt(minSteps[1]);
	  intv3 = parseInt(minSteps[2]);
	  intv4 = parseInt(minSteps[3]);
	  intv5 = parseInt(minSteps[4]);
	  intv6 = parseInt(minSteps[5]);
	  intv7 = parseInt(minSteps[6]);
	}else{fullinit();}

	showWidth = Number(localStorage.otherCodeshowWidth);
	datawidth = showWidth + intv6;
	$("#minuteStatus").html("");
}

function askWidth() {
	var theWidth = prompt("Chart Width:", "");
	if (theWidth != null && theWidth != "") {
		showWidth = parseInt(theWidth);
		localStorage.otherCodeshowWidth = showWidth;
		localStorage.setItem("otherCodeshowWidth",showWidth);
		datawidth = showWidth + intv6;
		changeStkCode(theCode);
	}
}

function chgInterval() {
	var baseStep = prompt("Base period:", intv1);
	if (baseStep != null && baseStep != "") {
          baseStep = Number(baseStep);
          minSteps = [baseStep, baseStep*2, baseStep*3, baseStep*4, baseStep*5, baseStep*6, baseStep*7]
          localStorage.setItem("minSteps", JSON.stringify(minSteps));
		window.location.reload(true);
		}
}
function chgIntv(newIntv) {
          newIntv = Number(newIntv);
          minSteps = [newIntv, newIntv*2, newIntv*3, newIntv*4, newIntv*5, newIntv*6, newIntv*7]
          localStorage.setItem("minSteps", JSON.stringify(minSteps));
		window.location.reload(true);
}
function baseIdx(newIntv) {
		var baseSubIdx = prompt("to subtract line number(1-7):", "");
		var baseMinuIdx = prompt("to be subtracted line number(2-8):", "");

          baseSubIdx = Number(baseSubIdx);
          baseMinuIdx = Number(baseMinuIdx);
          if(baseSubIdx>0 &baseSubIdx<8 & baseMinuIdx>1 & baseMinuIdx<9){
            subtractIdx = [baseSubIdx, baseMinuIdx]
            localStorage.setItem("subtractIdx", JSON.stringify(subtractIdx));
		  window.location.reload(true);
		}
}

function toggleMinPeriod() {
 	if (intv1 == 10) { minSteps = [20,30,40,50,60,70,80];}
     else{ minSteps = [10,20,40,80,160,320,640];}
     localStorage.setItem("minSteps", JSON.stringify(minSteps));
     window.location.reload(true);
}

function FormatNumberLength5(num) {
    var r = "" + num;
    while (r.length < 5) {
        r = "0" + r;
    }
    return r;
}

var stkList = localStorage.getItem("stkListArr").split(' ');

function jpTop() {
	theCode = stkList[0]
	storeCode(theCode);
	changeStkCode(theCode);
}

function jpforward() {
	if (stkPointer < stkList.length-1) {
		stkPointer = stkPointer + 1;
	} else {
		stkPointer = 0;
	}

	theCode = stkList[stkPointer]
	storeCode(theCode);

	changeStkCode(stkList[stkPointer]);
}

function jpback() {
	if (stkPointer > 0) {
		stkPointer = stkPointer - 1;
	} else {
		stkPointer = stkList.length-1;
	}
	theCode = stkList[stkPointer]
	storeCode(theCode);
	changeStkCode(stkList[stkPointer]);
}
function jprandom() {
	var newPoint = Math.floor(Math.random() * (stkList.length-1))
	theCode = stkList[newPoint]
	storeCode(theCode);
	changeStkCode(theCode);
	stkPointer = newPoint;
}
function changeCode(thecode) {
		if (thecode != "HSI") { thecode = FormatNumberLength5(thecode);}
          localStorage.setItem("previousCode", theCode) // this is prev code
		theCode = thecode
		storeCode(thecode);
		changeStkCode(thecode);
}
function toggleButton() {
    document.getElementById('myDropdown').classList.toggle('show');
}
function qList() {
    stkList = myfavorList.split(' ');
    alert("changed list: " + stkList.length + "\ndetails see end of this page.\nremember to modify mustadd list!")
    $("#listMsg").text("stkList Total: " + stkList.length + "\n"+stkList);

}

function assignList(){
  newList = eval(document.getElementById("selectList").value).split(" ");
  stkList = newList;
  localStorage.setItem("stkListArr", newList)

  // console.log(newList)

  document.getElementById("listMsg").focus();
  alert(" Total: " + stkList.length + "\ndetails see end of this page.\nremember to modify mustadd list!\n" + newList)
        $("#listMsg").text("Total: " + stkList.length + "\n"+stkList);
  $('#selectList').blur()

}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function sCt(stkcode) {
  if(stkcode == "HSI"){stkcode = "110000"}
  imgHead = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=20&indpara2=2&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1050&chartheight=690&stockid=";
  imgHead2 = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=6&indpara3=12&indpara4=24&indpara5=48&subChart1=3&ref1para1=12&ref1para2=26&ref1para3=9&subChart2=2&ref2para1=14&ref2para2=0&ref2para3=0&scheme=3&com=100&chartwidth=1050&chartheight=600&stockid=";


  imgPCode= "&period=";
  imgTail="&type=1&logoStyle=1'><br>";

  // 5000, 5007, 5012, 1, 2, 3, 4, 6, 7, 9, 10, 12, 14, 16, 17, 18
  intv = [2, 3, 4, 1, 5012, 5007, 5000, 7, 11, 12];
  var imgWindow = window.open("");
  newshead = "http://www.aastocks.com/tc/stocks/analysis/stock-aafn/"
  newstail = "/0/all/1"
  newsStr = newshead + stkcode + newstail
  imgAdr = "<style>body { background-color: black; color: green} a { text-decoration: none; color: #28B8B8;}</style><body><center>" +"<a href='" + newsStr + "' target = _blank>" + stkcode + "<br>" 

  for( var imgPeriod = 0; imgPeriod < intv.length; imgPeriod++){
    imgAdr = imgAdr + imgHead + stkcode + imgPCode + intv[imgPeriod] + imgTail + imgHead2 + stkcode + imgPCode + intv[imgPeriod] + imgTail;
  };
  imgWindow.document.write(imgAdr);
}

function showStatus() {
	lastPtr = thedrawdata[0].length-1
     closeValue = thedrawdata[2][lastPtr]*100
     prevPt = lastPtr-1
	theStr = //thedrawdata[0] is the close value
	"<span class='yellowword'>C " + thedrawdata[0][lastPtr].toFixed(3) + "</span>&emsp;" +
	"<span class='yellow'>" + 
     (thedrawdata[0][lastPtr]-thedrawdata[0][lastPtr-1]).toFixed(3) + "&emsp;" + "c% "+
     ((thedrawdata[0][lastPtr]/thedrawdata[0][lastPtr-1])*100-100).toFixed(1) + "&emsp;" + 
	"<span class='cyan'>ss " + ((closeValue/thedrawdata[3][lastPtr])-100).toFixed(1) + "&emsp;" + 
	"(sd " + (100*(thedrawdata[3][lastPtr]-thedrawdata[3][prevPt])/thedrawdata[3][prevPt]).toFixed(1) + ")</span>&emsp;" + 

	"<span class='blue'>sm " + ((closeValue/thedrawdata[4][lastPtr])-100).toFixed(1) + "&emsp;" + 
	"(md " + (100*(thedrawdata[4][lastPtr]-thedrawdata[4][prevPt])/thedrawdata[4][prevPt]).toFixed(1) + ")</span>&emsp;" + 

	"<span class='brown'>sl " + ((closeValue/thedrawdata[6][lastPtr])-100).toFixed(1) + "&emsp;" + 
	"(ld " + (100*(thedrawdata[6][lastPtr]-thedrawdata[6][prevPt])/thedrawdata[6][prevPt]).toFixed(1) + ")</span>&emsp;" + 

//	"ma4 " + thedrawdata[6][lastPtr].toFixed(toFixedLen) + 
	"%<br>";
 
 
	finalString = 'Report: <span class="redword">' + '<span onclick=sCt("' + theStartCode + '")>' + showTime()+" " + showDate() +'</span>' + "</span>&emsp;" + theStr

	$("#msg").html("");
	$("#msg").html(finalString);
}

      function plotChart(thedrawdata) {
        traceLine1 = { type: 'scatter', y: thedrawdata[0], name: 'L0',
                      line: { color: '#f00', width: 1 } };
        traceLine2 = { type: 'scatter', y: thedrawdata[1], name: 'L1',
                      line: { color: '#d80', width: 1 } };
        traceLine3 = { type: 'scatter', y: thedrawdata[2], name: 'L2',
                      line: { color: '#da0', width: 1 } };
        traceLine4 = { type: 'scatter', y: thedrawdata[3], name: 'L3',
                      line: { color: '#838', width: 1 } };
        traceLine5 = { type: 'scatter', y: thedrawdata[4], name: 'L4',
                      line: { color: '#b44', width: 1 } };
        traceLine6 = { type: 'scatter', y: thedrawdata[5], name: 'L5',
                      line: { color: '#a56', width: 1 } };
        traceLineA = { type: 'scatter', y: thedrawdata[6], name: 'L6',
                      line: { color: '#000', width: 1 } };
        traceLineM = { type: 'scatter', y: thedrawdata[7], name: 'L7',
                      line: { color: '#000', width: 1 } };
        traceLineA4 = { type: 'scatter', y: thedrawdata[8], name: 'L8',
                      line: { color: '#000', width: 2 } };

        plotdata = [traceLine1,traceLine2,traceLine3,traceLine4,traceLine5,traceLine6,traceLineA,traceLineM,traceLineA4];
        layout = { title: theStartCode + " " + stkName};
        Plotly.newPlot('plotlychart', plotdata, layout);
      }

      function checkX(prevL, prevS, curL, curS) {
		if (curS == curL){return "critical" }
		if (((prevL == prevS) && (curS > curL )) || ((prevL>prevS) && (curS > curL ))){
            uXSound.play();
            return "<span class='redrose'>UpCross</span>"
          }
		if (((prevL == prevS) && (curS < curL )) || ((prevL<prevS) && (curS < curL ))){
            dXSound.play();
            return "<gr>DownCross</gr>"
          }
		if ((prevL<prevS) && (curS > curL )){return '<span class="brownword">cont.Up</span>' } // c must > prevC, this is not correct, further check for condition
		if ((prevL>prevS) && (curS < curL )){return '<span class="limeword">cont.Dn</span>' }
      }

      // checkXStatus(shortlineNum, longlineNum)
      function checkXStatus(shortlineNum, longlineNum){
        lastpt = thedrawdata[shortlineNum].length-1
        bflastpt = thedrawdata[shortlineNum].length-2

        curS = thedrawdata[shortlineNum][lastpt] // the short line
        prevS = thedrawdata[shortlineNum][bflastpt]
        curL = thedrawdata[longlineNum][lastpt] // the long line
        prevL = thedrawdata[longlineNum][bflastpt]

        checkXMsg = " <k> M" + shortlineNum + "XM" + longlineNum +"</k> "+checkX(prevL, prevS, curL, curS)
        $("#minuteStatus").append(checkXMsg);
      }

      // checkUpDn(linedata, lineNum)
      function checkUpDn(linedata, lineNum){
        lastpt = linedata.length-1
        bflastpt = linedata.length-2

        curValue = linedata[lastpt]
        prevValue = linedata[bflastpt]
        if(curValue > prevValue){
          upDnMsg = "<y> L " + lineNum + "</y><r> Up</r>"
        }else if(curValue < prevValue){
          upDnMsg = "<y> L " + lineNum + "</y><lg> Dn</lg>"
        }else{
          upDnMsg = "<y> L " + lineNum + "</y><dg>--</dg>"
        }
        $("#minuteStatus").append(upDnMsg);
      }

//for(let i = 0; i<5; i++){
//	RGraph.reset(document.getElementById('cvs'));
//	setTimeout(changeStkCode(stkList[i]),25000);
//}
_init();
initdata();
console.log("theCode "+theCode)
changeStkCode(theCode);

