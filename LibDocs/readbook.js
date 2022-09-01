var divtoc = document.getElementById("toc");

$(document).ready(function(){
  $('h1, h2, h3, h4, h5, .goldword, strong,  div.title').click(function(){
  parent.history.back();
  $('#mustWatch').prepend("<br><br>=======================================================================<br>");
  return false;
  });
});

function chkKey() {
  var testkey = getChar(event);
  if(testkey == "b"){ backward();}
  else if(testkey == "4"){ backward();}
  else if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
  else if(testkey == "f"){ foreward();}
  else if(testkey == "6"){ foreward();}
  else if(testkey == 'A'){autoShowImg(imgnotvisitedList.length)}
  else if(testkey == "j"){ jumpToAsk();}
  else if(testkey == "l"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-400)}, 1);}

  else if(testkey == "2"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-400)}, 1);}

  else if(testkey == "7"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight/2 + divtoc.offsetTop-400)}, 1); } //go to middle
  else if(testkey == "m"){ location = '#mustWatch';}
  else if(testkey == "p"){ pause();}
  // else if(testkey == "c"){ continU();}
  else if(testkey == "r"){ randomWL();}
  else if(testkey == "5"){ randomFlip();}
  else if(testkey == "s"){ showMov();}
  else if(testkey == 't'){window.location = '#toc';
      window.scrollTo(window.scrollX, window.scrollY - 200);}

  else if(testkey == '8'){window.location = '#toc';
      window.scrollTo(window.scrollX, window.scrollY - 200);}
  else if(testkey == 'T'){window.scrollTo(0,0);}
  else if(testkey == 'B'){window.open("https://williamkpchan.github.io/LibDocs/汉语字典.html");}

  else if(testkey == "K"){ 
    pos = document.getElementsByTagName("body")[0].scrollTop;
    if(typeof bookid == 'undefined') { bookid = $('title').text() }
    storeBookmark(bookid, pos.toString());
  }
  else if(testkey == "k"){
    if(typeof bookid != 'undefined') {loadBookmark(bookid);}
    else{alert("No BookId!")}
  }
  else if(testkey == 'd'){window.open("https://www.youdao.com/");}
  else if(testkey == "R"){ randomFlip();}
  else if(testkey == "+"){ addtoWL();}
  else if(testkey == "-"){ rvFmWL();}
  else if(testkey == "a"){ askNum();}
  else if(testkey == "w"){ setwaitListSize();}
  else if(testkey == "z"){ dblClickIt();}
  else if(testkey == 'v'){ viewImgSource();} //imgControl.js

  else{chkOtherKeys(testkey)} 
}
function getChar(event){
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which);}
  else {return null;}}

var topicLength;
topicpointer = topicLength;

if (typeof markerName == 'undefined') {
  markerName = 'h2';
}

function changeTopic() {
 if (topicpointer >= topicLength-1) { topicpointer = 0;}
 else if (topicpointer < 0) { topicpointer = topicLength-1;}
 else { topicpointer = topicpointer + 1;}
 showTopic()
}
function backward() { topicpointer = topicpointer - 2; changeTopic();}
function foreward() { topicpointer = topicpointer + 1; showTopic();}
function autoShowImg(countNumber) {
  console.log("auto")
  if (countNumber > 0) {
    foreward()
    setTimeout(() => autoShowImg(countNumber - 1), elapseTIme)
  }
}

function showTopic() {
  if(topicpointer>topicLength){topicpointer = topicLength}
  window.location = "#topic-" + topicpointer;
  notvisitedList = notvisitedList.filter(item => item !== topicpointer) // remove topicpointer
  if(notvisitedList.length == 0){
   notvisitedList = [...Array(totalLength).keys()];
  }
  console.log(topicpointer)
}
function jumpto(index) { topicpointer = index; showTopic();}
function randomFlip() {
  topicpointer = notvisitedList[Math.floor(Math.random() * notvisitedList.length)]; // random from not visited list
  // console.log(notvisitedList.length, topicpointer)

  var index = notvisitedList.indexOf(topicpointer);
  notvisitedList.splice(index, 1);

  showTopic();
}

function jumpToAsk() {
  var thecode = prompt("Jump to item number:", totalLength-1);
  if (thecode != null && thecode != "") {
    // topicpointer = notvisitedList[Math.floor(Math.random() * notvisitedList.length)]; // random from not visited list
    topicpointer = Number(thecode);
    showTopic();
  }
}

var toc = $('#toc');
var markerList = []
waitList = []
elapseTIme = 5000

if(typeof(topicEnd) == 'undefined'){ topicEnd = "<br>";}

if(markerName != "h0"){

  $(markerName).each(function(i) {
      // prepare for the toc
      var topic = $(this), topicNumber = i; topicLength = topicNumber +1;

      // make a content list
      var markerContent = $(this).text();
      markerList.push(markerContent);
  
      // toc coding here
      if (typeof(showTopicNumber) !== 'undefined'){
        if (showTopicNumber == true){
          toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a>'+topicEnd);
        }else{
          toc.append('<a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a>'+topicEnd);
        }
      }else{
        toc.append('<a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a><br>');
      }
      // toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');

      // modify the target id
      topic.attr('id', 'topic-' + topicNumber);
  });
}

