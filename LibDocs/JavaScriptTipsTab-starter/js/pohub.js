// List of JavaScript tips
var tipsList = [
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284001.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284002.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284003.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284004.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284005.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284006.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284007.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284008.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284009.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284010.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284011.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284012.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284013.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284014.jpg'>",
"<img src='http://www.milfs30.com/wp-content/uploads/2013/07/nat005002005284015.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/001.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/002.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/003.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/004.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/005.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/006.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/007.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/008.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/009.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/010.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/011.jpg'>",
"<img src='http://ddfcash.ddfstatic.com/content/ddf/9186/fulm/012.jpg'>"
];

// Tip Limit counter
  var tipLimit = tipsList.length * 3;

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
