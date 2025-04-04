
ignoreQuizName = bookid + "IgnoreQuiz"
if (localStorage.getItem(window["ignoreQuizName"]) === null ||
    localStorage.getItem(window["ignoreQuizName"]) === "") {
        // localStorage.setItem(window["ignoreQuizName"], "");
        ignoreQuiz = []
} else{
        ignoreQuiz = localStorage.getItem(window["ignoreQuizName"]).split(',').map(x=>+x);
        ignoreQuiz = ignoreQuiz.filter((v, i, a) => a.indexOf(v) === i);  // set unique
}

quizLimit = quizList.length; // Quiz Limit counter

allSetIdx = Array.from(Array(quizLimit).keys())
allIdx = Array.from(Array(quizLimit).keys())
QArray = []
AArray = []
quizListIdx = []
splitString(quizList)
answerIs =""

if (typeof initSelectRange == 'undefined') {
  initSelectRange = 50;
}

if(quizLimit > initSelectRange){
  selectRange = initSelectRange
}else{
  selectRange = quizLimit
}
newRange = selectRange
init_theRange(selectRange)

function init_theRange(newRange) {
  // remove ignoreQuiz elements
  if(ignoreQuiz.length > 0 && ignoreQuiz !=""){
    for(loop = 0; loop < ignoreQuiz.length; loop++){
      ItemIndex = allIdx.indexOf( +ignoreQuiz[loop] );
      if (ItemIndex > -1) { allIdx.splice(ItemIndex, 1) }
    }
  }

  if(allIdx.length == 0){
    var resetIgnoreList = prompt("reset all answer? y/n", "n");
    if (resetIgnoreList != "y"){
        ignoreQuiz = []
        localStorage.setItem(window["ignoreQuizName"], ignoreQuiz);
    }else{
        allIdx = Array.from(Array(quizLimit).keys())
    }
  }

  old_selectRange = selectRange
  if(newRange > 5 && newRange <= quizLimit && selectRange <= quizLimit){
    selectRange = newRange
  }else{
    selectRange = quizLimit
  }

  //quizListIdx = allIdx.slice()
  if(newRange >= 5 && newRange <= quizLimit && selectRange <= quizLimit && allIdx.length >= 5){
    quizListIdx = allIdx.slice(0, selectRange); // select the leading items
  } 

// shuffle the pointers
  shuffle(quizListIdx)
  topicpointer = 0

  if( old_selectRange != selectRange ) {
      alert("selected quiz number: " + selectRange)
  }

  showQuiz()
}

function splitString(textArr) {
  textArrArray = []
  for(i=0; i<textArr.length; i++){
    textArrArray = textArr[i].split("\t");
    QArray[i] = textArrArray[0]
    AArray[i] = textArrArray[1]
  }
}

function showQuiz() {
  quiz = "<i>Quiz " + quizListIdx[topicpointer] + ":</i> "+QArray[quizListIdx[topicpointer]];
  answerPoolIdx = get5Choices(allSetIdx)

  quizAnswer ="<k>Please click on your answer!</k><br>";
  quizAnswer =  quizAnswer + "<i>Answer:</i><ol>";
  for(i=0; i<answerPoolIdx.length; i++){
    quizAnswer = quizAnswer + "<li>" + AArray[answerPoolIdx[i]] + "\n</li>"
  }
  quizAnswer =  quizAnswer + "</ol>";

  document.querySelector('.js-quiz').innerHTML = quiz
  document.querySelector('#js-quiz-answer').innerHTML = quizAnswer

  $("#dateAndTime").click()
  document.querySelector('#records').innerHTML = "&emsp; <i>Total Pass:</i> " + ignoreQuiz.length + " &emsp;<i>All Quizzes:</i> " + quizList.length
}

function get5Choices(thisArr) {
  allchoices = thisArr.slice()
  theAnswer = allchoices.splice(quizListIdx[topicpointer], 1);

  itemNumber = 4;
  shuffledArray = allchoices.sort(() => 0.5 - Math.random());
  result = shuffledArray.slice(0, itemNumber);
  result.push(quizListIdx[topicpointer])
  result = result.sort(() => 0.5 - Math.random());
  theAnswer = theAnswer[0]
  answerIs = result.indexOf(theAnswer) +1
  // console.log("thisArr len", Object.keys(thisArr).length)
  // thisArr is an object
  return result;
}

function forward() {
    console.log("forward topicpointer", topicpointer)
    if (!(topicpointer >= 0 && topicpointer < (allIdx.length-6))) {
       init_theRange(selectRange)
       topicpointer = -1
    }
    topicpointer = topicpointer + 1;
    showQuiz();
}

function backClick() {
    if (!(topicpointer > 0 && topicpointer <= (allIdx.length-1))) {
       init_theRange(selectRange)
       topicpointer = selectRange
    }
    topicpointer = topicpointer - 1;
    showQuiz();
}

