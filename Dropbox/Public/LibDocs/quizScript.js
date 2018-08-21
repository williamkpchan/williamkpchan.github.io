
function generateTip() {
  var tip = tipsList[generateNumber()];
  var tipElement = document.querySelector('.js-tip');
  tipElement.innerHTML = tip;
  var tipLimitCount = document.querySelector('.tip-limit-count');
  tipLimitCount.innerHTML = tipLimit;
  document.querySelector('.tip-button').focus();

}

function onTipButtonClick() {
  var tipButton = document.querySelector('.tip-button');
  tipButton.addEventListener('click', function() {
    tipLimit = tipLimit - 1;
    if (tipLimit >= 0) {
      generateTip();

      if (tipLimit === 0) {
        tipButton.innerHTML = 'See you in another tab!';
        tipButton.classList.add('disabled');
      }
    }
  });
}

function generateNumber() {
  return Math.floor(Math.random() * tipsList.length);
}

function chkKey() {
  var testkey = getChar(event);
  if(testkey == 's'){speak();}
  if(testkey == 'f'){jpButClick();}
  if(testkey == 'b'){jpback();}
}
function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}

function speak() {
  var speech = new SpeechSynthesisUtterance(questionList[remainQueNo]);
  speechSynthesis.speak(speech);
}

var remainQueNo = questionList.length;

function shuffle() {
 var listlen = questionList.length, j = 0, temp;

 while (listlen--) {
  j = Math.floor(Math.random() * (listlen+1));

  temp = questionList[listlen];
  questionList[listlen] = questionList[j];
  questionList[j] = temp;
 }
}

function showQues() {
  remainQueNo = remainQueNo - 1;
  var pointer = remainQueNo;
  var topic = questionList[pointer];

  document.querySelector('.question').innerHTML = topic;
  document.querySelector('.questionsLeft').innerHTML = remainQueNo;
  document.querySelector('.jumpButton').focus();

}
$(".answer").click(function () {
   $(this).toggleClass("appear");
});

$.fn.toggleAnswer = function () {
   $(this).toggleClass("appear");
};

function jpButClick() {
  var jpBut = document.querySelector('.jumpButton');
  if (remainQueNo > 0) {showQues();}
  if (remainQueNo === 0) {
      jpBut.innerHTML = 'Bye!';
      jpBut.classList.add('disabled');
  }
}

function jpback() {
  remainQueNo = remainQueNo + 2;
  if (remainQueNo <= questionList.length){
	jpButClick();
  } else {
	remainQueNo = questionList.length -1;
  }
}

function speak() {
  var speech = new SpeechSynthesisUtterance(questionList[remainQueNo]);
  speechSynthesis.speak(speech);
}
