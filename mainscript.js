$(document).ready(function(){
    $('.left, .title').click(function(){
    parent.history.back();
    return false;
    });
});

function chkKey() {
  var testkey = getChar(event);
  if(testkey == '6'){sCt("64357");}
  if(testkey == '7'){sCt("700");}
  if(testkey == '8'){sCt("857");}
  if(testkey == 'A'){window.open("halfHourMonA.html");}
  if(testkey == 'b'){window.open("LibDocs/Random Charts.html");}
  if(testkey == 'c'){showChart();}
  if(testkey == 'C'){window.location = '#cjjj';}
  if(testkey == 'd'){window.open("LibDocs/clock.html");}
  if(testkey == 'e'){window.location = '#ertong';}
  if(testkey == 'f'){window.open("ForexChart.htm");}
  if(testkey == 'F'){window.open("http://fanyi.baidu.com/");}
  if(testkey == 'g'){window.location = '#_youxi';}
  if(testkey == 'h'){window.open("LibDocs/News Points.html");}
  if(testkey == 'i'){window.location = '#IoT';}
  if(testkey == 'j'){window.location = '#Javascript';}
  if(testkey == 'J'){window.location = '#_jiaoyu';}
  if(testkey == 'l'){window.location = '#dushu';}
  if(testkey == 'm'){window.location = '#medic';}
  if(testkey == 'M'){window.open("https://www.google.com.hk/maps/");}
  if(testkey == 'n'){window.location = '#xinwen';}
  if(testkey == 'N'){window.location = '#Notes';}

  if(testkey == 'o'){window.location = '#sclj';}
  if(testkey == 'P'){window.location = '#Python';}
  if(testkey == 'p'){window.location = '#Programming';}
  if(testkey == 'q'){window.location = '#sclj';}
  if(testkey == 'r'){window.location = '#Rlang';}
  if(testkey == 's'){window.open("stkListVH.html");}
  if(testkey == 'S'){window.location = '#sclj';}
  if(testkey == 't'){window.open("http://my.weather.gov.hk/myindex_uc.htm");}
  if(testkey == 'T'){window.open("https://translate.google.com/#en/zh-CN");}
  if(testkey == 'u'){window.open("https://www.urbandictionary.com/");}
  if(testkey == 'v'){window.open("http://localhost:8080/StkImgViewer.html");}
  if(testkey == 'w'){window.location = '#ruanjian';}
  if(testkey == 'W'){window.open("https://web.whatsapp.com/");}
  if(testkey == 'x'){window.open("https://wx.qq.com/");}
  if(testkey == 'X'){window.open("LibDocs/Random Charts.html");}

  if(testkey == 'y'){window.open("http://www.youtube.com");}
  if(testkey == 'Y'){window.location = '#yinyue';}
  if(testkey == 'z'){window.open("LibDocs/shortPeriodMain.html");}

}

function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}

function showChart() {
    var thecode = prompt("Code Number:", "");
    if (thecode != null && thecode != "") {sCt(thecode);}
}

function sCt(stkcode) {
  imgHead = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=20&indpara2=2&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1050&chartheight=690&stockid=";
  imgHead2 = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=6&indpara3=12&indpara4=24&indpara5=48&subChart1=3&ref1para1=12&ref1para2=26&ref1para3=9&subChart2=2&ref2para1=14&ref2para2=0&ref2para3=0&scheme=3&com=100&chartwidth=1050&chartheight=600&stockid=";


  imgPCode= "&period=";
  imgTail="&type=1&logoStyle=1'><br>";

  // 5000, 5007, 5012, 1, 2, 3, 4, 6, 7, 9, 10, 12, 14, 16, 17, 18
  intv = [4, 3, 2, 1, 5012, 5007, 5000, 7, 11, 12];
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

function showDate() {
    var days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth(); //months are zero based
    var curr_year = d.getFullYear();
    var datemsg = days[d.getDay()] + ", " + curr_date + " " + months[d.getMonth()] + ", " + curr_year
    return(datemsg)
}

function showTime() {
	var d = new Date();
	var secs=d.getSeconds();
	var mins=d.getMinutes();
	var hr=d.getHours();
	var timemsg = FormatNumberLength(hr) + ":" + FormatNumberLength(mins) + ":" + FormatNumberLength(secs)
	return(timemsg)
}

function showDateAndTime() {
	var theDateTime = showDate() +" "+ showTime();
	document.getElementById("dateAndTime").innerHTML = theDateTime;
}

function FormatNumberLength(num) {
    var r = "" + num;
    while (r.length < 2) {
        r = "0" + r;
    }
    return r;
}
