ignoreLstName = bookid + "IgnoreLst"
if (typeof showSrcSwitch == 'undefined') {
    showSrcSwitch = false;  // showSrcSwitch to control display dom content
}
if (typeof breakLine == 'undefined') {
    breakLine = false;  // breakLine to break content into two parts
}

ignoreLst = localStorage.getItem(window["ignoreLstName"]);
if (ignoreLst === null) {
    ignoreLst = []
    localStorage.setItem(window["ignoreLstName"], ignoreLst);
} else{
    ignoreLst = localStorage.getItem(window["ignoreLstName"]).split(',');
    ignoreLst = ignoreLst.map(unaryOp)
}

automodeSwitch = false
tipLimit = tipsList.length; // Tip Limit counter
timeInterval = 10000

allIdx = Array.from(Array(tipLimit).keys())
rm_ignoreLst()

// remove ignoreLst elements
function rm_ignoreLst() {
  ignoreLst = localStorage.getItem(window["ignoreLstName"]);
  if(ignoreLst != null){
     ignoreLst = ignoreLst.split(',');
     ignoreLst = ignoreLst.map(unaryOp)
     if(ignoreLst.length > 0 && ignoreLst !=""){
       for(loop = 0; loop < ignoreLst.length; loop++){
         ItemIndex = allIdx.indexOf( ignoreLst[loop] );
         allIdx.splice(ItemIndex, 1)
       }
     }
  }
}

// Function that converts string to number
function unaryOp(value) { return +value; }

if (typeof initSelectRange == 'undefined') {
  initSelectRange = 50;
}

if(tipLimit > initSelectRange){
  selectRange = initSelectRange
}else{
  selectRange = tipLimit
}
init_theRange(selectRange)

function init_theRange(newRange) {
  old_selectRange = selectRange
  if(newRange > 10 && newRange <= tipLimit && selectRange <= tipLimit){
    selectRange = newRange
  }else{
    selectRange = tipLimit
  }
  rm_ignoreLst();
  tipsListIdx = allIdx.slice(0, selectRange); // select the leading items

  // shuffle the remaining pointers
  tipsListIdx = shuffle(tipsListIdx)
  topicpointer = 0

  if( old_selectRange != selectRange ) {
      alert("selected tips number: " + selectRange)
  }

  generateTip()
}

function generateTip() {
  if(topicpointer>tipsListIdx.length){
     topicpointer = Math.floor(Math.random() * (tipsListIdx.length -1))
  }
  console.log("IdxPointer: ", tipsListIdx[topicpointer])
  tip = tipsList[tipsListIdx[topicpointer]];
  if(breakLine == true){
    tip = tip.split("\t");
    Qtip = tip[0]
    Atip = tip[1]
    document.querySelector('.js-tip').innerHTML = Qtip;
    document.querySelector('.answer-tip').innerHTML = Atip;
  }else{
    document.querySelector('.js-tip').innerHTML = tip;
  }

  $('.answer-tip').hide();


  $("#dateAndTime").click()
  document.querySelector('.tip-button').innerHTML = tipsListIdx[topicpointer] + " of " + tipsList.length
  document.querySelector('.tip-button').focus();

  if(showSrcSwitch == true){
     console.log("showSrcSwitch ", showSrcSwitch)
     $(".Notes").text('\n'+ $('.js-tip').find('img').attr('src') )
  }else{
     console.log("showSrcSwitch ", showSrcSwitch)
     $(".Notes").text('')
  }
}

function forward() {
    console.log("topicpointer", topicpointer)
    if (!(topicpointer >= 0 && topicpointer < (selectRange-1) && topicpointer < (tipLimit-1) ) ){
       init_theRange(selectRange)
       topicpointer = -1
    }
    topicpointer = topicpointer + 1;
    generateTip();
}

function backClick() {
    if (!(topicpointer > 0 && topicpointer <= (selectRange-1) && topicpointer <= (tipLimit-1))) {
       init_theRange(selectRange)
       topicpointer = selectRange
    }
    topicpointer = topicpointer - 1;
    generateTip();
}