totalLength = topicLength
notvisitedList = [...Array(totalLength).keys()];
imgnotvisitedList = notvisitedList

function storeBookmark(objName, pagepos) {
  if(typeof objName != 'undefined') {
    localStorage.setItem(objName, pagepos.toString())
//    alert("Bookmark changed! " + objName +" " + pagepos)
  }else{alert("No BookId!")}
}
function loadBookmark(objName) {
  pos = Number(localStorage.getItem(objName))
  console.log("Bookmark loaded! " + objName + " " + pos)
  $('body').animate({scrollTop: pos}, 0);
}

// learningMode package //
// totalLength already exist

// init the removeList
var rvListName = "removeList"
window[rvListName] = window["bookid"] + " rvList" // removeList is variable name now

if (localStorage.getItem(removeList) === null) {
    localStorage.setItem(removeList, 0)
    rMList = 0
}else{
    rMList = localStorage.getItem(removeList).split(",").map(Number)
}

// init waitListSize
var waitListSizeName = "waitListBuf"
window[waitListSizeName] = window["bookid"] + " waitSize" // waitListSize is variable name now

if (localStorage.getItem(waitListBuf) === null) {
    localStorage.setItem(waitListBuf, 10)
    waitListSize = 10
}else{
    waitListSize = parseInt(localStorage.getItem(waitListBuf))
    if(waitListSize == 0){ waitListSize = 10 }
}


// init waitingList
var waitListName = "waitingList"
window[waitListName] = window["bookid"] + " waitList" // waitingList is variable name now

if (localStorage.getItem(waitingList) === null | localStorage.getItem(waitingList) === "NaN") {
    initWaitList()
}else{
    waitList = localStorage.getItem(waitingList).split(",").map(Number)
    if(waitList == [0]){ initWaitList() }
}

function initWaitList() {
    // generate random pointers
    waitList = Array(waitListSize).fill().map(() => Math.round(Math.random() * totalLength))
    waitList = [...new Set(waitList)]    // set unique
    localStorage.setItem(waitingList, waitList)
}

function randomWL() {
  pointerList = waitList
  if(waitList.length > waitListSize){
    pointerList.splice(waitListSize, (pointerList.length - waitListSize));
  }
  newPointer = pointerList[Math.floor(Math.random() * pointerList.length)];
  while(newPointer == topicpointer){
    newPointer = pointerList[Math.floor(Math.random() * pointerList.length)];
  }
  topicpointer = newPointer;
  showTopic();
}

function addtoWL() {
     console.log(topicpointer)
	waitList.push(topicpointer)
	waitList = Array.from(new Set(waitList)).sort(function(a, b){return a - b});
	localStorage.setItem(waitingList, waitList)
	alert("added topic: " +topicpointer + "\ntopic length: " + waitList.length + ", topic quota: " + waitListSize + "\nwaitList: " + waitList)
}
function rvFmWL() {
	ItemIndex = waitList.indexOf(topicpointer);
	if (ItemIndex > -1) { waitList.splice(ItemIndex, 1); }
	waitList = [...new Set(waitList)]; // set unique
	localStorage.setItem(waitingList, waitList)
	alert("topicpointer "+topicpointer + ", removed fm waitList! Remaining: " + waitList)
}

function askNum() {
    thecode = prompt("Include Topic Number:", "");
    if (thecode != null && thecode != "") {
		topicpointer = parseInt(thecode)
		addtoWL()
    }else{
      return;
    }
}


function setwaitListSize() {
    thecode = prompt("Current buffer size: " + waitListSize + ", Set new buffer size: ", "");
    if (thecode != null && thecode != "") {
      localStorage.setItem(waitListBuf, thecode)
      waitListSize = parseInt(thecode)
    }else{
      return;
    }
}

// function to jump to content target, jump by this method may f and b
function findContent(item) {
  for (let i = 0; i < markerList.length; i++) {
    if (markerList[i].includes(item)) {
      topicpointer = i;
      showTopic()
    }
  }
}


function showMov() {
  idstring = "#topic-" + topicpointer;
  $(idstring).click()
}

function dblClickIt() {
  idstring = "#topic-" + topicpointer;
  $(idstring).dblclick();
}


// Make anchor link go some pixels above
window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 20);
});

// learningMode package complete//

randomWL();
$("#mustWatch").append('<pre><br><span class="silver">快捷键: <br>r, 5 跳任意书签 R, 跳任意题目 b, 4 前一题目 f, 6 下一题目<br><br>t, 8 目录顶 l, 2 目录底 7 目录中部<br><br>T 网页顶 e 网页底 m 必看<br><br>K 设特定书签 k 跳到特定书签</span><br>多书签管理- R 跳任意书签; + 目前题目加入书签; - 目前题目删除书签; a 手动书签<br>w 设定多书签容量<br>按space 继续往下</pre>');
