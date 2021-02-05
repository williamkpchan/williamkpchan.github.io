$(document).ready(function(){
    $('.left, .title').click(function(){
    parent.history.back();
    return false;
    });
});

styleStr = "<script type='text/javascript' src='mainscript.js'></script><style>body { background-color: black; color: green;} a { text-decoration: none; color: #28B8B8;}</style><body onkeypress='chkKey()'><center>";


function chkKey() {
  var testkey = getChar(event);
  if(testkey == 'a'){window.open("apptechno.html");}
  else if(testkey == 'b'){window.open("LibDocs/listofcharts.html");}
  else if(testkey == 'B'){window.open("https://map.baidu.com/");}
  else if(testkey == 'c'){showChart();}
// calculator  else if(testkey == 'C'){window.open("https://www.desmos.com/fourfunction");}
  else if(testkey == 'C'){window.open("LibDocs/caseStudiesLog.html");}
  else if(testkey == 'd'){window.open("https://www.youdao.com/");}
  else if(testkey == 'e'){window.location = '#ertong';}
  else if(testkey == 'f'){window.open("http://williamkpchan.github.io/ForexChart.htm");}
  else if(testkey == 'F'){window.open("http://fanyi.baidu.com/");}
  else if(testkey == 'g'){window.location = '#_youxi';}
  else if(testkey == 'h'){window.open("LibDocs/News Points.html");}
  else if(testkey == 'H'){window.open("LibDocs/monitorHSI.html");}
  else if(testkey == 'J'){window.location = '#_jiaoyu';}
  else if(testkey == 'l'){window.location = '#dushu';}
  //if(testkey == 'L'){openLogFile();}
  else if(testkey == 'L'){window.open("LibDocs/mlinechart.html");}
  else if(testkey == 'm'){window.open("medical.html");}
  else if(testkey == 'M'){window.open("https://www.google.com/maps");}
  else if(testkey == 'n'){window.location = '#xinwen';}
  else if(testkey == 'N'){window.location = '#Notes';}
  else if(testkey == 'p'){window.open('LibDocs/temp.html');}

  else if(testkey == 'q'){window.open('https://www.quora.com/');}
  else if(testkey == 'Q'){window.open('https://news.qq.com/zt2020/page/feiyan.htm');}


  else if(testkey == 's'){window.open("stkListVH.html");}
  else if(testkey == 'S'){window.open("LibDocs/Hour STK Charts.html");}


  else if(testkey == 't'){window.open("https://my.weather.gov.hk/tc/myindex.htm");}
  else if(testkey == 'T'){window.open("https://translate.google.com/#en/zh-CN");}

  else if(testkey == 'u'){window.open("https://www.worldometers.info/coronavirus/");}
  else if(testkey == 'v'){window.open("https://williamkpchan.github.io/LibDocs/StkImgViewer.html");}
  else if(testkey == 'w'){window.location = '#ruanjian';}
  else if(testkey == 'W'){window.open("https://web.whatsapp.com/");}
  else if(testkey == 'x'){window.open("https://wx.qq.com/");}
  else if(testkey == 'X'){window.open("LibDocs/Random Charts.html");}

  else if(testkey == 'y'){window.open("https://www.youtube.com/feed/subscriptions");}
  else if(testkey == 'z'){showTenYear();}
  else if(testkey == ','){window.open("LibDocs/mlinechart.html");}
  else if(testkey == '.'){window.open("LibDocs/mlineMinutechart.html");}
  else if(testkey == '/'){window.open("LibDocs/mlineMinutecharttest.html");}
  else{chkOtherKeys(testkey)} 
}
function chkOtherKeys(testkey) {
  if(testkey == ','){window.open("https://williamkpchan.github.io/LibDocs/mlinechart.html");}
  else if(testkey == '.'){window.open("https://williamkpchan.github.io/LibDocs/mlineMinutechart.html");}
  else if(testkey == '/'){window.open("https://williamkpchan.github.io/LibDocs/mlineMinutecharttest.html");}
  else if(testkey == 'c'){showChart();}
  else if(testkey == 'd'){window.open("https://www.youdao.com/");}
  else if(testkey == 'F'){window.open("http://fanyi.baidu.com/");}
  else if(testkey == 'f'){window.open("http://williamkpchan.github.io/ForexChart.htm");}
  else if(testkey == 'm'){window.open("http://williamkpchan.github.io/medical.html");}
  else if(testkey == 'M'){window.open("https://www.google.com.hk/maps/");}
  else if(testkey == 'q'){window.open('https://www.quora.com/');}

  else if(testkey == 'r'){randomLinkTo();}
  else if(testkey == 's'){window.open("D:/Dropbox/Public/stkListVH.html");}
  else if(testkey == 't'){window.open("https://my.weather.gov.hk/tc/myindex.htm");}
  else if(testkey == 'T'){window.open("https://translate.google.com/#en/zh-CN");}
  else if(testkey == 'u'){window.open("https://www.worldometers.info/coronavirus/");}
  else if(testkey == 'W'){window.open("https://web.whatsapp.com/");}
  else if(testkey == 'x'){window.open("https://wx.qq.com/");}
  else if(testkey == 'X'){window.open("D:/Dropbox/Public/LibDocs/Random Charts.html");}
  else if(testkey == 'y'){window.open("https://www.youtube.com/feed/subscriptions");}
}
function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which);   // the rest
  } else {
    return null; // special key
  }
}