function chkKey() {
  var testkey = getChar(event);
  console.log(testkey)
  if(testkey == 'a'){window.open("https://williamkpchan.github.io/apptechno.html");}
  else if(testkey == 'A'){toggle_automode();}
  else if(testkey == 'b'){backClick();}
  else if(testkey == 'c'){callCalculator();}
  else if(testkey == 'd'){window.open("https://www.youdao.com/");}
  else if(testkey == 'E'){window.open("https://williamkpchan.github.io/LibDocs/English Conversation.html");}
  else if(testkey == 'f'){forward();}
  else if(testkey == 'F'){window.open("http://fanyi.baidu.com/");}
  else if(testkey == 'g'){window.open("https://mail.google.com/");}

  else if(testkey == '+'){addToIgnoreLst();}
  else if(testkey == '-'){removeFmIgnoreLst();}
  else if(testkey == 'R'){removeNumFmIgnoreLst();}
  else if(testkey == 's'){setRange();}
  else if(testkey == 'S'){toggle_showSrcSwitch();}
  else if(testkey == '2'){setRange();}
  else if(testkey == 'v'){viewIgnoreLst();}
  else if(testkey == 'T'){alertTotal();}
  else if(testkey == 'x'){showAnswer();}
  else if(testkey == 'I'){settimeInterval();}
  else if(testkey == 't'){window.scrollTo(0,-100);}
  else if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}

  else if(testkey == 'h'){window.open("https://williamkpchan.github.io/LibDocs/News Points.html");}
  else if(testkey == 'H'){showHelp();}
  else if(testkey == 'L'){window.open("https://williamkpchan.github.io/LibDocs/mlinechart.html");}
  else if(testkey == 'm'){window.open("https://williamkpchan.github.io/medical.html");}
  else if(testkey == 'M'){window.open("https://www.google.com/maps");}
  else if(testkey == 'p'){window.open('https://williamkpchan.github.io/LibDocs/temp.html');}
  else if(testkey == 'P'){window.open("https://williamkpchan.github.io/LibDocs/popupRecordReport.html");}

  else if(testkey == 'q'){window.open('https://www.quora.com/');}
  else if(testkey == 'Q'){window.open('https://news.qq.com/zt2020/page/feiyan.htm');}

  else if(testkey == 'S'){window.open("https://williamkpchan.github.io/Hour STK Charts.html");}

  else if(testkey == 't'){window.open("https://my.weather.gov.hk/tc/myindex.htm");}

  else if(testkey == 'u'){window.open("https://www.worldometers.info/coronavirus/");}
  else if(testkey == 'V'){window.open("https://williamkpchan.github.io/StkImgViewer.html");}

  else if(testkey == 'y'){window.open("https://www.youtube.com/feed/subscriptions");}
  else if(testkey == 'z'){showTenYear();}
  else if(testkey == 'Z'){window.open("https://williamkpchan.github.io/LibDocs/minBor.html", "_blank");}

  else if(testkey == "'"){window.open("https://williamkpchan.github.io/LibDocs/swipeChart.html");}
  else if(testkey == '"'){window.open("https://williamkpchan.github.io/LibDocs/dayLayers.html");}
  else if(testkey == ";"){window.open("https://williamkpchan.github.io/LibDocs/minuteLayersAcc.html");}
  else if(testkey == ":"){window.open("https://williamkpchan.github.io/LibDocs/minuteLayers.html");}

  else if(testkey == ','){window.open("https://williamkpchan.github.io/LibDocs/mlinechart.html");}
  else if(testkey == '.'){window.open("https://williamkpchan.github.io/LibDocs/mlineMinutechart.html");}
  else if(testkey == '/'){window.open("https://williamkpchan.github.io/LibDocs/mlineMinutecharttest.html");}
  else if(testkey == 'o'){imgSrc = $('img').attr('src');
                          if(imgSrc !== undefined){ window.open(imgSrc);}
                         }
  else{chkOtherKeys(testkey)} 
}
function chkOtherKeys(testkey) {
  if(testkey == ','){window.open("https://williamkpchan.github.io/LibDocs/mlinechart.html");}
  else if(testkey == '.'){window.open("https://williamkpchan.github.io/LibDocs/mlineMinutechart.html");}
  else if(testkey == '/'){window.open("https://williamkpchan.github.io/LibDocs/mlineMinutecharttest.html");}
  else if(testkey == 'c'){showChart();}
  else if(testkey == 'C'){alert(showTime() + "\n\n\n\n"+showDate());}
  else if(testkey == 'd'){window.open("https://www.youdao.com/");}

  else if(testkey == 'm'){window.open("https://williamkpchan.github.io/medical.html");}
  else if(testkey == 'M'){window.open("https://www.google.com.hk/maps/");}

  else if(testkey == 'i'){window.open("https://williamkpchan.github.io/LibDocs/InspectChart.html");}

  else if(testkey == 'r'){randomNum();}
  //else if(testkey == 'R'){window.open("https://williamkpchan.github.io/LibDocs/postProcessReport.html");}

  else if(testkey == 'W'){window.open("https://web.whatsapp.com/");}
  else if(testkey == 'x'){window.open("https://wx.qq.com/");}
  else if(testkey == 'X'){window.open("https://williamkpchan.github.io/LibDocs/Random Charts.html");}

  else if(testkey == 'y'){window.open("https://www.youtube.com/feed/subscriptions");}
  else if(testkey == '"'){window.open("https://williamkpchan.github.io/LibDocs/mline11Minutechart.html");}
  else if(testkey == ";"){window.open("https://williamkpchan.github.io/LibDocs/otherCode.html");}
  else if(testkey == "'"){window.open("https://williamkpchan.github.io/LibDocs/mline11chart.html");}
  else if(testkey == "\n"){ readCommand();}
}
function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which);   // the rest
  } else {
    return null; // special key
  }
}

