// List of JavaScript tips
var tipsList = [
'不完美小孩<audio src="http://ws.stream.qqmusic.qq.com/C100003vHYQf1XqU7V.m4a?fromtag=46" autoplay></audio>',
'爱拼才会赢<audio src="http://ws.stream.qqmusic.qq.com/C1000040kTkE1E2Ma0.m4a?fromtag=46" autoplay></audio>',
'You Raise Me Up<audio src="http://ws.stream.qqmusic.qq.com/C100001M74fJ3LIgsJ.m4a?fromtag=46" autoplay></audio>',
'你看得见吗<audio src="http://ws.stream.qqmusic.qq.com/C100000AtPO43VsuSr.m4a?fromtag=46" autoplay></audio>',
'遇见那样美<audio src="http://ws.stream.qqmusic.qq.com/C100000E63xH3iOdmv.m4a?fromtag=46" autoplay></audio>',
'李克勤<audio src="http://ws.stream.qqmusic.qq.com/C100001cdurD2fY83O.m4a?fromtag=46" autoplay></audio>',
'张国荣<audio src="http://ws.stream.qqmusic.qq.com/C100000FEcuq2JPHvZ.m4a?fromtag=46" autoplay></audio>',
'张国荣<audio src="http://ws.stream.qqmusic.qq.com/C100003eswRq2pvQX5.m4a?fromtag=46" autoplay></audio>',
'光影<audio src="http://ws.stream.qqmusic.qq.com/C100000X6O1Y2mLqQm.m4a?fromtag=46" autoplay></audio>',
'爱的箴言<audio src="http://ws.stream.qqmusic.qq.com/C100000guLNG3cZpLi.m4a?fromtag=46" autoplay></audio>',
'beach boy<audio src="http://www.angelfire.com/celeb/valen79/images/beach_boy.mid" autoplay></audio>',
'张国荣<audio src="http://ws.stream.qqmusic.qq.com/C100003lcZ830iBgVR.m4a?fromtag=46" autoplay></audio>'

];

// Tip Limit counter
  var tipLimit = 20;

// Generate a number
function generateNumber() {
  return Math.floor(Math.random() * tipsList.length);
}

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

onTipButtonClick();
// Get the first tip
generateTip();