function showChart() {
    var thecode = prompt("Code Number:", "");
    if (thecode != null && thecode != "") {showBoth(thecode);}
}

function showBoth(stkcode) {
    var reg = /\d{6}\.s(z|h)/;
    if(stkcode.match(reg)!=null){
      sCt(stkcode);
      stkcode = stkcode.substring(7, 9)+stkcode.substring(0, 6);
      localStorage.setItem("otherACode",stkcode);
      window.open("file:///D:/Dropbox/Public/LibDocs/otherAOHLC.html");
    }else if (stkcode != "HSI") { // this part handle HK code
      stkcode = FormatNumberLength5(stkcode);
      localStorage.otherCode = stkcode;
      window.open("file:///D:/Dropbox/Public/LibDocs/mlinechart.html");
      localStorage.randomcode= stkcode;
      window.open("file:///D:/Dropbox/Public/LibDocs/Random Charts.html");
      sCt(stkcode);
    }
}
function sCt(stkcode) {
  imgHead = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=5&indpara3=10&indpara4=15&indpara5=20&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1350&chartheight=690&stockid=";
  imgHead2 = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=20&indpara2=2&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=12&ref1para2=26&ref1para3=9&subChart2=2&ref2para1=14&ref2para2=0&ref2para3=0&scheme=3&com=100&chartwidth=1350&chartheight=600&stockid=";

  imgPCode= "&period=";
  imgTail="&type=1&logoStyle=1'><br>";

  // 5000, 5007, 1, 2, 3, 4, 6, 7, 9, 10, 12, 14, 16, 17, 18
  intv = [7,4, 3, 2, 1, 5012, 5007, 5000, 7, 11, 12, 2060];
  var imgWindow = window.open("");

//change
//http://www.aastocks.com/tc/stocks/analysis/stock-aafn/2208/0/all/1
//to
//newshead = "http://www.aastocks.com/tc/stocks/analysis/stock-aafn/"
//newstail = "/0/all/1"

  newshead = "http://www.aastocks.com/tc/ltp/rtquote.aspx?symbol=";
  newstail = ".HK";
  newsStr = newshead + stkcode + newstail;
  imgAdr = "<script type='text/javascript' src='https://williamkpchan.github.io/mainscript.js'></script>\n <style>body { background-color: black; color: green} a { text-decoration: none; color: #28B8B8;}</style><body onkeypress='chkKey()'><center>" +"<a href='" + newsStr + "' target = _blank>" + stkcode + "<br>";

  for( imgPeriod = 0; imgPeriod < intv.length; imgPeriod++){
    imgAdr = imgAdr + imgHead + stkcode + imgPCode + intv[imgPeriod] + imgTail + imgHead2 + stkcode + imgPCode + intv[imgPeriod] + imgTail;
  }

  imgWindow.document.write(imgAdr);

}
function FormatNumberLength5(num) {
    var r = "" + num;
    while (r.length < 5) {
        r = "0" + r;
    }
    return r;
}

