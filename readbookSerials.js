var toc = $('#toc');
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
  showImg();
}
function chkKey() {
  var testkey = getChar(event);

  if(testkey == "b"){ backward();}
  else if(testkey == "4"){ backward();}
  else if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
  else if(testkey == "f"){ foreward();}
  else if(testkey == "6"){ foreward();}
  else if(testkey == "l"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  else if(testkey == "2"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  else if(testkey == "7"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight/2 + divtoc.offsetTop-600)}, 1); } //go to middle
  else if(testkey == "m"){ location = '#mustWatch';}
  else if(testkey == "p"){ pause();}
  else if(testkey == "c"){ continU();}
  else if(testkey == "r"){ randomFlip();}
  else if(testkey == "5"){ randomFlip();}
  else if(testkey == "s"){ showMov();}
  else if(testkey == "0"){ showMov();}
  else if(testkey == 't'){window.location = '#toc';}
  else if(testkey == '8'){window.location = '#toc';}
  else if(testkey == 'T'){window.scrollTo(0,0);}

  else if(testkey == "K"){ 
    if(typeof bookid == 'undefined') { bookid = $('title').text() }
    storeBookmark(bookid, topicpointer.toString());
  }
  else if(testkey == "k"){
    if(typeof bookid != 'undefined') {loadBookmark(bookid);}
    else{alert("No BookId!")}
  }
  else if(testkey == "R"){ randomWL();}
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
 showImg();
}
function backward() { topicpointer = topicpointer - 2; changeImg();}
function foreward() { changeImg();}
function pause() { clearInterval(myVar);}
function continU() { myVar = setInterval(changeImg, timer); foreward()}
function showImg() { var thePointerImg = document.querySelector(".imagearea");
 thePointerImg.innerHTML = ImgList[topicpointer];
 // console.log(thePointerImg.innerHTML);
 scroll(0,0);
 lazyLoadInstance.update();
 notvisitedList = notvisitedList.filter(item => item !== topicpointer) // remove topicpointer
 if(notvisitedList.length==0){
  notvisitedList = [...Array(ImgList.length).keys()];
 }
 console.log("now notvisitedList.length "+ notvisitedList.length);
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
 showImg();
}

function storeBookmark(objName, chapterNum) {
  if(typeof objName != 'undefined') {
    localStorage.setItem(objName, chapterNum.toString())
  }else{alert("No BookId!")}
}
function loadBookmark(objName) {
  topicpointer = parseInt(localStorage.getItem(objName))
  showImg();
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
  randomFlip();
  changeImg();
    return false;
}


randomFlip();
changeImg();
retstr = ' '.repeat(80);
$("#mustWatch").prepend('<pre><br>===============<br><br>');
$("#mustWatch").append('<pre><br><span class="silver">keys: <br>t top of table<br>8 top of table<br>l last of table<br>2 last of table<br>7 go to table middle<br><br>T Top of page<br>e end of page<br>m mustWatch<br><br>r random mustWatch<br>5 random mustWatch<br>f foreward<br>6 foreward<br>b backward<br>4 backward<br><br>p pause<br>c continU<br>s showPage<br>0 showPage<br><br>K set bookmark<br>k open bookmark</span><br>多书签管理- R 跳任意书签; + 加书签; - 减书签; a 手动书签</pre>');

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

// init waitingList
var waitListName = "waitingList"
window[waitListName] = window["bookid"] + " waitList" // waitingList is variable name now

if (localStorage.getItem(waitingList) === null) {
    localStorage.setItem(waitingList, [0,1,2,3,4])
    waitList = [1,2,3,4,5]
}else{
    waitList = localStorage.getItem(waitingList).split(",").map(Number)
}

function randomWL() {
  newPointer = waitList[Math.floor(Math.random() * waitList.length)];
  while(newPointer == topicpointer){
    newPointer = waitList[Math.floor(Math.random() * waitList.length)];
  }
  topicpointer = newPointer;
  showImg();
}

function addtoWL() {
     console.log(topicpointer)
	waitList.push(topicpointer)
	waitList = Array.from(new Set(waitList))
	localStorage.setItem(waitingList, waitList)
	alert("waitList: " + waitList)
}
function rvFmWL() {
	ItemIndex = waitList.indexOf(topicpointer);
	if (ItemIndex > -1) { waitList.splice(ItemIndex, 1); }
	waitList = [...new Set(waitList)]; // set unique
	localStorage.setItem(waitingList, waitList)
	alert("topicpointer "+topicpointer + " removed fm waitList! Remaining: " + waitList)
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

// learningMode package complete//