function randomNum() {
 topicpointer = Math.floor(Math.random() * (tipsList.length -1))
 generateTip();
}

function shuffle(arrayLst) {
 var i = arrayLst.length, j = 0, temp;
 while (i--) { j = Math.floor(Math.random() * (i+1))
  temp = arrayLst[i];  arrayLst[i] = arrayLst[j];  arrayLst[j] = temp;
 } 
 return arrayLst;
}


function addToIgnoreLst() {
        ignoreLst.push(tipsListIdx[topicpointer].toString())
        ignoreLst = [...new Set(ignoreLst)]; // set unique

        ItemIndex = ignoreLst.indexOf("");  // remove empty items
        if (ItemIndex > -1) { ignoreLst.splice(ItemIndex, 1); }

        ignoreLst = [...new Set(ignoreLst)]; // set unique
        ignoreLst.sort(function(a, b){return a-b}); // sort numerically
        localStorage.setItem(window["ignoreLstName"], ignoreLst);
        alert(tipsListIdx[topicpointer] + " added to ignoreLst! Total " + ignoreLst.length)
        // tipsListIdx.splice(topicpointer, 1); // prevent double entry
}

function removeFmIgnoreLst() {
        ItemIndex = ignoreLst.indexOf(tipsListIdx[topicpointer]);
        if (ItemIndex > -1) { ignoreLst.splice(ItemIndex, 1); }

        ignoreLst = [...new Set(ignoreLst)]; // set unique
        ignoreLst.sort(function(a, b){return a-b}); // sort numerically
        localStorage.setItem(window["ignoreLstName"], ignoreLst);
        alert(tipsListIdx[topicpointer] + " removed fm ignoreLst! Remaining " + ignoreLst.length)
}

function removeNumFmIgnoreLst() {
        var rmNums = prompt("remove Item Number(separate by comma): ", "");
        if (rmNums != null && rmNums != ""){
          // rmNums = +rmNums    this must be string

          rmNumArr = rmNums.split(',')
          rmNumArr.map(rmFunction)
          ignoreLst = [...new Set(ignoreLst)] // set unique
          ignoreLst.sort(function(a, b){return a-b}); // sort numerically

          localStorage.setItem(window["ignoreLstName"], ignoreLst);
          alert("ignoreLst: " +rmNums + " removed fm ignoreLst! Remaining " + ignoreLst.length)
        }
}
function rmFunction(index){
          ItemIndex = ignoreLst.indexOf(index);
          ignoreLst.splice(ItemIndex, 1);
          ignoreLst = [...new Set(ignoreLst)]; // set unique
}

function setRange() {
    var tips_number = prompt("enter the tips number: ", selectRange);
    if (tips_number != null && tips_number != ""){
      init_theRange(+tips_number)
    }
}

function viewIgnoreLst() {
  if(ignoreLst != null){
    alert("Length: " + ignoreLst.length + "\nignoreLst: " + ignoreLst);
  // alert(tipsList[ignoreLst]);
  }else{
    alert("Empty!");
  }
}

function alertTotal() {
  alert("Total Length: " + tipsList.length + "\nignoreLst: " + ignoreLst.length);
  // alert(tipsList[ignoreLst]);
}

function showAnswer() {
    //$('.answer-tip').css('background','#333');
    // setTimeout(function(){ $('.answer-tip').css('background','black'); }, 2000);
    $('.answer-tip').show();
    setTimeout(function(){ $('.answer-tip').hide(); }, 3000);
}

function toggle_showSrcSwitch() {
    if(showSrcSwitch == true){
        showSrcSwitch = false
    }else{
        showSrcSwitch = true
    }
}

// toggle_automode
function toggle_automode() {
  if(automodeSwitch == false){
    autoInterval = setInterval(function(){ forward(); }, timeInterval);
    $(".tip-button").before("<p>automode! 10s</p>");
  }else{
    clearInterval(autoInterval);
  }
}

function showHelp() {
  alert(showHelpTxt)
}
function settimeInterval() {
  timeInterval = prompt("enter timeInterval in sec: ", "10");
    if (timeInterval != null && timeInterval != ""){
      timeInterval = Number(timeInterval)*1000
      toggle_automode()
      toggle_automode()
    }
}

forward();

$(".tip-button").after("<br><br><br>shortcut Keys:<br>+ addToIgnoreLst<br>- removeFmIgnoreLst<br>2 setRange<br>A toggle_automode<br>b backClick<br>c callCalculator<br>c showChart<br>C showTimeDate<br>e scrollTo Bottom<br>f forward<br>H showHelp<br>r randomNum<br>R removeNumFmIgnoreLst<br>s setRange<br>S toggle_showSrcSwitch<br>T alertTotal<br>t scrollTo Top<br>v viewIgnoreLst<br>x showAnswer<br>z showTenYear<br>o open image in new window")

window.addEventListener('click', function (evt) {
  if (evt.detail === 3) {
    forward();
  }
});