function sCtmin(stkcode) {
  imgHead = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=5&indpara3=10&indpara4=15&indpara5=20&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=650&chartheight=500&stockid=";
  imgHead2 = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=20&indpara2=2&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=12&ref1para2=26&ref1para3=9&subChart2=2&ref2para1=14&ref2para2=0&ref2para3=0&scheme=3&com=100&chartwidth=650&chartheight=500&stockid=";

  imgPCode= "&period=";
  imgTail= "&type=1&logoStyle=1'>";

  // 5000, 5007, 5012, 1, 2, 3, 4, 6, 7, 9, 10, 12, 14, 16, 17, 18
  intv = [7, 4, 5000, 5007, 3, 2, 1, 11, 12];
  var imgWindow = window.open("");

//change
//http://www.aastocks.com/tc/stocks/analysis/stock-aafn/2208/0/all/1
//to
//newshead = "http://www.aastocks.com/tc/ltp/rtquote.aspx?symbol="
//newstail = ".HK"

  newshead = "http://www.aastocks.com/tc/ltp/rtquote.aspx?symbol=";
  newstail = ".HK";
  newsStr = newshead + stkcode + newstail;
  imgAdr = "<style>body { background-color: black; color: green} a { text-decoration: none; color: #28B8B8;}</style><body><center>" +"<a href='" + newsStr + "' target = _blank>" + stkcode + "<br>";
  for( imgPeriod = 0; imgPeriod < intv.length; imgPeriod++){
    imgAdr = imgAdr + imgHead + stkcode + imgPCode + intv[imgPeriod] + imgTail + imgHead2 + stkcode + imgPCode + intv[imgPeriod] + imgTail;
  }
  imgWindow.document.write(imgAdr);
}

function openLogFile() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth()+1;
    var curr_year = d.getFullYear();
    dateNum = last2Digit(curr_year) +last2Digit(curr_month) +last2Digit(curr_date);
    fileHeader = "file:///C:/Users/User/Desktop/mylist" + dateNum;

    filenameUp = fileHeader + "/mylist AAURec" + dateNum + ".html";
    window.open(filenameUp);

//    filenameDn = fileHeader + "/mylist AADRec" + dateNum + ".html";
//    setTimeout(function(){ window.open(filenameDn, "down"); }, 500);
//    filenameLog = fileHeader + "/mylist APC5UpLog" + dateNum + ".html";
//    setTimeout(function(){ window.open(filenameLog, "Log"); }, 500);
}

function showDate() {
    var days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth(); //months are zero based
    var curr_year = d.getFullYear();
    var datemsg = days[d.getDay()] + ", " + curr_date + " " + months[d.getMonth()] + ", " + curr_year;
    return(datemsg);
}

function showTime() {
    var d = new Date();
    var secs=d.getSeconds();
    var mins=d.getMinutes();
    var hr=d.getHours();
    var timemsg = FormatNumberLength(hr) + ":" + FormatNumberLength(mins) + ":" + FormatNumberLength(secs);
    return(timemsg);
}

function showDateAndTime() {
    var theDateTime = showDate() +" "+ showTime();
    document.getElementById("dateAndTime").innerHTML = theDateTime;
}

function last2Digit(aNum) {
    return(("0" + aNum).slice(-2));
}

function FormatNumberLength(num) {
    var r = "" + num;
    while (r.length < 2) {
        r = "0" + r;
    }
    return r;
}

function oMMA(thecode) {
    if(typeof(Storage) !== "undefined") {
        localStorage.stkCode = thecode;
        window.open("LibDocs/minMACharts.html");
    }
}

function showMMA() {
  var thecode = prompt("showMMA Code Number:", "");
  if (thecode != null && thecode != "") {oMMA(thecode);}
}

function showTenYear() {
  var thecode = prompt("showTenYear Code Number:", "");
  if (thecode != null && thecode != "") {showTY(thecode);}
}

function showTY(stkcode) {
  imgHead = "http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=5&indpara3=10&indpara4=15&indpara5=20&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1600&chartheight=900&stockid=";
  imgTail= "&period=2060&type=1&logoStyle=1";

  var imgWindow = window.open(imgHead + stkcode + imgTail);
}


function randomLinkTo() {
  linkpointer = Math.floor(Math.random() * notvisitedList.length);
  linkToAddr = LibDocsList[linkpointer]

  var index = notvisitedList.indexOf(linkpointer);
  notvisitedList.splice(index, 1);

  window.open(linkToAddr, "_blank");
}
