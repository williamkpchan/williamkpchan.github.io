
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
screenWidth = Math.round(window.screen.width * window.devicePixelRatio);
console.log(window.screen.width + " " + window.devicePixelRatio +" " + screenWidth);
function showAllCharts(){
//    $("#codelist").load("HKCodelist.txt");
  //thisImgHead = "<img class='lazy' data-src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=6&indpara3=9&indpara4=12&indpara5=15&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=7&ref2para2=13&ref2para3=9&subChart3=7&ref3para1=6&ref3para2=4&ref3para3=0&subChart5=1&ref4para1=0&ref4para2=0&ref4para3=0&scheme=3&com=100&chartwidth=680&chartheight=700&stockid=";
  thisImgHead = "<img class='lazy' data-src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=9&indpara1=22&indpara2=1.6&indpara3=0&indpara4=0&indpara5=0&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3&subChart2=3&ref2para1=7&ref2para2=13&ref2para3=9&subChart3=7&ref3para1=6&ref3para2=4&ref3para3=0&subChart5=1&ref4para1=0&ref4para2=0&ref4para3=0&scheme=3&com=100&chartwidth=680&chartheight=700&stockid=";

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
    //showStkTO(theList[codeNo]); // this show turnover details
    theText = theList[codeNo]

    // modify to suit A stock
    textwidth = theText.length;
    if(textwidth <= 5){
      theText = "00000"+theText;
      textwidth = theText.length;
      theText = theText.slice(textwidth-5, textwidth);
      textwidth = theText.length; //update to be used later
    }else{
      textwidth = theText.length
      if((textwidth == 6) && !hsReservedCode.includes(theText)){
         // note the code is diff fm tencent code
         if (theText.charAt(0) == "6"){ theText = theText + ".sh"; 
         }else{ theText = theText + ".sz"}
      }else if(textwidth == 9){
        theText = theText.substring(7, 9) + theText.substring(0, 7);
      }
    }
    // to show comments
    commentName = "j" + theList[codeNo]
    if(CommentListNames.includes(commentName)){
      cmtLocation = CommentListNames.indexOf(commentName);
      commentTxt = theCommentList[Object.keys(theCommentList)[cmtLocation]]
    }else{commentTxt = "no data!";}

    // this is the key line to show K line charts

    theFunccode =  "<div id=imgp" + codeNo + ">" + (codeNo+1) + " &emsp; " + theText  + "<br>" + thisImgHead + theText + thisImgPCode + thisImgTail + "onclick = \"xunbao('" + theText + "')\">" + "<br><span onclick=\"$('#cmt" + codeNo + "').toggle();\"> 🎌 </span><br>" + "<span class='orange' id='cmt" + codeNo + "'>" + commentTxt + "</span></div>";
    $( "#codelist" ).append( theFunccode);
    tradeDetailStr = ""; // clean the tradeDetailStr

  }
  var lazyLoadInstance = new LazyLoad({ elements_selector: ".lazy"});
}

