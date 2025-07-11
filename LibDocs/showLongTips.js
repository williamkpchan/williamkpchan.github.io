ignoreLstName = bookid + "IgnoreLst"
container = document.querySelector('.js-tip');
aCount = 0
tipPointer = 0

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
tipPointer = 0

allIdx = Array.from(Array(tipLimit).keys())
rm_ignoreLst()

// Function that converts string to number
function unaryOp(value) { return +value; }

if (typeof initSelectRange == 'undefined') {
  initSelectRange = 80;
}

if(tipLimit > initSelectRange){
  selectRange = initSelectRange
}else{
  selectRange = tipLimit
}
init_theRange(selectRange)



function init_theRange(newRange) {
  old_selectRange = selectRange
  topicpointer = 0
  if(newRange > 10 && newRange <= tipLimit && selectRange <= tipLimit){
    selectRange = newRange
  }else{
    selectRange = tipLimit
  }
  rm_ignoreLst();
  tipsListIdx = allIdx.slice(0, selectRange); // select the leading items

  // shuffle the remaining pointers, or typeof noShuffle === 'undefined'
  if ((noShuffle === false)||(noShuffle === null)) {
    tipsListIdx = shuffle(tipsListIdx)
    topicpointer = Math.floor(Math.random() * (tipsListIdx.length -1))
  }
  if (noShuffle == true) {
    topicpointer = Math.floor(Math.random() * (tipsListIdx.length -1))
  }


  if( old_selectRange != selectRange ) {
      alert("selected tips number: " + selectRange)
  }

  generateMsg()
}

function generateMsg() {
  if(showRange > tipsList.length){
    topicpointer = 0
  }

  if(topicpointer>tipsListIdx.length){
     topicpointer = Math.floor(Math.random() * (tipsListIdx.length -1))
  }
  document.querySelector('.tip-number').innerText = document.title+" "+topicpointer

  startIdx = topicpointer
  endIdx = topicpointer + showRange
  if(endIdx > tipLimit){ endIdx = tipLimit}
  document.querySelector('.js-tip').innerHTML = "";

  tipContent = ""
  for(loop = startIdx; loop < endIdx; loop++){
    tip = tipsList[tipsListIdx[loop]];
    tip = assembleLIne(tip)
      tipContent = tipContent + tip;
    topicpointer = topicpointer + 1
  }
  document.querySelector('.js-tip').innerHTML = tipContent;

    // container count
      container = document.querySelector('.js-tip');
      aCount = container.querySelectorAll('a').length;
      if(aCount==0){
        aCount = container.querySelectorAll('img').length;
      }

  $("#dateAndTime").click()
  document.querySelector('.tip-button').innerHTML = tipsListIdx[topicpointer] + " of " + tipsList.length
  if(focusSwitch == true){
    document.querySelector('.tip-button').focus();
  }
  if(showSrcSwitch == true){
     console.log("showSrcSwitch ", showSrcSwitch)
     $(".Notes").text('\n'+ $('.js-tip').find('img').attr('src') )
  }else{
     console.log("showSrcSwitch ", showSrcSwitch)
     $(".Notes").text('')
  }
  flipSw(); // trigger an extra function on sexpage\sexhd.picsBig.html function flipSw(){
}

function assembleLIne(keyElement) {
  lineStr = lineHeader + keyElement + lineTail
  console.log(lineStr)
  return lineStr
}
function rtClick(event) {
    if (event.which == 3) {
        backClick()
    }
}

function forward() {
    console.log("topicpointer", topicpointer)
    if (!(topicpointer >= 0
         && topicpointer < (selectRange-1)
         && topicpointer < (tipLimit-1) ) ){
       init_theRange(selectRange)
       topicpointer = -1
       console.log("inited theRange")
    }
    topicpointer = topicpointer + 1;
    generateMsg();

    window.location = '.js-tip';
}

function backClick() {
    if (!(topicpointer > 0 && topicpointer <= (selectRange-1) && topicpointer <= (tipLimit-1))) {
       init_theRange(selectRange)
       topicpointer = selectRange
    }
    topicpointer = topicpointer - 1;
    generateMsg();
}

