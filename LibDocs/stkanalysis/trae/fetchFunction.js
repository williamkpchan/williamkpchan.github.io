let dataArray

async function collectUrl(theCode) {
 const theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,42,qfq';

 try {
  const response = await fetch(theurl);
  if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  const jsonStr = text.replace('kline_dayqfq=', '');
  const stkdata = JSON.parse(jsonStr);

  if (stkdata.code === 0) {
   return stkdata.data[`hk${theCode}`].qfqday;
  } else {
   throw new Error(`Request failed with error: ${stkdata.msg}`);
  }
 } catch (error) {
  console.error('There was a problem with the fetch operation:', error);
  return null;
 }
}

// Usage:
async function main() {
 try {
  const somedata = await collectUrl("01951");
  if (somedata && somedata.length > 0) {
   for (let i = 0; i < somedata.length; i++) {
    console.log(somedata[i]);
   }
   // Extract first column (dates) into dateObj
   const dateObj = somedata.map(row => row[0]);
   console.log('Dates:', dateObj);
  } else {
   console.log("No data received");
  }
 } catch (error) {
  console.error('Error:', error);
 }
}

main();

thecode ="";
var pointer;
urladdr = "";

// load localStorage.randomcode
var url_string = location.href;
paramsArray = url_string.split('?')  // note this has changed to array
paramsArray.shift()
if(paramsArray.length!=0){
  thecode = paramsArray[0]; // paramsArray is still array
      localStorage.setItem("randomcode", thecode)
      localStorage.setItem("stkCode", thecode)

} else{
    if (localStorage.getItem("randomcode") === null) {
      localStorage.randomcode = "07500";
    } else{
      thecode = localStorage.getItem("randomcode");
    }
}

      var options = '';  // build the List select option
      for (var i = 0; i < allListNames.length; i++) {
         options += '<option value="' + allListNames[i]+ '">' + allListNames[i] + '</option>';
      }
      $("#selectList").html(options);

function shuffle() {
 var listlen = stkChartList.length, j = 0, temp;

 while (listlen--) {
  j = Math.floor(Math.random() * (listlen+1));

  temp = stkChartList[listlen];
  stkChartList[listlen] = stkChartList[j];
  stkChartList[j] = temp;
 }
}

function showSTKChart() {
  document.querySelector('#stkChartsLeft').innerHTML = remainChtNo;
  sSCt(thecode);
  showTO(thecode);
  $('#filterMarkers').text("")
  if(screen.width < 560){ $('img').css('width','100%'); }

  document.querySelector('#jumpButton').focus();

}

function jpTo0() {
    pointer = 0;
    jpto(pointer);
}

function jpButClick() {
  var jpBut = document.querySelector('#jumpButton');
   //console.log("\nbefore jump ",remainChtNo);

  if ((pointer >= 0) &(pointer < (stkChartList.length-1))){
    pointer = pointer + 1;
  }else {
    pointer = 0;
  }
  remainChtNo = pointer+1
  localStorage.setItem("randomcode", thecode)
  jpto(pointer);
}

function jpback() {
  if ((pointer > 0) &(pointer < (stkChartList.length))){
    pointer = pointer - 1;
  }else {
    pointer = stkChartList.length-1;
  }
  remainChtNo = pointer +1
  localStorage.setItem("randomcode", thecode)
  jpto(pointer);
}
function jpto(pointer) {
    //console.log("pointer is ",pointer);
    thecode = stkChartList[pointer];
    localStorage.setItem("randomcode", thecode)
    showSTKChart();
}
function randomFlip() {
    remainChtNo = Math.floor(Math.random() * stkChartList.length);
    thecode = stkChartList[remainChtNo];
    localStorage.setItem("randomcode", thecode)
    showSTKChart();
}

    function myfavor() {
        myfavorLst = mychips.split(" ");
        stkChartList = myfavorLst;
        alert("MyfavorLst Total: " + myfavorLst.length + "\ndetails see end of this page.\nremember to modify mustadd list!")
        $("#message").text("myfavorLst Total: " + myfavorLst.length + "\n"+stkChartList);
    }
    function usebig20List() {
        myfavorLst = big20List.split(" ");
        stkChartList = myfavorLst;
        alert("big20List Total: " + stkChartList.length + "\ndetails see end of this page.\nremember to modify mustadd list!")
        $("#message").text("big20List Total: " + stkChartList.length + "\n"+stkChartList);
    }

    function usequickCodeList() {
        stkChartList = quickCodeList;
        alert("quickCodeList Total: " + quickCodeList.length + "\ndetails see end of this page.\nremember to modify mustadd list!")
        $("#message").text("quickCodeList Total: " + quickCodeList.length + "\n"+stkChartList);
    }

