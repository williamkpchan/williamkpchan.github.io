var tocList = $('#tocList');
var patt1 = /(<h2>).*(<\/h2>)/i;
var patt2 = /(<h2[^>]*>|<\/h2>)/g;
var topicpointer = 0;
chartPtCode = "00700";

ImgList.forEach(maketocList);

var totalLength = ImgList.length - 1
var notvisitedList = [...Array(totalLength).keys()];

function maketocList(theStr, index) {
  var topic = theStr.match(patt1)[0];
  topic = topic.replace(patt2, "");
  tocList.append((index +1) + ' <span class="gray" onclick="jumpto(' + index + ')">' + topic +'</span> ');
}

function jumpto(index) {
  topicpointer = index;
  showstkList();
}

function forewardList() {
  if (topicpointer >= ImgList.length -1) { topicpointer = 0;}
  else if (topicpointer < 0) { topicpointer = 0;} 
  else { topicpointer = topicpointer + 1;}
  showstkList();
}
function backwardList() {
  if (topicpointer == 0) { topicpointer = ImgList.length - 1;}
  else { topicpointer = topicpointer - 1;}
  showstkList();
}

function showstkList() {
  var theList = ImgList[topicpointer];
  var title = theList.match(patt1)[0];
  var listDetail = theList.replace(title, "");

  if (theList != null && theList != "") {
    localStorage.setItem("stkListArr",listDetail); // this is used in lostofchart.js
    localStorage.setItem("titleBar",title);

    window.scrollTo(0,0);
    _stkChartInit()
    showAllCharts();
  }
}

function randomList() {
  topicpointer = Math.floor(Math.random() * ImgList.length);
  showstkList();
}

function randomChartinList() {
  chartrtpointer = Math.floor(Math.random() * theList.length);
  chartrtpointerImg = "#imgp" + chartrtpointer;
  chartPtCode = theList[chartrtpointer]

  var index = notvisitedList.indexOf(topicpointer);
  notvisitedList.splice(index, 1);

  window.location = chartrtpointerImg;
}


