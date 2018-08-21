// List of JavaScript tips
var tipsList = [
'&lt;input type="button"&gt;<br>button<br><br>Defines a clickable button (mostly used with a JavaScript to activate a script)',
'&lt;input type="checkbox"&gt;<br>checkbox<br><br>Defines a checkbox',
'&lt;input type="color"&gt;<br>color<br><br>Defines a color picker',
'&lt;input type="date"&gt;<br>date<br><br>Defines a date control (year, month and day (no time))',
'&lt;input type="datetime-local"&gt;<br>datetime-local<br><br>Defines a date and time control (year, month, day, hour, minute, second, and fraction of a second (no time zone)',
'&lt;input type="email"&gt;<br>email<br><br>Defines a field for an e-mail address',
'&lt;input type="file"&gt;<br>file<br><br>Defines a file-select field and a "Browse..." button (for file uploads)',
'&lt;input type="hidden"&gt;<br>hidden<br><br>Defines a hidden input field',
'&lt;input type="image"&gt;<br>image<br><br>Defines an image as the submit button',
'&lt;input type="month"&gt;<br>month<br><br>Defines a month and year control (no time zone)',
'&lt;input type="number"&gt;<br>number<br><br>Defines a field for entering a number',
'&lt;input type="password"&gt;<br>password<br><br>Defines a password field (characters are masked)',
'&lt;input type="radio"&gt;<br>radio<br><br>Defines a radio button',
'&lt;input type="range"&gt;<br>range<br><br>Defines a control for entering a number whose exact value is not important (like a slider control). Default range is from 0 to 100',
'&lt;input type="reset"&gt;<br>reset<br><br>Defines a reset button (resets all form values to default values)',
'&lt;input type="search"&gt;<br>search<br><br>Defines a text field for entering a search string',
'&lt;input type="submit"&gt;<br>submit<br><br>Defines a submit button',
'&lt;input type="tel"&gt;<br>tel<br><br>Defines a field for entering a telephone number',
'&lt;input type="text"&gt;<br>text<br><br>Default. Defines a single-line text field (default width is 20 characters)',
'&lt;input type="time"&gt;<br>time<br><br>Defines a control for entering a time (no time zone)',
'&lt;input type="url"&gt;<br>url<br><br>Defines a field for entering a URL',
'&lt;input type="week"&gt;<br>week<br><br>Defines a week and year control (no time zone)'
];

// Tip Limit counter
  var tipLimit = tipsList.length;

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
