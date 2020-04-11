var tocList = $('#tocList');
var patt1 = /(<h2>).*(<\/h2>)/i;
var patt2 = /(<h2[^>]*>|<\/h2>)/g;
var topicpointer = ImgList.length;

ImgList.forEach(maketocList);

function maketocList(theStr, index) {
  var topic = theStr.match(patt1)[0];
  topic = topic.replace(patt2, "");
  tocList.append((index +1) + ' <span class="gray" onclick="jumpto(' + index + ')">' + topic +'</span> ');
}

function jumpto(index) {
  topicpointer = index;
  showstkList();
}

function showstkList() {
  var theList = ImgList[topicpointer];
  var topic = theList.match(patt1)[0];
  topic = theList.replace(topic, "");
  if (theList != null && theList != "") {
    localStorage.setItem("stkListArr",topic);
    window.scrollTo(0,0);
    location.reload();
  }
}
