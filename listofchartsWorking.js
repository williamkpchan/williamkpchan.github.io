
$(document).ready(function(){
    $('.keys').click(function(){
      parent.history.back();
      return false;
    });
    _stkChartInit()
    showAllCharts();
});

theList = [];
thisImgPCode= "&period=7";

function showAllCharts(){
//    $("#codelist").load("HKCodelist.txt");
  thisImgHead = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=6&indpara3=9&indpara4=12&indpara5=15&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=680&chartheight=400&stockid=";
  thisImgTail="&type=1&logoStyle=1' ";

//  $( "#codelist" ).append("Total: " + theList.length + "<br>" + theList+ "<br>" );
  $( "#codelist" ).empty();
  $( "#codelist" ).append("Total: " + theList.length + "<br>");

  theList.forEach(function(value) {
    $( "#codelist" ).append('<span onclick=xunbao("' +value + '")>' + value + '</span>&emsp;');
  });
  $( "#codelist" ).append("<br>");

  // this process each chart individually
  for( codeNo = 0; codeNo < theList.length; codeNo += 1){
    returnStr = "";
    showStkTO(theList[codeNo]); // this show more details
    theText = theList[codeNo] + returnStr;

    theFunccode =  "<div>" + (codeNo+1) + " &emsp; " + theText + "<br>" + thisImgHead + theText + thisImgPCode + thisImgTail + "onclick = \"xunbao('" + theText + "')\">" + "</div>";
    $( "#codelist" ).append( theFunccode);
  }
}

function showStkTO(stkcode) {
  codewidth = stkcode.length
  stkcode = stkcode.slice(codewidth-5, codewidth)

  urladdr = 'http://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + stkcode + ',day,,,5,qfq';
  var script = document.createElement('script');
  script.onload = function() {
    theObj = kline_dayqfq.data;
    newObj = Object.values(theObj);
    newObj = Object.values(newObj[0]);
    newObj = Object.values(newObj[0]);

    for(i=2;i<newObj.length;i++){
      thedate = newObj[i][0];  // date

      theamt = Math.round(Number(newObj[i][8])).toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");  // amt
      // $("#turnover").append( theamt,"w ");
      returnStr = returnStr + theamt +"w ";
    }
    theH = Number(newObj[newObj.length-1][3]);  // High
    theL = Number(newObj[newObj.length-1][4]);  // Low
    //console.log(theH, theL);

    theClose = Number(newObj[newObj.length-1][2]);  // Close
    thePrevClose = Number(newObj[newObj.length-2][2]);  // PrevClose
    theCDiff = Math.round((theClose - thePrevClose)*10000)/10000;
    theCPct = Math.round((theCDiff / theClose)*1000)/10;
    if(theCDiff>0){
      theCDiff = '<span class="red">' + theCDiff + '</span>'
      theCPct = '<span class="red">' + theCPct + '</span>'
    }
    if(theCDiff<0){
      theCDiff = '<span class="green">' + theCDiff + '</span>'
      theCPct = '<span class="green">' + theCPct + '</span>'
    }

    returnStr = returnStr + '<br>'+
                '<span class="red">H</span> '+ theH+
                ' <span class="green">L</span> '+theL+
                ' <span class="yellow">C</span> '+theClose+
                ' Dif '+ theCDiff + ', ' + theCPct + ' % ';
  };
  script.src = urladdr;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function reportIt(someMsg) {
  returnStr = someMsg;
}
function chkKey() { testkey = getChar(event);
  if(testkey == 'c'){showChart();}
//  if(testkey == 'f'){ window.location = '#stkcodeid';  $('#stkcode').value =""; }

  if(testkey == 'r'){thisImgPCode= "&period=3"; showAllCharts();}
  if(testkey == 'd'){thisImgPCode= "&period=7"; showAllCharts();}
  if(testkey == 'w'){thisImgPCode= "&period=11"; showAllCharts();}
  if(testkey == '5'){thisImgPCode= "&period=5012"; showAllCharts();}
  if(testkey == '1'){thisImgPCode= "&period=5000"; showAllCharts();}

  if(testkey == 'W'){window.open("https://web.whatsapp.com/");}
  if(testkey == 's'){window.open("../stkListVH.html");}
  if(testkey == 'F'){window.open("ForexChart.htm");}
  if(testkey == 'f'){forewardList();} // go forward to next list
  if(testkey == 'b'){backwardList();}

  if(testkey == 'h'){window.open("Hmain.html");}
  if(testkey == 'H'){window.open("monitorHSI.html");}
  if(testkey == 'A'){window.open("monitorA.html");}
//  if(testkey == 'e'){window.scrollTo(0,9999999);}
  if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
  if(testkey == 'l'){askaList();} // input a list of codes and store it
  if(testkey == 'R'){randomList();} // go forward to next list
  if(testkey == 't'){window.scrollTo(0,0);}
  if(testkey == 'x'){window.open("Random Charts.html");}
  if(testkey == 'z'){topicpointer = 12; showstkList();}
}

function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which);   // the rest
  } else {
    return null; // special key
  }
}

function openHtml(){
  console.log( "keypress: " + $(this).value );
}

function showChart() {
  var thecode = prompt("Code Number:", "");
  if (thecode != null && thecode != "") {sCt(thecode);}
}

function askaList() {
  var theList = prompt("Enter stk list seperated by space:", "");
  if (theList != null && theList != "") {
    localStorage.setItem("stkListArr",theList); // this is the shareList
    localStorage.setItem("titlebar","temp list");
    location.reload();
  }
}

function _stkChartInit() {  // this is the shareList init
  if (localStorage.getItem("stkListArr") === null) {
    theList = "00700";
    $("#titlebar").empty();
    $('#titlebar').text()= "BigChip"
  }
  else { fullStkChartInit(); }
}

function fullStkChartInit() {
    theList = localStorage.getItem("stkListArr");  // this is the shareList from showstklist.js
    theList = theList.split(' ');
    titleBar = localStorage.getItem("titleBar");
    $("#titlebar").empty();
    $("#titlebar").append(titleBar);
}

function xunbao(xunbaocode) {
  localStorage.setItem("randomcode", xunbaocode)
  localStorage.setItem("otherCode", xunbaocode)
  window.open("D:/Dropbox/Public/LibDocs/Random Charts.html");
}

