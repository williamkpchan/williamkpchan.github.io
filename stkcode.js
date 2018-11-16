
function sCt(stkcode) {
  imgHead = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=5&indpara3=10&indpara4=15&indpara5=20&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=1050&chartheight=690&stockid=";
  imgPCode= "&period=";
  imgTail="&type=1&logoStyle=1'><br>";

  intv = [4, 3, 2, 1, 5012, 5007, 5000, 7, 11, 12];
  var imgWindow = window.open("");
  newshead = "http://www.aastocks.com/tc/stocks/analysis/stock-aafn/";
  newstail = "/0/all/1";
  newsStr = newshead + stkcode + newstail;

  quotehead = "http://www.aastocks.com/tc/stocks/quote/detail-quote.aspx?symbol=";
  quoteStr = quotehead + stkcode;

  newsAdr = "<a href='" + newsStr + "' target = _blank>" + stkcode + "</a>" ;
  QuoteAdr = "<a href='" + quoteStr + "' target = _blank>" + stkcode + "</a>" ;

  styleStr = '<style>body { background-color: black; color: green} a { text-decoration: none; color: #28B8B8;}</style>';
  imgAdr = styleStr + "\nNews: " + newsAdr + " . quote: " + QuoteAdr+ "<br>" ;

  for( var imgPeriod = 0; imgPeriod < intv.length; imgPeriod++){
  imgAdr = imgAdr + imgHead + stkcode + imgPCode + intv[imgPeriod] + imgTail;
  };
  imgWindow.document.write(imgAdr);
}

function chkKey() {
  var testkey = getChar(event);
  if(testkey == 'c'){showChart();}
}

function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {return null // special key}
}


function openHtml(){console.log( "keypress: " + $(this).value );};

function showChart() {
    var thecode = prompt("Code Number:", "");
    if (thecode != null && thecode != "") {sCt(thecode);}
}
