function makeTOC(theStr, index) {
	var topic = theStr.match(patt1)[0];
	topic = topic.replace(patt2, "");
	toc.append('<span onclick="jumpto(' + index + ')">' +(index+1)+". "+ topic +'</span><br>');
}

function jumpto(index) {
	topicpointer = index;
	showImg();
}
function chkKey() {
var testkey = getChar(event);
if(testkey == "b"){ backward();}
if(testkey == "f"){ foreward();}
if(testkey == "p"){ pause();}
if(testkey == "c"){ continU();}
if(testkey == "s"){ showMov();}}
function getChar(event){if (event.which!=0 && event.charCode!=0) {return String.fromCharCode(event.which)}
 else {return null}}

var topicpointer = ImgList.length, timer = 15000
function shuffle(array) {
 var i = ImgList.length, j = 0, temp;
 while (i--) { j = Math.floor(Math.random() * (i+1))
  temp = ImgList[i];  ImgList[i] = ImgList[j];  ImgList[j] = temp;
 } 
 return ImgList;
}
ImgList = shuffle(Array.from(Array(ImgList.length).keys()))
ImgList.forEach(makeTOC);
function changeImg() {
 if (topicpointer >= ImgList.length - 1) { topicpointer = 0;}
 else if (topicpointer < 0) { topicpointer = ImgList.length - 1;} 
 else { topicpointer = topicpointer + 1;}
 showImg()
}
function backward() { topicpointer = topicpointer - 2; changeImg();}
function foreward() { changeImg();}
function pause() { clearInterval(myVar);}
function continU() { myVar = setInterval(changeImg, timer); foreward()}
function showImg() { var thePointerImg = document.querySelector(".imagearea");
 thePointerImg.innerHTML = ImgList[topicpointer];
 console.log(thePointerImg.innerHTML);
 scroll(0,0);
}
function showMov() { var imgAdr = ImgList[topicpointer];
 var start = imgAdr.indexOf("=\"")+1;
 var end = imgAdr.indexOf('"></a>', start+1);
 var list = imgAdr.substring(start+1, end);
 console.log(list);
 window.open(list);
}
changeImg();
