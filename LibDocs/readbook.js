var divtoc = document.getElementById("toc");

$(document).ready(function(){
  $('h1, h2, h3, h4, h5, .goldword, strong,  div.title').click(function(){
  parent.history.back();
  return false;
  });
});

function chkKey() {
  var testkey = getChar(event);
  if(testkey == "b"){ backward();}
  if(testkey == "4"){ backward();}
  if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}
  if(testkey == "f"){ foreward();}
  if(testkey == "6"){ foreward();}
  if(testkey == "l"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  if(testkey == "2"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  if(testkey == "7"){
    $('body,html').animate({scrollTop:(divtoc.clientHeight/2 + divtoc.offsetTop-600)}, 1); } //go to middle
  if(testkey == "m"){ location = '#mustWatch';}
  if(testkey == "p"){ pause();}
  if(testkey == "c"){ continU();}
  if(testkey == "r"){ randomFlip();}
  if(testkey == "5"){ randomFlip();}
  if(testkey == "s"){ showMov();}
  if(testkey == 't'){window.location = '#toc';}
  if(testkey == '8'){window.location = '#toc';}
  if(testkey == 'T'){window.scrollTo(0,0);}

  if(testkey == "K"){ 
    pos = document.getElementsByTagName("body")[0].scrollTop;
    if(typeof bookid == 'undefined') { bookid = $('title').text() }
    storeBookmark(bookid, pos.toString());
  }
  if(testkey == "k"){
    if(typeof bookid != 'undefined') {loadBookmark(bookid);}
    else{alert("No BookId!")}
  }
  if(testkey == 'd'){window.open("https://www.youdao.com/");}
  if(testkey == 'u'){window.open("https://www.worldometers.info/coronavirus/");}
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
  if(notvisitedList.length==0){
   notvisitedList = [...Array(totalLength).keys()];
  }
}
function jumpto(index) { topicpointer = index; showTopic();}
function randomFlip() {
  topicpointer = notvisitedList[Math.floor(Math.random() * notvisitedList.length)]; // random from not visited list
  showTopic();
}


var toc = $('#toc');
$('h2').each(function(i) {
    var topic = $(this), topicNumber = i + 1; topicLength = topicNumber;

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
var totalLength = topicLength
var notvisitedList = [...Array(totalLength).keys()];

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
$("#mustWatch").append('<pre><br><span class="silver">keys: <br>r random article<br>5 random article<br>b backward<br>4 backward<br>f foreward<br>6 foreward<br><br>t top of table<br>8 top of table<br>l last of table<br>2 last of table<br>7 go to table middle<br><br>T Top of page<br>e end of page<br><br>m mustWatch<br>p pause<br>c continU<br>s showPage<br><br>K set bookmark<br>k open bookmark</span></pre>');

