var toc = $('#toc');
var markerList = []
waitList = []

var patt1 = /(<h2>).*(<\/h2>)/i;
var patt2 = /(<h2[^>]*>|<\/h2>)/g;
var divtoc = document.getElementById("toc");
var notvisitedList = [...Array(ImgList.length).keys()];
  //var script = document.createElement('script');
  //script.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@13.0.1/dist/lazyload.min.js';
  //script.onload = function() {lazyLoadInstance.update();}
  //document.getElementsByTagName('head')[0].appendChild(script);

function makeTOC(theStr, index) {
  var topic = theStr.match(patt1)[0];
  topic = topic.replace(patt2, "");
  toc.append((index +1) + ' <span class="gray" onclick="jumpto(' + index + ')">' + topic +'</span><br>');
}

function jumpto(index) {
  topicpointer = index;
  showTopic();
}
function chkKey() {
  var testkey = getChar(event);

  if(testkey == "b"){ backward();}
  else if(testkey == "4"){ backward();}
  else if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
  else if(testkey == "f"){ foreward();}
  else if(testkey == "6"){ foreward();}
  else if(testkey == "l"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1);
      window.scrollTo(window.scrollX, window.scrollY + 200);}

  else if(testkey == "2"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1);
      window.scrollTo(window.scrollX, window.scrollY + 200);}
  else if(testkey == "7"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight/2 + divtoc.offsetTop-600)}, 1); } //go to middle
  else if(testkey == "m"){ location = '#mustWatch';}
  else if(testkey == "p"){ pause();}
  else if(testkey == "c"){ continU();}
  else if(testkey == "r"){ randomWL();}
  else if(testkey == "5"){ randomWL();}
  else if(testkey == "s"){ showMov();}
  else if(testkey == "0"){ showMov();}
  else if(testkey == "w"){ setwaitListSize();}
  else if(testkey == 't'){window.location = '#toc';
      window.scrollTo(window.scrollX, window.scrollY - 150);}
  else if(testkey == '8'){window.location = '#toc';
      window.scrollTo(window.scrollX, window.scrollY - 150);}
  else if(testkey == 'T'){window.scrollTo(0,0);}

  else if(testkey == "K"){ 
    if(typeof bookid == 'undefined') { bookid = $('title').text() }
    storeBookmark(bookid, topicpointer.toString());
  }
  else if(testkey == "k"){
    if(typeof bookid != 'undefined') {loadBookmark(bookid);}
    else{alert("No BookId!")}
  }
  else if(testkey == "R"){ randomFlip();}
  else if(testkey == "+"){ addtoWL();}
  else if(testkey == "-"){ rvFmWL();}
  else if(testkey == "a"){ askNum();}

  else if(testkey == 'd'){window.open("https://www.youdao.com/");}
  else{chkOtherKeys(testkey);}
}

function getChar(event){if (event.which!=0 && event.charCode!=0) {return String.fromCharCode(event.which)}
 else {return null}}

var topicpointer = ImgList.length -1, timer = 15000
function shuffle(array) {
 var i = ImgList.length, j = 0, temp;
 while (i--) { j = Math.floor(Math.random() * (i+1))
  temp = ImgList[i];  ImgList[i] = ImgList[j];  ImgList[j] = temp;
 } 
 return ImgList;
}
//ImgList = shuffle(Array.from(Array(ImgList.length).keys()))
ImgList.forEach(makeTOC);
function changeImg() {
 if (topicpointer > ImgList.length - 1) { topicpointer = 0;}
 else if (topicpointer < 0) { topicpointer = ImgList.length - 1;} 
 else { topicpointer = topicpointer + 1;}
 // console.log(topicpointer);
 showTopic();
}
function backward() { topicpointer = topicpointer - 2; changeImg();}
function foreward() { changeImg();}
function pause() { clearInterval(myVar);}
function continU() { myVar = setInterval(changeImg, timer); foreward()}
function showTopic() {
  var thePointerImg = document.querySelector(".imagearea");
  thePointerImg.innerHTML = ImgList[topicpointer];
  // console.log(thePointerImg.innerHTML);
  scroll(0,0);
  //lazyLoadInstance.update();
  notvisitedList = notvisitedList.filter(item => item !== topicpointer) // remove topicpointer
  if(notvisitedList.length==0){
    notvisitedList = [...Array(ImgList.length).keys()];
  }
  console.log(topicpointer);
}
function showMov() { var imgAdr = ImgList[topicpointer];
 var start = imgAdr.indexOf('<a href="');
   console.log("start number is " + start);

 if(start == -1){
   return;
 } else {
   start = start + 8;
 }

 var end = imgAdr.indexOf('"', start+1);
 var list = imgAdr.substring(start+1, end);
 //console.log(list);
 window.open(list);
}
function randomFlip() {
 console.log("notvisitedList.length " + notvisitedList.length)
 topicpointer = notvisitedList[Math.floor(Math.random() * notvisitedList.length)]; // random from not visited list
 console.log("topicpointer " + topicpointer);
 showTopic();
}

function storeBookmark(objName, chapterNum) {
  if(typeof objName != 'undefined') {
    localStorage.setItem(objName, chapterNum.toString())
  }else{alert("No BookId!")}
}
function loadBookmark(objName) {
  topicpointer = parseInt(localStorage.getItem(objName))
  showTopic();
}
function LoadJs(src, callback) {
    var script = document.createElement('script');
    script.setAttribute('src', src);
    script.addEventListener('load', callback);
    document.head.appendChild(script);
}

function reTOC() {
  document.getElementById("toc").innerHTML = ""; // clear old TOC
  notvisitedList = [...Array(ImgList.length).keys()];
  topicpointer = ImgList.length -1
  ImgList.forEach(makeTOC);
  randomWL();
  changeImg();
    return false;
}


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

if (localStorage.getItem(waitingList) === null) {
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

function setwaitListSize() {
    thecode = prompt("Current buffer size: " + waitListSize + ", Set new buffer size: ", "");
    if (thecode != null && thecode != "") {
      localStorage.setItem(waitListBuf, thecode)
      waitListSize = parseInt(thecode)
    }else{
      return;
    }
}

function initWaitList() {
    // generate random pointers
    waitList = Array(10).fill().map(() => Math.round(Math.random() * ImgList.length))
    waitList = [...new Set(waitList)]    // set unique
    localStorage.setItem(waitingList, waitList)
}

function randomWL() {
  pointerList = waitList
  if(waitList.length > 10){
    pointerList.splice(10, (pointerList.length - 10));
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
	waitList = Array.from(new Set(waitList))
	localStorage.setItem(waitingList, waitList)
	alert("added topic: " +topicpointer+ "\nwaitList: " + waitList)
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

// function to jump to content target, jump by this method may f and b
function findContent(item) {
  for (let i = 0; i < markerList.length; i++) {
    if (markerList[i].includes(item)) {
      topicpointer = i;
      showTopic()
    }
  }
}

// Make anchor link go some pixels above
window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 20);
});

// learningMode package complete//

retstr = ' '.repeat(80);
randomWL();
changeImg();

$("#mustWatch").append('<pre><br><span class="silver">快捷键: <br>r, 5 跳任意书签 R, 跳任意题目 b, 4 前一题目 f, 6 下一题目<br><br>t, 8 目录顶 l, 2 目录底 7 目录中部<br><br>T 网页顶 e 网页底 m 必看<br><br>K 设特定书签 k 跳到特定书签</span><br>多书签管理- R 跳任意书签; + 目前题目加入书签; - 目前题目删除书签; a 手动书签<br>按space 继续往下</pre>');

