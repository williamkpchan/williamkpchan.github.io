allowtoplaysound = false
var uXSound = new Audio('./mp3/toneBeep.mp3'); 
var dXSound = new Audio('./mp3/lowBeep.mp3'); 

// format WeekDay
function formatWeekDay(element) {
    dayStr = element.replace(/<.*?>/gi, "") // clean span tags
    dayStr = dayStr.substr(0,6)
    dayStr = convertWeekday(dayStr)
    return(dayStr + " " + element + "<br>")
}

// convert date string to weekday
function parse(str) {
    str = "20" + str
    var y = str.substr(0,4), m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    var D = new Date(y,m,d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
}

function convertWeekday(str) {
    return ["SUN","MON","TUE","WED","THU","FRI","SAT"][parse(str).getDay()]
}

function diff(arr) {
      return arr.slice(1).map(function(n, i) { return n - arr[i]; });
}

function storeCode(theCode) {
        if(typeof(Storage) !== "undefined") {
            localStorage.randomcode = theCode;
        }
}

function FormatNumberLength5(num) {
        var r = "" + num;
        while (r.length < 5) { r = "0" + r; }
        return r;
}

function makeMovAve(bigArray, intv) {
	     // the intv-1 is correct
		return bigArray.slice(0, intv-1).concat(calcMovAve(bigArray, intv));
}

function calcAve(aveArray) {
		add = (a, b) =>  a + b;
		return aveArray.reduce(add) / aveArray.length;
}
	
function calcMovAve(bigArray, intv) {
		var ma = [];
		for (var i =0 ; i < (bigArray.length-intv+1); i++) {ma[i] = calcWAve(bigArray.slice(i, i+intv));} // points to indicator
		return ma;
}

function calcWAve(aveArray) {
		var sum = 0
		for( var i = 1; i <= aveArray.length; i++ ) {
			sum += aveArray[i-1] * i;
		}
		return (sum / ((1 + aveArray.length)*aveArray.length/2))
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

function transpose(thisArr) { // Swap rows with columns of a matrix
	    return Object.keys(thisArr[0]).map(function(column) {
	        return thisArr.map(function(row) { return row[column]; });
	    });
}

function checkX(prevL, prevS, curL, curS) {
		if (curS == curL){return "level" }
		if (((prevL == prevS) && (curS > curL )) || ((prevL>prevS) && (curS > curL ))){
            if (allowtoplaysound){uXSound.play(); }
            return "<span class='redrose'>UpCross</span>"
          }
		if (((prevL == prevS) && (curS < curL )) || ((prevL<prevS) && (curS < curL ))){
            if (allowtoplaysound){dXSound.play(); }
            return "<gr>DownCross</gr>"
          }
		if ((prevL<prevS) && (curS > curL )){return '<span class="brownword">cont.Up</span>' } // c must > prevC, this is not correct, further check for condition
		if ((prevL>prevS) && (curS < curL )){return '<span class="limeword">cont.Dn</span>' }
}


// checkRptMsg(shortline, longline, shortlineNum, longlineNum)
function checkRptMsg(shortline, longline, shortlineNum, longlineNum){
        lastpt = shortline.length-1
        bflastpt = shortline.length-2

        curS = shortline[lastpt] // the short line
        prevS = shortline[bflastpt]
        curL = longline[lastpt] // the long line
        prevL = longline[bflastpt]

        XMsg = " <k> M" + shortlineNum + "XM" + longlineNum +"</k> "+checkX(prevL, prevS, curL, curS)
        $("#RptMsg").append(XMsg);
}

// checkUpDn(linedata, lineNum)
function checkUpDn(linedata, lineNum){
        lastpt = linedata.length-1
        bflastpt = linedata.length-2

        curValue = linedata[lastpt]
        prevValue = linedata[bflastpt]
        if(curValue > prevValue){
          upDnMsg = "<k> L</k> " + lineNum + "<r>Up</r>"
        }else if(curValue < prevValue){
          upDnMsg = "<k> L</k> " + lineNum + "<lg>Dn</lg>"
        }else{
          upDnMsg = "<k> L</k> " + lineNum + "<dg>--</dg>"
        }
        $("#RptMsg").append(upDnMsg);
}

function compLines(lshortValue, llongValue, LshortNum, LlongNum){
        if(lshortValue > llongValue){
          upDnMsg = " L" + LshortNum + "<r>></r>" + "L" + LlongNum
          $("#StkStatus").append(upDnMsg);
          return ">"
        }else if(lshortValue < llongValue){
          upDnMsg = " L" + LshortNum + "<lg><</lg>" + "L" + LlongNum
          $("#StkStatus").append(upDnMsg);
          return "<"
        }else{
          upDnMsg = " L" + LshortNum + "<dg>--</dg>" + "L" + LlongNum
          $("#StkStatus").append(upDnMsg);
          return "--"
        }
}

function compHMLC(curH, prevH, curM, prevM, curL, prevL, curC, prevC, stkName, theCode){
        compMsg = " - H"+compVal(curH, prevH)+"pH,"
        compMsg = compMsg + " M"+compVal(curM, prevM)+"pM,"
        compMsg = compMsg + " L"+compVal(curL, prevL)+"pL,"
        compMsg = compMsg + " C"+compVal(curC, prevC)+"pC,"
        return compMsg
}
function compVal(curV, prevV){
        if(curV > prevV){
          return "<r>></r>"
        }else if(curV < prevV){
          return "<gr><</gr>"
        }else{
          return "="
        }
}

function passExam(highLst, midLst, lowLst, closeLst, amtLst) {
        prevdayAmt = amtLst[amtLst.length-2] // previous day
        // console.log("prevdayAmt: ", prevdayAmt)
        // if(prevdayAmt>5000){  // to filter min amt
              // console.log("prevdayAmt in if: ", prevdayAmt)

              curlow = lowLst[lowLst.length-1]
              prevlow = lowLst[lowLst.length-2]
              lowdiff = curlow - prevlow

              curhigh = highLst[highLst.length-1]
              prevhigh = highLst[highLst.length-2]
              highdiff = curhigh - prevhigh

              curmid = midLst[midLst.length-1]
              prevmid = midLst[midLst.length-2]
              middiff = curmid - prevmid

              curclose = closeLst[closeLst.length-1]
              prevclose = closeLst[closeLst.length-2]
              closediff = curclose - prevclose

              // chk Low tup, tdn
              // chk High tup, tdn
              // chk pLWAv%, L-WAv%

              if(lowdiff>0 && highdiff>0 && middiff>0 && closediff>0 ){
                  return "pass"
              }else{
                  return "fail"
              }
          //}
}

function storeBatchList() {
    var stktype = Number(prompt("Select Number:", "1 M0uXM1, 2 M1XM2, 3 M2XM3, 4 M3XM4, 5 M0ContUpM1, 6 M0XM4"))
    if(stktype == 1){
      cleanNStore($("#M0uXM1").text())
    }else if(stktype == 2){
      cleanNStore($("#M1XM2").text())
    }else if(stktype == 3){
      cleanNStore($("#M2XM3").text())
    }else if(stktype == 4){
      cleanNStore($("#M3XM4").text())
    }else if(stktype == 5){
      cleanNStore($("#M0ContUpM1").text())
    }else if(stktype == 6){
      cleanNStore($("#M0XM4").text())
    }
}
function cleanNStore(cleantype) {
    myArray = cleantype.split(" ");
    myArray = myArray.map(item => item.split(' ')[0]).join(' ') // join to one string, space separated
    localStorage.setItem("batchMinuteStatusCheck", myArray)
}

function xunbao(xunbaocode) {
       localStorage.setItem("randomcode", xunbaocode)
       localStorage.setItem("otherCode", xunbaocode)
       localStorage.setItem("stkCode", xunbaocode)

       window.open("Random Charts.html");
       // locs = ["HIghLowTrend.html", "Random Charts.html", ]
       //  window.open("HIghLowTrend.html")
}

function calcCurAmtPosition(amtArray) {
     console.log(amtArray.length)
     amtavg = averageOfLastTen(amtArray);
     console.log(amtavg)
     amtArray = amtArray.slice(amtArray.length - 10)
     console.log(amtArray)
     curAmtPosition = Math.round((amtArray[amtArray.length-1] / amtavg)*100)
     if(curAmtPosition>100){
          curAmtPosition = "<y>"+curAmtPosition+"</y>"
     }
     console.log(curAmtPosition)
}

     function averageOfLastTen(arr) {
         // Check if the array has at least 10 elements
         if (arr.length < 10) {
             throw new Error("Array must have at least 10 elements");
         }

         // Slice the last 10 elements
         const lastTen = arr.slice(-10);

         // Calculate the sum of the last 10 elements
         const sum = lastTen.reduce((acc, val) => acc + val, 0);

         // Calculate the average
         const average = sum / 10;
         return average;
     }