function chkKey() {
  var testkey = getChar(event);
  console.log(testkey)
  if(testkey == 'a'){window.open("https://williamkpchan.github.io/apptechno.html");}
  else if(testkey == 'A'){toggle_automode();}
  else if(testkey == 'b'){backClick();}
  else if(testkey == 'c'){clickImg();}
  else if(testkey == 'd'){window.open("https://www.youdao.com/");}
  else if(testkey == 'E'){window.open("https://williamkpchan.github.io/LibDocs/English Conversation.html");}
  else if(testkey == 'F'){forward();}
  else if(testkey == 'f'){forwardInTip();}
  else if(testkey == 'g'){gotoNum()}
  else if(testkey == 'l'){listAll()}

  else if(testkey == '+'){addToIgnoreLst();}
  else if(testkey == '-'){removeFmIgnoreLst();}
//  else if(testkey == 'R'){removeNumFmIgnoreLst();}
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

  else if(testkey == 'R'){randomNum();}
  else if(testkey == 'r'){randomInTip();}
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
 console.log("topicpointerbf: ", topicpointer)
 topicpointer = Math.floor(Math.random() * (tipsList.length -1))
 console.log("topicpointeraf: ", topicpointer)
 tipPointer = 0
 console.log("tipPointer: ", tipPointer)
 generateMsg();
} 

function randomInTip() {
  tipPointer = Math.floor(Math.random() * (aCount -1))
  const nthChild = container.childNodes[tipPointer];
  nthChild.scrollIntoView({ behavior: 'instant' });
  console.log(tipPointer);
} 

function forwardInTip() {
  tipPointer = tipPointer + 1
  if(tipPointer>=aCount){
    tipPointer = 0
  }
  console.log(tipPointer);
  const nthChild = container.childNodes[tipPointer];
  nthChild.scrollIntoView({ behavior: 'instant' });
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
    $(".tip-button").before("<p>automode!"+ timeInterval/1000 +"s</p>");
  }else{
    clearInterval(autoInterval);
  }
}

function showHelp() {
  alert(showHelpTxt)
}
function settimeInterval() {
  timeInt = prompt("enter timeInt in sec: ", timeInterval/1000);
    if (timeInt != null && timeInt != ""){
      timeInterval = Number(timeInt)*1000
      clearInterval(autoInterval)
      //toggle_automode() // turn off and on to reset parameters
      toggle_automode()
    }
}

function gotoNum() {
 ItemNum = prompt("goto Item Number: ", "");
 // tip = tipsList[ItemNum];
 // document.querySelector('.js-tip').innerHTML = tip;
 topicpointer = Number(ItemNum);
 console.log("gotoNum topicpointer: ", topicpointer)
 generateMsg();
}

function listAll() {
    tipsListChop = []
    for(loop = 0; loop < tipLimit; loop++){
      var tipbit = loop + "\t" + tipsList[tipsListIdx[loop]];
        tipbit = tipbit.replace(/<.*?>|\n/g, "");

      if(tipbit.length > 30) {
        tipbit = tipbit.slice(0, 29)
      }
      tipsListChop.push(tipbit)
    }
    document.querySelector('.js-tip').innerHTML = tipsListChop.join("<br>");
}

function clickImg() {
  window.open($("pre.js-tip a").attr('href'))
}

forward();

$(".tip-button").after("<br><br><br>shortcut Keys:<br>+ addToIgnoreLst<br>- removeFmIgnoreLst<br>2 setRange<br><r onclick='toggle_automode()'>A toggle_automode</r><br>b backClick<br>c callCalculator<br>c showChart<br>C showTimeDate<br>e scrollTo Bottom<br>f forward<br>g gotoNum<br>H showHelp<br>I set time interval<br>l listAll<br>r randomNum<br>R removeNumFmIgnoreLst<br>s setRange<br>S toggle_showSrcSwitch<br>T alertTotal<br>t scrollTo Top<br>v viewIgnoreLst<br>x showAnswer<br>z showTenYear<br>o open image in new window")

window.addEventListener('click', function (evt) {
  if (evt.detail === 3) {
    forward();
  }
});
