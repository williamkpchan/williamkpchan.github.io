
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

  for( codeNo = 0; codeNo < theList.length; codeNo += 1){
    theText = theList[codeNo];
    theFunccode =  "<div>" + (codeNo+1) + " &emsp; " + theText + "<br>" + thisImgHead + theText + thisImgPCode + thisImgTail + "onclick = \"xunbao('" + theText + "')\">" + "</div>";
    $( "#codelist" ).append( theFunccode);
  }
}

function chkKey() { testkey = getChar(event);
  divisionHeight = Math.round(document.body.scrollHeight/9);
  if(testkey == "2"){ $('body,html').animate({scrollTop:(divisionHeight*2)}, 1); }
  if(testkey == "3"){ $('body,html').animate({scrollTop:(divisionHeight*3)}, 1); }
  if(testkey == "4"){ $('body,html').animate({scrollTop:(divisionHeight*4)}, 1); }
  if(testkey == "5"){ $('body,html').animate({scrollTop:(divisionHeight*5)}, 1); }
  if(testkey == "6"){ $('body,html').animate({scrollTop:(divisionHeight*6)}, 1); }
  if(testkey == "7"){ $('body,html').animate({scrollTop:(divisionHeight*7)}, 1); }
  if(testkey == "8"){ $('body,html').animate({scrollTop:(divisionHeight*8)}, 1); }
  if(testkey == "9"){ $('body,html').animate({scrollTop:(divisionHeight*9)}, 1); }

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
    localStorage.setItem("stkListArr",theList);
    localStorage.setItem("titlebar","temp list");
    location.reload();
  }
}

function _stkChartInit() {
  if (localStorage.getItem("stkListArr") === null) { theList = "00700";}
  else { fullStkChartInit(); }
}

function fullStkChartInit() {
    theList = localStorage.getItem("stkListArr");
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
