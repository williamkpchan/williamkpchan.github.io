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
  if(testkey == "l"){divtoc = document.getElementById("toc");$('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  if(testkey == "2"){divtoc = document.getElementById("toc");$('body,html').animate({scrollTop:(divtoc.clientHeight + divtoc.offsetTop-600)}, 1); }
  if(testkey == "m"){ location = '#mustWatch';}
  if(testkey == "p"){ pause();}
  if(testkey == "c"){ continU();}
  if(testkey == "r"){ randomFlip();}
  if(testkey == "5"){ randomFlip();}
  if(testkey == "s"){ showMov();}
  if(testkey == 't'){window.location = '#toc';}
  if(testkey == '8'){window.location = '#toc';}
  if(testkey == 'T'){window.scrollTo(0,0);}
}
function getChar(event){
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)}
  else {return null}}

var topicLength

function changeTopic() {
 if (topicpointer >= topicLength) { topicpointer = 1;}
 else if (topicpointer < 0) { topicpointer = topicLength;} 
 else { topicpointer = topicpointer + 1;}
 showTopic()
}
function backward() { topicpointer = topicpointer - 2; changeTopic();}
function foreward() { changeTopic();}
function showTopic() { window.location = "#topic-" + topicpointer;}
function jumpto(index) { topicpointer = index; showTopic();}
function randomFlip() {topicpointer = Math.floor(Math.random() * topicLength); changeTopic();}

var toc = $('#toc');
$('h2').each(function(i) {
    var topic = $(this), topicNumber = i + 1; topicLength = topicNumber;
    toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');
    topic.attr('id', 'topic-' + topicNumber);
});
var topicpointer = topicLength