// this process add turnover detail to each chart individually
tradeDetail = theList.forEach(stkcode => function (stkcode) {
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
    newObj = Object.values(newObj[0]);  // 5 rows of date ohlc amt

    for(i=newObj.length-4;i<newObj.length-1;i++){  // newObj.length = 5, last 3 amt
      thedate = newObj[i][0];      // date

      theamt = Math.round(Number(newObj[i][8])).toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");  // amt
      // $("#turnover").append( theamt,"w ");
      tradeDetailStr = tradeDetailStr + " " +theamt +"w ";
    }
    // console.log("obj len ",newObj.length, tradeDetailStr);
    theH = Number(newObj[newObj.length-1][3]);  // High
    theL = Number(newObj[newObj.length-1][4]);  // Low
    // console.log(theH, theL);

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

    tradeDetailStr = tradeDetailStr + 
                '<span class="red">H</span> '+ theH+
                ' <span class="green">L</span> '+theL+
                ' <span class="yellow">C</span> '+theClose+
                ' Dif '+ theCDiff + ', ' + theCPct + ' % ';
    return tradeDetailStr; // record it!!!
  };
  script.src = urladdr;
  document.getElementsByTagName('head')[0].appendChild(script);
 }
)
console.log(tradeDetail)
function reportIt(someMsg) { // show it on screen
  tradeDetailStr = someMsg;
}
function chkKey() { testkey = getChar(event);
  //if(testkey == 'c'){showChart();}
  if(testkey == 'c'){window.open("https://williamkpchan.github.io/LibDocs/Random Charts.html");}
//  if(testkey == 'f'){ window.location = '#stkcodeid';  $('#stkcode').value =""; }

  if(testkey == 'h'){thisImgPCode= "&period=3"; showAllCharts();}
  if(testkey == 'd'){thisImgPCode= "&period=7"; showAllCharts();}
  if(testkey == 'w'){thisImgPCode= "&period=10"; showAllCharts();}
  if(testkey == 'm'){thisImgPCode= "&period=2062"; showAllCharts();}
  if(testkey == '5'){thisImgPCode= "&period=5012"; showAllCharts();}
  if(testkey == '1'){thisImgPCode= "&period=5000"; showAllCharts();}

  if(testkey == 'W'){window.open("https://web.whatsapp.com/");}
  if(testkey == 'f'){forwardChart();} // go forward to next list
  if(testkey == 'F'){forewardList();} // go forward to next list
  if(testkey == 'b'){backwardList();}
  if(testkey == 'B'){backwardList();}
  if(testkey == 'i'){window.open("https://williamkpchan.github.io/LibDocs/InspectChart.html", "_blank");}

  if(testkey == 'H'){window.open("monitorHSI.html");}
  if(testkey == 'A'){window.open("monitorA.html");}
//  if(testkey == 'e'){window.scrollTo(0,9999999);}
  if(testkey == 'e'){window.location = '#tocList';}
  if(testkey == 'l'){askaList();} // input a list of codes and store it
  if(testkey == 'R'){randomList();} // go forward to next list
  if(testkey == 'r'){randomChartinList();} // random jmp to a chart
  if(testkey == 's'){xunbao(chartPtCode);}
  if(testkey == 't'){window.scrollTo(0,0);}
  if(testkey == 'X'){window.open("https://williamkpchan.github.io/LibDocs/Random Charts.html");}
  if(testkey == 'z'){topicpointer = 12; showstkList();}

  if(testkey == '.'){showNextPage();}
  if(testkey == ','){showPrevPage();}
  if(testkey == "'"){window.open("https://williamkpchan.github.io/LibDocs/swipeChart.html");}
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
    localStorage.setItem("titleBar","temp list");
    $('#titlebar').text("temp list");
    location.reload();
  }
}

function _stkChartInit() {  // this is the shareList init
  if (localStorage.getItem("stkListArr") === null) {
    theList = "00700";
    $("#titlebar").empty();
    $('#titlebar').text("BigChip")
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
  localStorage.setItem("stkCode", xunbaocode)
  window.open(`https://williamkpchan.github.io/LibDocs/Random Charts.html?${xunbaocode}`);
}

function toACode(thecode) {
	if (thecode[0]=="6"){ thecode = thecode+".sh" }
	else { thecode = thecode+".sz" }
	return(thecode);
}
function selectList(){
  newList = eval(document.getElementById("selectList").value).split(" ");
  theList = newList;

  alert(" Total: " + theList.length + "\ndetails see end of this page.\nremember to modify mustadd list!\n" + newList)
        $("#message").text("Total: " + theList.length + "\n"+theList);

    localStorage.setItem("titleBar", document.getElementById("selectList").value);
    localStorage.setItem("stkListArr",theList.toString().replace(/\,/g," ")); // this is the shareList
    location.reload();

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