let timeoutId;
//let period = localStorage.getItem('timeoutPeriod');
let period = 60000;

// Function to refresh the page
function refreshPage() {
    location.reload(); // Reload the page
}

// Function to prompt for a new period and save it in localStorage
function changePeriod() {
    newPeriod = prompt('Enter the new period in seconds:', 60);
    if (newPeriod) {
        newPeriod = parseInt(newPeriod)*1000;
        if(newPeriod<15000){newPeriod = 15000}
        localStorage.setItem('timeoutPeriod', newPeriod);
        period = newPeriod
        clearTimeout(timeoutId); // Clear the existing timeout
        timeoutId = setTimeout(refreshPage, period); // Set a new timeout with the updated period
    }
}

// Start the initial timeout
timeoutId = setTimeout(refreshPage, period);

function chkKey() {
  var testkey = getChar(event);
  if(testkey == '0'){changeCode('000001.sh');}
  else if(testkey == '3'){changeCode('399001.sz');}
  else if(testkey == '\\'){changeCode('399006.sz');}
  else if(testkey == '1'){changeCode('110000');}
  else if(testkey == '2'){changeCode('00388');}
  else if(testkey == '4'){changeCode('01766');}
  else if(testkey == '5'){changeCode('02009');}
  else if(testkey == '6'){changeCode('01186');}
  else if(testkey == '7'){changeCode('28647');}
  else if(testkey == '8'){changeCode('00308');}
  else if(testkey == '9'){changeCode('00390');}

  else if(testkey == 'T'){window.scrollTo(0,document.body.scrollHeight);}
  else if(testkey == 'b'){window.open("HourBor.html#daychart", "_blank");}
  else if(testkey == 'c'){askforCode();}
  else if(testkey == 'C'){window.open("allChartsBor.html", "_blank");}
  else if(testkey == 'f'){window.location = '#boll';;}
  else if(testkey == '.'){localStorage.setItem("randomcode", thecode); window.open("mlineMinutechart.html");}

  else if(testkey == 'a'){window.location = '#imgp0';}
  else if(testkey == 's'){window.location = '#imgp2';}
  else if(testkey == 'd'){window.location = '#imgp4';}
  else if(testkey == 'v'){window.location = '#imgp6';}
  else if(testkey == 'A'){$('#cmtNote').toggle();}

  else if(testkey == 'w'){window.scrollTo(0,0);}
  else if(testkey == 'E'){window.location = '#filterMarkers';}
  else if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
  else if(testkey == 'r'){randomFlip();}
  else if(testkey == 'o'){window.open("https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=T&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=5&indpara2=10&indpara3=20&indpara4=40&indpara5=60&subChart1=9&ref5para1=0&ref5para2=0&ref5para3=0&scheme=3&com=100&chartwidth=1350&chartheight=1000&stockid=" + thecode + "&period=9&type=1&logoStyle=1");}
  else if(testkey == 'q'){myfavor();}
  else if(testkey == 'Q'){usequickCodeList();}
  //else if(testkey == 'j'){usebig20List();}
  else if(testkey == 'j'){window.location = '#imgb7';}
  else if(testkey == 'J'){window.open("https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=T&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=5&indpara2=10&indpara3=20&indpara4=40&indpara5=60&subChart1=13&ref4para1=0&ref4para2=0&ref4para3=0&scheme=3&com=100&chartwidth=1350&chartheight=1000&stockid=" + thecode + "&period=5000&type=1&logoStyle=1");}
  else if(testkey == 'S'){setupAll();}

  else if(testkey == 'p'){
       thecode = "00000" + thecode
       codewidth = thecode.length
       thecode = thecode.slice(codewidth-5, codewidth)
       localStorage.setItem("otherCode", thecode);
       window.open('otherCode.html');
     }
  else if(testkey == 'x'){largeWkCht()}
  else if(testkey == 'X'){window.open("追風4.html")}
  else if(testkey == 'y'){window.open("https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=T&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=10&indpara2=20&indpara3=40&indpara4=60&indpara5=80&subChart1=3&ref1para1=15&ref1para2=20&ref1para3=3&subChart2=3&ref2para1=25&ref2para2=30&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1350&chartheight=1000&stockid=221002.HK&period=5012&type=1&logoStyle=1&AHFT=T", "_blank");}
  else if(testkey == 'Y'){largeCht()}
  else if(testkey == 'z'){window.open("追風10.html")}
  else if(testkey == 'Z'){
       thecode = localStorage.getItem("randomcode");
       localStorage.setItem("stkCode", thecode);
       window.open("minBor.html", "_blank");
     }
  else if(testkey == 'D'){
    bigVolAdr = bigVolHeader + thecode; window.open(bigVolAdr);
  }
  else if(testkey == 'G'){
    bigVolAdr = shortsellHeader + thecode; window.open(bigVolAdr);
  }
  else if(testkey == 'u'){window.open("https://www.worldometers.info/coronavirus/");}
  else{chkOtherKeys(testkey)} 

  jQuery("body").on( "swipeleft", function( event ) {jpback();} );
  jQuery("body").on( "swiperight", function( event ) {jpButClick();});
}
function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}

