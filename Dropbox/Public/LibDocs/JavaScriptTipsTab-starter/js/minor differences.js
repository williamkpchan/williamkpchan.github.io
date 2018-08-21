// List of JavaScript tips
var tipsList = [
"ethetic",
"ethical",
"ethics",
"ethnic",
"ethos",
"ethological",
"speculate", 
"inane",
"insane",
"spectacular",
"decent",
"deterrent"
];
var explainList = [
"审美",
"伦理的",
"伦理",
"民族的",
"社会思潮",
"行为学",
"推测 投机 猜 赌钱 assume, be opportunistic, bet, bucket, conjecture, gamble, guess, imagine, infer, stake, surmise, suspect",
"空洞的 无意义的 无比愚蠢的",
"疯狂的 精神病的 非常愚蠢的",
"洋洋大观 imposing, grandiose",
"正派的 得体的 相称的 相当好的 acceptable, appropriate, becoming, decorous, fit, presentable, proper, respectable, seemly, serious, up to par",
"威慑 制止的 遏制的"
];

// Tip Limit counter
  var tipLimit = tipsList.length*2;

// Generate a number
function generateNumber() {
  return Math.floor(Math.random() * tipsList.length);
}

function generateTip() {
  var pointer = generateNumber();
  var tip = tipsList[pointer];
  var explain = explainList[pointer];

  var tipElement = document.querySelector('.cssTip');
  tipElement.innerHTML = tip;
  var explainElement = document.querySelector('.cssExplain');
  explainElement.innerHTML = explain;

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
        tipButton.innerHTML = 'Bye!';
        tipButton.classList.add('disabled');
      }
    }
  });
}


onTipButtonClick();
// Get the first tip
generateTip();