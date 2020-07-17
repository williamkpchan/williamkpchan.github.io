
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
tradeDetailStr = "";

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

  CommentListNames = Object.keys(theCommentList); // extract the names from comments

  // this process add turnover detail to each chart individually
  for( codeNo = 0; codeNo < theList.length; codeNo += 1){
    showStkTO(theList[codeNo]); // this show turnover details
console.log(tradeDetailStr);
    theText = theList[codeNo] + tradeDetailStr;

    // to show comments
    commentName = "j" + theList[codeNo]
    if(CommentListNames.includes(commentName)){
      cmtLocation = CommentListNames.indexOf(commentName);
      commentTxt = theCommentList[Object.keys(theCommentList)[cmtLocation]]
    }else{commentTxt = "";}

    // this is the key line to show K line charts
    theFunccode =  "<div>" + (codeNo+1) + " &emsp; " + theText + "<br>" + thisImgHead + theText + thisImgPCode + thisImgTail + "onclick = \"xunbao('" + theText + "')\">" + "<br><span class='orange'>" + commentTxt + "</span></div>";
    $( "#codelist" ).append( theFunccode);
  }
}

// this process add turnover detail to each chart individually
function showStkTO(stkcode) {
  codewidth = stkcode.length
  if(codewidth == 5){
    stkcode = stkcode.slice(codewidth-5, codewidth);
    urladdr = 'http://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + stkcode + ',day,,,5,qfq';
  }else{
    stkcode = stkcode.slice(codewidth-9, codewidth)
    stkcode = stkcode.slice(7, 9) + stkcode.slice(0, 6);
    urladdr = 'http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=' + stkcode + ',day,,,5,qfq';
  }
  //console.log(stkcode);

//[2] Close [3] High [4] Low
//kline_dayqfq={"code":0,"msg":"","data":{"sh600000":{"qfqday":
//["2020-06-24","10.540","10.600","10.610","10.500","228739.000"]],"qt":{"sh600000":

//kline_dayqfq={"code":0,"msg":"","data":{"hk00700":{"qfqday":
//["2020-06-24","502.000","490.800","505.000","490.800","23063468.00",{},"0","1148518.40"]],"qt":{"hk00700":

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
      tradeDetailStr = tradeDetailStr + theamt +"w ";
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

    tradeDetailStr = tradeDetailStr + '<br>'+
                '<span class="red">H</span> '+ theH+
                ' <span class="green">L</span> '+theL+
                ' <span class="yellow">C</span> '+theClose+
                ' Dif '+ theCDiff + ', ' + theCPct + ' % ';
   reportIt(tradeDetailStr);
   tradeDetailStr = "";
  };
  script.src = urladdr;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function reportIt(someMsg) {
  return tradeDetailStr;
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

  if(testkey == '.'){showNextPage();}
  if(testkey == ','){showPrevPage();}
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

function toACode(thecode) {
	if (thecode[0]=="6"){ thecode = thecode+".sh" }
	else { thecode = thecode+".sz" }
	return(thecode);
}


function showNextPage(){
    // pageLen is total pages, ALongListPage is page pointer
    if(ALongListPage < (pageLen-1)){ ALongListPage = ALongListPage + 1; }
    else { ALongListPage = 0; }
    showOnePage();
}
function showPrevPage(){
    if(ALongListPage > 0){ ALongListPage = ALongListPage - 1; }
    else {ALongListPage = pageLen-1;}
    showOnePage();
}
function showOnePage(){
    pageStart = ALongListPage * 40;
    pageEnd = (ALongListPage + 1) * 40;
    if (pageEnd >= listLen) {  // listLen is total list length
        pageEnd = listLen;
    }
console.log(ALongListPage, pageStart, pageEnd);

    theAPage = ALongList.slice(pageStart, pageEnd).join(" ");

    localStorage.setItem("stkListArr", theAPage); // this is used in lostofchart.js
    localStorage.setItem("titleBar","A股 Page: " + (ALongListPage +1));
console.log(theAPage);
    window.scrollTo(0,0);
    _stkChartInit()
    showAllCharts();
}