function askforCode() {
    thecode = prompt("Code Number:", "");
    if (thecode != null && thecode != "") {
      changeCode(thecode);
    }else{
      return;
    }
}

    function largeCht() {
        imgHead = "https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=8&indpara2=1.5&indpara3=10&indpara4=15&indpara5=20&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1600&chartheight=900&stockid=";

        imgTail = "&period=2060&type=1&logoStyle=1"
        imgURL = imgHead + thecode + imgTail
        window.open(imgURL, "_blank")
    }
    function largeWkCht() {
        imgHead = "https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=24&indpara2=1.5&indpara3=10&indpara4=15&indpara5=20&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1600&chartheight=900&stockid=";

        imgTail = "&period=2059&type=1&logoStyle=1"
        imgURL = imgHead + thecode + imgTail
        window.open(imgURL, "_blank")
    }

function showTO(stkcode) {
  codewidth = stkcode.length
  if((stkcode.substring(codewidth-3, codewidth) == ".US") ||
     (stkcode == "111000.HK")){
     console.log(stkcode.substring(codewidth-3, codewidth))
     return false
     }

  if(codewidth <= 5){
    stkcode = "00000"+stkcode;
    codewidth = stkcode.length;
    stkcode = stkcode.slice(codewidth-5, codewidth);
    codewidth = stkcode.length; //update to be used later
    urladdr = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + stkcode + ',day,,,60,qfq';
  }else{
    codewidth = stkcode.length
    if((codewidth == 6) && !hsReservedCode.includes(stkcode)){
       if (stkcode.charAt(0) == "6"){ stkcode = "sh"+ stkcode; 
       }else{ stkcode = "sz" + stkcode}
    }else if(codewidth == 9){
      stkcode = stkcode.substring(7, 9) + stkcode.substring(0, 7);
    }
    codewidth = stkcode.length; //update to be used later
    urladdr = 'https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=' + stkcode + ',day,,,60,qfq';
  }
  var script = document.createElement('script');
  script.onload = function() {
    $("#turnover").html("Turnover: ");
    theObj = kline_dayqfq.data;
    newObj = Object.values(theObj);
    newObj = Object.values(newObj[0]);
    newObj = Object.values(newObj[0]);
// console.log("newObj: ",newObj) //20 objs
// HK ["2024-11-01", "311.200", "311.400", "314.800", "308.800", "3863084.00", {}, "0", "120483.40"]
// open 311.2 close 311.4 high 314.8 low 308.8

closeArr = [];
highArr = [];
lowArr = [];
for (let i = 0; i < newObj.length; i++) {
    closeArr.push(Number(newObj[i][2]));
    highArr.push(Number(newObj[i][3]));
    lowArr.push(Number(newObj[i][4]));
}
plotBollingerBands(highArr, 10, 1,"high");
plotBollingerBands(lowArr, 10, 1,"low");
plotBollingerBands(closeArr, 10, 1,"close");

midArr = highArr.map(function (num, idx) {
  return (num + lowArr[idx])/2;
});

plotBollingerBands(midArr, 10, 1,"mid");

// select column: arrayColumn = (newObj, n) => newObj.map(x => x[n]);
// open: arrayColumn(newObj, 1), close: arrayColumn(newObj, 2)
// high: arrayColumn(newObj, 3), low: arrayColumn(newObj, 4)

// A stk ["2024-11-01", "7.40", "7.35", "8.20", "6.90", "5483674"]
// open 7.4  close 7.35 high 8.2 low 6.9
    for(i=49;i<newObj.length;i++){
      thedate = newObj[i][0];  // date
      if(codewidth == 5){
        theAmtIdx = 8;
      }else{
        theAmtIdx = 5;
      }
      theamt = Math.round(Number(newObj[i][theAmtIdx]));
      if(codewidth != 5){
        if(stkcode.slice(0, 5) == "sh688"){
          theamt = Math.round(theamt * Number(newObj[i][2])/10000);
        }else{
          theamt = Math.round(theamt * Number(newObj[i][2])/100);
        }
      }
      theamt = theamt.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");

      $("#turnover").append( theamt,"w ");
    }
    theH = Number(newObj[newObj.length-1][3]);  // High
    theL = Number(newObj[newObj.length-1][4]);  // Low
    theClose = Number(newObj[newObj.length-1][2]);  // Close

    thePrevClose = Number(newObj[newObj.length-2][2]);  // PrevClose
    theCDiff = Math.round((theClose - thePrevClose)*10000)/10000;
    theCPct = Math.round((theCDiff / thePrevClose)*1000)/10;
    if(theCDiff>0){
      theCDiff = '<span class="red">' + theCDiff + '</span>'
      theCPct = '<span class="red">' + theCPct + '</span>'
    }
    if(theCDiff<0){
      theCDiff = '<span class="green">' + theCDiff + '</span>'
      theCPct = '<span class="green">' + theCPct + '</span>'
    }

    // calculate period ranges
    List5 = newObj.slice(newObj.length-5, newObj.length)
    List5H = List5.map(function(value,index) { return value[3]; })
    List5H = List5H.map(function (x) { return Number(x); });
    max5 = Math.max(...List5H)

    List5L = List5.map(function(value,index) { return value[4]; })
    List5L = List5L.map(function (x) { return Number(x); });
    min5 = Math.min(...List5L)

    // cal current pos
    c5Pos = Math.round((theClose - min5)*100/ (max5-min5))
    c5fluc = Math.round((max5 - min5)*100/ min5)

    List20H = newObj.map(function(value,index) { return value[3]; })
    List20H = List20H.map(function (x) { return Number(x); });
    max20 = Math.max(...List20H)

    List20L = newObj.map(function(value,index) { return value[4]; })
    List20L = List20L.map(function (x) { return Number(x); });
    min20 = Math.min(...List20L)

    // cal current pos
    c20Pos = Math.round((theClose - min20)*100/ (max20-min20))
    c20fluc = Math.round((max20 - min20)*100/ min20)

    // cal day fluc
    dayMax = Math.max(theH,thePrevClose)
    dayMin = Math.min(theL,thePrevClose)
    dPos = Math.round((theClose - dayMin)*100/ (dayMax-dayMin))
    dfluc =  Math.round((dayMax - dayMin)*100/ dayMin)

    $("#turnover").append( '<br>'+ '<span class="red">maxS</span> '+ max5+ ' <span class="green">minS</span> '+ min5+
      ' <span class="orange">Sfluc '+ c5fluc+
      '%</span><span class="yellow"> SPos '+ c5Pos+ ' </span>, <u><span class="red">maxL</span> '+ max20+
      ' <span class="green">minL</span> '+ min20+ 
      ' <span class="orange">Lfluc '+ c20fluc+
      '%</span><span class="yellow"> LPos '+ c20Pos+ '</span></u>'+
      ', <span class="red">H '+ theH+
      '</span> <span class="green">L '+ theL+
      '</span> <span class="yellow bigfont">C '+ theClose+
      '</span> Dif '+ theCDiff+ ', ',theCPct+ ' % ' + 
      '<span class="orange">dfluc '+ dfluc+
      '%<span class="yellow"> dPos '+ dPos);

  };
  script.src = urladdr;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function sSCt(stkcode) {
      codewidth = stkcode.length
      if(stkcode == "HSI"){ stkcode = '110000';
      }else{
        if(codewidth <= 5){
          stkcode = "00000"+stkcode;
          codewidth = stkcode.length;
          stkcode = stkcode.slice(codewidth-5, codewidth);
          codewidth = stkcode.length; //update to be used later
        }else{
          codewidth = stkcode.length
          if((codewidth == 6) && !hsReservedCode.includes(stkcode)){
             if (stkcode.charAt(0) == "6"){ stkcode = stkcode + ".sh"; 
             }else{ stkcode = stkcode + ".sz" }
          }else if(codewidth == 8){
            stkcode = stkcode.substring(2, 8) + "."+stkcode.substring(0, 2);
          }
        }
      }

  imgHead00 = "<img id='imgp";
  imgHead01 = "' ondblclick='openlarge()' src='https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=10&indpara2=20&indpara3=30&indpara4=40&indpara5=50&subChart1=3&ref1para1=15&ref1para2=30&ref1para3=5&subChart2=3&ref2para1=20&ref2para2=40&ref2para3=15&subChart3=7&ref3para1=15&ref3para2=10&ref3para3=0&subChart4=7&ref4para1=30&ref4para2=20&ref3para3=0&subChart5=13&ref4para1=0&ref4para2=0&ref4para3=0&scheme=3&com=100&chartwidth=550&chartheight=760&stockid=";

  imgHead11 = "' ondblclick='openlarge()' src='https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=6&indpara3=9&indpara4=12&indpara5=15&subChart1=3&ref1para1=7&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=7&ref3para1=7&ref3para2=5&ref3para3=0&subChart4=7&ref4para1=11&ref4para2=8&ref3para3=0&subChart5=13&ref4para1=0&ref4para2=0&ref4para3=0&scheme=3&com=100&chartwidth=550&chartheight=760&stockid=";
  imgPCode= "&period=";
  imgTail="&type=1&logoStyle=1'>";

  intv = [5000, 5012, 2, 4, 7, 10, 12, 18];
  newshead = "https://www.aastocks.com/tc/stocks/analysis/stock-aafn/"
  newstail = "/0/all/1"
  newsStr = newshead + stkcode + newstail

  shortSellAdr = "<a href='" + shortsellHeader + stkcode +"' target = _blank>" + " 沽空</a>" 
  bigVolAdr = "<a href='" + bigVolHeader + stkcode +"' target = _blank>" + " 大戶</a>" 

  if(fraudSTK.includes(stkcode)){
    imgAdr = '<span class="bordred1 borRad15 blinkred whiteback goldbs">提防老千 !!! </span>'
  }else if(ignoreSTK.includes(stkcode)){
    imgAdr = '<span class="bordlime1 borRad15 blinkyellow blueback bluebs">可忽视</span>'
  }else if(mustAdd.includes(stkcode)){
    if(pointer!=null){
      imgAdr = pointer + "/"+stkChartList.length+' <span class="bordwhite2 borRad20 blinkslow red bluebs">留意股</span>'
    }else{
      imgAdr = ' <span class="bordwhite2 borRad20 blinkslow red bluebs">留意股</span>'
    }
  }else{
    if(pointer!=null){
      imgAdr = pointer + "/"+stkChartList.length+' '
    }else{
      imgAdr = ''
    }
  }

  imgAdr = imgAdr + "<a href='" + newsStr + "' target = _blank>" + stkcode + "</a>" + shortSellAdr + bigVolAdr +"<br>" 

  for( var imgPeriod = 0; imgPeriod < 2; imgPeriod++){
    imgAdr = imgAdr + imgHead00 + imgPeriod + imgHead01 + stkcode + imgPCode + intv[imgPeriod] + imgTail;
  };
  for( var imgPeriod = 2; imgPeriod < intv.length; imgPeriod++){
    imgAdr = imgAdr + imgHead00 + imgPeriod  + imgHead11 + stkcode + imgPCode + intv[imgPeriod] + imgTail;
  };

    imgAdr = imgAdr + '<br><h3 id="boll">保力加</h3><br>' + sCt(thecode) // add the Bor chart

    document.getElementById("stkChart").innerHTML = imgAdr;
    showDateTime();
}

function shortSCt() {
  imgmHead = "<img style='width:100%; max-width:100%;' src='https://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=5&indpara2=10&indpara3=15&indpara4=20&indpara5=25&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=7&ref3para1=5&ref3para2=3&ref3para3=0&subChart4=1&ref4para1=0&ref4para2=0&ref4para3=0&subChart5=11&ref5para1=5&ref5para2=0&ref5para3=0&scheme=3&com=100&chartwidth=";
  imgwidth = 1350;
  heightstr = "&chartheight=";
  imgheight = 1500;
  idcode = "&stockid=";
  imgPCode= "&period=";
  imgTail="&type=1&logoStyle=1'><br><br>";

  var d = new Date();
  var mins=d.getMinutes();
  var hr=d.getHours();

  hrdiff = hr - 9;
  mindiff = mins -30;
  timespan = hrdiff * 60 + mindiff;
  if(timespan<60){imgwidth = timespan*22}

  intv = [5000,2,7,10,2060];
  newshead = "https://www.futunn.com/hk/stock/"
  newstail = "-HK"
  newsStr = newshead + thecode + newstail
  imgAdr = "<a href='" + newsStr + "' target = _blank>" + thecode + "</a><br>" 

  imgAdr = imgAdr + imgmHead +  imgwidth + heightstr + imgheight+ idcode+ thecode + imgPCode + intv[0] + imgTail;

  for( var imgPeriod = 1; imgPeriod < intv.length; imgPeriod++){
    imgAdr = imgAdr + imgmHead +  1350 + heightstr + imgheight+ idcode+ thecode + imgPCode + intv[imgPeriod] + imgTail;
  };

  imgAdr = imgAdr + sCt(thecode) // add the Bor chart
    document.getElementById("stkChart").innerHTML = imgAdr;
    showDateTime();
}


// load localStorage.savedCodeList
if (localStorage.getItem("savedCodeList") === null) {
  quickCodeList = ["110000"];
  localStorage.savedCodeList = quickCodeList;
} else{
  quickCodeList = localStorage.getItem("savedCodeList").split(',');
}

function sCt(stkcode) {
  indpara1 = [22,16,12,10,10,8,6,6]
  imgHead00 = "<img id='imgb";
  imgHead01 = " src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=T&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1="
  imgHead02 = "&indpara2=1.6&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=7&ref3para1=7&ref3para2=5&ref3para3=0&subChart4=7&ref4para1=11&ref4para2=8&ref3para3=0&subChart5=13&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=650&chartheight=1000&stockid=";
  imgPCode= "&period=";
  imgTail="&type=1&logoStyle=1'>";
  theListDom = imgHead00 + "0'"+imgHead01 + indpara1[0] + imgHead02+ stkcode + imgPCode + 5012 + imgTail;
  theListDom = theListDom + imgHead00 + "1'"+imgHead01 + indpara1[1] + imgHead02+ stkcode + imgPCode + 3 + imgTail;
  theListDom = theListDom + imgHead00 + "2'"+imgHead01 + indpara1[2] + imgHead02+ stkcode + imgPCode + 4 + imgTail;
  theListDom = theListDom + imgHead00 + "3'"+imgHead01 + indpara1[3] + imgHead02+ stkcode + imgPCode + 7 + imgTail;
  theListDom = theListDom + imgHead00 + "4'"+imgHead01 + indpara1[4] + imgHead02+ stkcode + imgPCode + 6 + imgTail;
  theListDom = theListDom + imgHead00 + "5'"+imgHead01 + indpara1[5] + imgHead02+ stkcode + imgPCode + 10 + imgTail;
  theListDom = theListDom + imgHead00 + "6'"+imgHead01 + indpara1[6] + imgHead02+ stkcode + imgPCode + 12 + imgTail;
  theListDom = theListDom + imgHead00 + "7'"+imgHead01 + indpara1[7] + imgHead02+ stkcode + imgPCode + 18 + imgTail;
  return theListDom;
}

function addToquickCodeList() {
  codewidth = thecode.length
  if(codewidth <= 5){
    thecode = "00000"+thecode;
    codewidth = thecode.length;
    thecode = thecode.slice(codewidth-5, codewidth);
  }
  if (!quickCodeList.includes(thecode)) {
    quickCodeList.push(thecode);
    quickCodeList = Array.from(new Set(quickCodeList)); // set unique
    localStorage.savedCodeList = quickCodeList;
  }
}

function showDateTime() {
    var theDateTime = showDate() +" "+ showTime();
    cmtCode = thecode // use another name not to interfere other parts
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

    document.getElementById("dateTime").innerHTML = theDateTime  + " <span onclick=\"$('#cmtNote').toggle();\"> 🎌 </span><br><span class='orange' id='cmtNote'>" + commentTxt + "</span>";

    $('#filterMarkers').text("") // clean the history characterictics
}

function toggleButton() {
    document.getElementById('myDropdown').classList.toggle('show');
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

// window.ondblclick = function(event) {shortSCt();}

function changeCode(thecode) {
 localStorage.setItem("randomcode", thecode)
     window.location.href = "Random Charts.html";
}

function askaList() {
  var theList = prompt("Enter stk list seperated by space:", "");
  if (theList != null && theList != "") {
    localStorage.setItem("stkListArr",theList); // this is the shareList
    localStorage.setItem("titlebar","temp list");
    location.reload();
    stkChartList = theList;
  }
}


function showActivity(){
    tempcode = "00000" + thecode
    codewidth = tempcode.length
    tempcode = tempcode.slice(codewidth-5, codewidth)

    markers = filterResult.filter(element => element.includes(tempcode));
    // clean the h2 tags
    markers = markers.map(element => element.replace(/<\/h2>.*/gi, ""))
    markers = markers.map(element => element.replace(/<h2>/gi, ""))

    markers = markers.map(element => formatWeekDay(element))
    if (markers.length > 50){ markers.splice(0, markers.length-80);}

    $('#filterMarkers').text("")
    $('#filterMarkers').append("<b class='red'>" + tempcode + " 日线特征:</b><br>")
    $('#filterMarkers').append(markers)
}

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

function assignList(){
  newList = eval(document.getElementById("selectList").value).split(" ");
  stkChartList = newList;

  alert(" Total: " + stkChartList.length + "\ndetails see end of this page.\nremember to modify mustadd list!\n" + newList)
        $("#message").text("Total: " + stkChartList.length + "\n"+stkChartList);
  $('#selectList').blur()
  window.location.hash = '#dateTime';
}

function setupAll() {
 localStorage.setItem("fourcodes", "23707,11979,12725,28045,110000,000001.sh")
 localStorage.setItem("ImgPCode", "&period=10")
 localStorage.setItem("randomcode", "00388");
 localStorage.setItem("stkListArr","00700,00388,00939");
 localStorage.setItem("titlebar","temp list");
 localStorage.setItem("trendBase",10);
 localStorage.setItem("chaseWindTime", 60000);
 localStorage.setItem("stkListArr", "00388");
 localStorage.setItem("savedCodeList", "00388");
     changePeriod()
     alert("setup complete!")
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

// <y>计算保力加通道</y>
function bollingerBands(data, period, multiplier) {
 const wma = weightedMovingAverage(data, period);
 const std = standardDeviation(data, period);
 const upperBand = wma.map((val, i) => val === null ? null : val + multiplier * std[i]);
 const lowerBand = wma.map((val, i) => val === null ? null : val - multiplier * std[i]);
//console.log("lowerBand: ",lowerBand)
 return { wma, upperBand, lowerBand, std };
}

function plotBollingerBands(data, period, multiplier, chartTitle) {
 // <y>计算保力加通道数据</y>
 const bands = bollingerBands(data, period, multiplier);

 // <y>创建标题</y>
 const title = document.createElement('pk');
 title.textContent = chartTitle;
 document.body.appendChild(title);

 // <y>动态创建画布</y>
 const canvas = document.createElement('canvas');
   canvas.width = 500;
   canvas.height = 200;
 document.body.appendChild(canvas);

 // <y>获取画布上下文</y>
 const ctx = canvas.getContext('2d');

 // <y>绘制图表</y>
 new Chart(ctx, {
  type: 'line',
  data: {
   labels: Array.from({length: data.length}, (_, i) => i + 1),
   datasets: [
    {
     label: 'Price',
     data: data,
     borderColor: 'blue',
     fill: false,
     borderWidth: 1,
     pointStyle: false,
    },
    {
     label: 'WMA',
     data: bands.wma,
     borderColor: 'green',
     fill: false,
     borderWidth: 1,
     pointStyle: false,
    },
    {
     label: 'Upper Band',
     data: bands.upperBand,
     borderColor: 'purple',
     fill: false,
     borderWidth: 1,
     pointStyle: false,
    },
    {
     label: 'Lower Band',
     data: bands.lowerBand,
     borderColor: 'purple',
     fill: false,
     borderWidth: 1,
     pointStyle: false,
    }
   ]
  },
  options: {
   responsive: true,
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
      text: 'Price'
     }
    }
   }
  }
 });
}

showSTKChart();
