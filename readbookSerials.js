var toc = $('#toc');
var patt1 = /(<h2>).*(<\/h2>)/i;
var patt2 = /(<h2[^>]*>|<\/h2>)/g;

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
if(testkey == "4"){ backward();}
if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
if(testkey == "f"){ foreward();}
if(testkey == "6"){ foreward();}
if(testkey == "l"){divtoc = document.getElementById("toc");$('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
if(testkey == "2"){divtoc = document.getElementById("toc");$('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
if(testkey == "m"){ location = '#mustWatch';}
if(testkey == "p"){ pause();}
if(testkey == "c"){ continU();}
if(testkey == "r"){ randomFlip();}
if(testkey == "5"){ randomFlip();}
if(testkey == "s"){ showMov();}
if(testkey == "0"){ showMov();}
if(testkey == 't'){window.location = '#toc';}
if(testkey == '8'){window.location = '#toc';}
if(testkey == 'T'){window.scrollTo(0,0);}
}
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
//ImgList = shuffle(Array.from(Array(ImgList.length).keys()))
ImgList.forEach(makeTOC);
function changeImg() {
 if (topicpointer >= ImgList.length - 1) { topicpointer = 0;}
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
 console.log(list);
 window.open(list);
}
function randomFlip() { topicpointer = Math.floor(Math.random() * ImgList.length); changeImg();}
randomFlip();
changeImg();
