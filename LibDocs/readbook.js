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
  else if(testkey == "j"){ jumpTo();}
  else if(testkey == "l"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  else if(testkey == "2"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  else if(testkey == "7"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight/2 + divtoc.offsetTop-600)}, 1); } //go to middle
  else if(testkey == "m"){ location = '#mustWatch';}
  else if(testkey == "p"){ pause();}
  // else if(testkey == "c"){ continU();}
  else if(testkey == "r"){ randomFlip();}
  else if(testkey == "5"){ randomFlip();}
  else if(testkey == "s"){ showMov();}
  else if(testkey == 't'){window.location = '#toc';}
  else if(testkey == '8'){window.location = '#toc';}
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
  else if(testkey == 'u'){window.open("https://www.worldometers.info/coronavirus/");}
  else if(testkey == "R"){ randomWL();}
  else if(testkey == "+"){ addtoWL();}
  else if(testkey == "-"){ rvFmWL();}
  else if(testkey == "a"){ askNum();}

  else{chkOtherKeys(testkey)} 
}
function getChar(event){
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which);}
  else {return null;}}

var topicLength;
var topicpointer = topicLength;

if (typeof markerName == 'undefined') {
  markerName = 'h2';
}

function changeTopic() {
 if (topicpointer >= topicLength) { topicpointer = 1;}
 else if (topicpointer < 0) { topicpointer = topicLength;}
 else { topicpointer = topicpointer + 1;}
 showTopic()
}
function backward() { topicpointer = topicpointer - 2; changeTopic();}
function foreward() { changeTopic();}
function showTopic() {
  window.location = "#topic-" + topicpointer;
  notvisitedList = notvisitedList.filter(item => item !== topicpointer) // remove topicpointer
  if(notvisitedList.length == 0){
   notvisitedList = [...Array(totalLength).keys()];
  }
}
function jumpto(index) { topicpointer = index; showTopic();}
function randomFlip() {
  topicpointer = notvisitedList[Math.floor(Math.random() * notvisitedList.length)]; // random from not visited list
  // console.log(notvisitedList.length, topicpointer)

  var index = notvisitedList.indexOf(topicpointer);
  notvisitedList = notvisitedList.splice(index, 1);

  showTopic();
}

function jumpTo() {
  var thecode = prompt("Jump to item number:", "");
  if (thecode != null && thecode != "") {
    topicpointer = notvisitedList[Math.floor(Math.random() * notvisitedList.length)]; // random from not visited list
    showTopic();
  }
}

var toc = $('#toc');
if(markerName != "h0"){
  $(markerName).each(function(i) {
      var topic = $(this), topicNumber = i; topicLength = topicNumber +1;
  
      if (typeof(showTopicNumber) !== 'undefined'){
        if (showTopicNumber == true){
          toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');
        }else{
          toc.append('<a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');
        }
      }else{
        toc.append('<a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');
      }
      // toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');
      topic.attr('id', 'topic-' + topicNumber);
  });
}

var totalLength = topicLength
notvisitedList = [...Array(totalLength).keys()];

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



randomFlip();
$("#mustWatch").append('<pre><br><span class="silver">keys: <br>r random article<br>5 random article<br>b backward<br>4 backward<br>f foreward<br>6 foreward<br><br>t top of table<br>8 top of table<br>l last of table<br>2 last of table<br>7 go to table middle<br><br>T Top of page<br>e end of page<br><br>m mustWatch<br>p pause<br>c continU<br>s showPage<br><br>K set bookmark<br>k open bookmark</span><br>R randomWL; + addtoWL; - rvFmWL; a askNum</pre>');



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
  showTopic();
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