function chkKey() {
  var testkey = getChar(event);
  console.log(testkey)
  if(testkey == 'a'){window.open("https://williamkpchan.github.io/apptechno.html");}
  else if(testkey == 'b'){backClick();}
  else if(testkey == 'c'){callCalculator();}
  else if(testkey == 'd'){window.open("https://www.youdao.com/");}
  else if(testkey == 'E'){window.open("https://williamkpchan.github.io/LibDocs/English Conversation.html");}
  else if(testkey == 'f'){forward();}
  else if(testkey == 'F'){window.open("http://fanyi.baidu.com/");}
  else if(testkey == 'g'){window.open("https://mail.google.com/");}

  else if(testkey == '+'){addToIgnoreQuiz();}
  else if(testkey == '-'){removeFmIgnoreQuiz();}
  else if(testkey == 'R'){removeNumFmIgnoreQuiz();}
  else if(testkey == 's'){setRange();}
  else if(testkey == 'v'){viewIgnoreQuiz();}
  else if(testkey == 'T'){alertTotal();}
  else if(testkey == "t"){ window.location = 'div.quiznumber';
       window.scrollTo(window.scrollX, window.scrollY - 50);}
  
  else if(testkey == 'e'){window.scrollTo(0,document.body.scrollHeight);}

  else if(testkey == '1'){checkAnswer("1")}
  else if(testkey == '2'){checkAnswer("2")}
  else if(testkey == '3'){checkAnswer("3")}
  else if(testkey == '4'){checkAnswer("4")}
  else if(testkey == '5'){checkAnswer("5")}

  else if(testkey == 'h'){window.open("https://williamkpchan.github.io/LibDocs/News Points.html");}
  else if(testkey == 'H'){window.open("https://williamkpchanHP.github.io/");}
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
  else if(testkey == 'R'){window.open("https://williamkpchan.github.io/LibDocs/postProcessReport.html");}

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
 topicpointer = Math.floor(Math.random() * (selectRange -1))
 showQuiz();
}

function shuffle(arrayLst) {
 var i = arrayLst.length, j = 0, temp;
 while (i--) { j = Math.floor(Math.random() * (i+1))
  temp = arrayLst[i];  arrayLst[i] = arrayLst[j];  arrayLst[j] = temp;
 } 
 return arrayLst;
}


function addToIgnoreQuiz() {
        ignoreQuiz.push(quizListIdx[topicpointer])
        ignoreQuiz = [...new Set(ignoreQuiz)]; // set unique

        ItemIndex = ignoreQuiz.indexOf("");  // remove empty items
        if (ItemIndex > -1) { ignoreQuiz.splice(ItemIndex, 1); }

        localStorage.setItem(window["ignoreQuizName"], ignoreQuiz);
        // alert(quizListIdx[topicpointer] + " added to ignoreQuiz! Total " + ignoreQuiz.length)
}

function removeFmIgnoreQuiz() {
        ItemIndex = ignoreQuiz.indexOf(quizListIdx[topicpointer]);
        if (ItemIndex > -1) { ignoreQuiz.splice(ItemIndex, 1); }

        ignoreQuiz = [...new Set(ignoreQuiz)]; // set unique
        localStorage.setItem(window["ignoreQuizName"], ignoreQuiz);
        alert(quizListIdx[topicpointer] + " removed fm ignoreQuiz! Remaining " + ignoreQuiz.length)
}

function removeNumFmIgnoreQuiz() {
        var rmNum = prompt("remove Item Number: ", "");
        if (rmNum != null && rmNum != ""){
          // rmNum = +rmNum    this must be string
          ItemIndex = ignoreQuiz.indexOf(rmNum);
          ignoreQuiz.splice(ItemIndex, 1);
          ignoreQuiz = [...new Set(ignoreQuiz)]; // set unique
          localStorage.setItem(window["ignoreQuizName"], ignoreQuiz);
          alert("ignoreQuiz: " +rmNum + " removed fm ignoreQuiz! Remaining " + ignoreQuiz.length)
        }
}

function setRange() {
    var quiz_number = prompt("select quiz number: ", "");
    if (quiz_number != null && quiz_number != ""){
      init_theRange(+quiz_number)
    }
}

function viewIgnoreQuiz() {
  alert("ignoreQuiz: " + ignoreQuiz);
  // alert(quizList[ignoreQuiz]);
}

function alertTotal() {
  alert("Total Length: " + quizList.length + "\nignoreQuiz: " + ignoreQuiz.length);
  // alert(quizList[ignoreQuiz]);
}

function checkAnswer(thisChoice) {
    if(thisChoice == answerIs){
      document.querySelector('#lastResult').innerHTML = "<c>Last Answer Correct!</c> "  + answerIs
      addToIgnoreQuiz()
    }else{
      document.querySelector('#lastResult').innerHTML = "<ic>Last Answer:</ic> "  + answerIs
    }

    document.querySelector('#lastQuiz').innerHTML = quiz + "<br><i>Answer</i>: " + AArray[answerPoolIdx[answerIs-1]]
    forward();
}

forward();

$(".quizbutton").after("<br><br><br>shortcut Keys:<br>b backward<br>f forward<br>+ add To IgnoreQuiz<br>- remove Fm IgnoreQuiz<br>R remove Num Fm IgnoreQuiz<br>v view IgnoreQuiz<br>s setRange<br>T total length<br>")


var ans = document.getElementById('js-quiz-answer');
//ans.addEventListener('click', dosomething)

$('#js-quiz-answer li').off('click').on('click', function (){
    selectedIs = $(this).index().toString();
    checkAnswer(selectedIs)
});


