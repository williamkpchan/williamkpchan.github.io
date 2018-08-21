// List of JavaScript tips
var tipsList = [
"<em>logic to suffle the whole list</em><br><br>==========<br>create a pointer register<br>create a random register<br>create a temp storage<br><br>loop<br>shift the ptr loc to temp<br>random the list of minus the ptr loc<br>shift randomed item to ptr loc<br>shift the temp to random loc",
'command to: shortcut to pdf page number<br><br>eg.<br>"C:\\Reader\\AcroRd32.exe" /A page=18 Submission_Copies.pdf',
'Python Command line<br><br>eg<br>python myscript.py<br>D:\\William\\Python27\\python myscript.py<br>D:\\Program Files\\Python\\python.exe "%1" %*'
];

// Tip Limit counter
  var tipLimit = tipsList.length;

// Generate a number
function generateNumber() {
  return Math.floor(Math.random() * (tipsList.length-1));
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