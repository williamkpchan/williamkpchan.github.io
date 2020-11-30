
function chkKey() {
  var testkey = getChar(event);
  if(testkey == 'f'){generateTip();}
  else{chkOtherKeys(testkey)} 
}
function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}


// List of JavaScript tips
var tipsList = [
"first to assign the targeted object and then run the .each loop",
"use of the .parent().before",
"use of the .parent().after",
"use of the $(this).html()",
"jQuery toggle between hide and show:",
"fixed TOC position",
"Selecting Elements by Class Name",
"Selecting Elements by ID",
"Selecting Elements by Attribute",
"Selecting Elements by Compound CSS Selector",
"Selecting Elements with a Comma-separated List of Selectors",
"Pseudo-Selectors",
"Anchor Pseudo-classes unvisited link",
"Anchor Pseudo-classes visited link",
"Anchor Pseudo-classes mouse over link",
"Anchor Pseudo-classes selected link",
"Pseudo-classes can be combined with CSS classes",
"using the :hover pseudo-class on a &lt;div&gt; element",
"Simple Tooltip Hover to show a &lt;p&gt; element",
"The :first-child Pseudo-class in the first &lt;p&gt; element",
"The first &lt;i&gt; element in all &lt;p&gt; elements",
"All &lt;i&gt; elements in &lt;p&gt; elements that are the first child of another element",
"Defines the quotation marks for &lt;q&gt; elements with lang='no' using :lang pseudo-class",
"Select the :first-child Pseudo-class",
"Select the odd  Pseudo-class",
"Select all input-like elements in a form",
"Select visible Pseudo-class",
"All except the first three divs",
"All currently animated divs",
"When using the :visible and :hidden pseudo-selectors",
"When using the :visible and :hidden pseudo-selectors with &lt;tr&gt;",
"Elements that have not been added to the DOM",
":active",
":checked",
":disabled",
":empty",
":enabled",
":first-child",
":first-of-type",
":focus",
":hover",
':in-range<br>&lt;input type="number" min="5" max="10" value="7"&gt;<br>input:in-range { border: 2px solid yellow;}',
":invalid",
":lang(language)",
":last-child",
":last-of-type",
":link",
":not(selector)",
":nth-child(n)",
":nth-last-child(n)",
":nth-last-of-type(n)",
":nth-of-type(n)",
":only-of-type",
":only-child",
":optional",
":out-of-range",
":read-only",
":read-write",
":required",
":root",
":target",
":valid",
":visited",
"::after",
"::before",
"::first-letter",
"::first-line",
"::selection",
"Choosing good selectors is one way to improve JavaScript's performance",
"Testing whether a selection contains elements",
"jQuery doesn't cache elements for you",
"var divs = $( 'div' ); //selection is stored in a variable",
"A selection only fetches the elements that are on the page at the time the selection is made.",
"div.foo elements that contain &lt;p&gt; tags",
"h1 elements that don't have a class of bar",
"unordered list items with class of current",
"just the first unordered list item",
"the sixth",
"Selecting by type: jQuery pseudo selectors to select form-specific elements:",
"the :disabled pseudo-selector targets any &lt;input&gt; elements with the disabled attribute",
"The :checked pseudo-selector works when used with checkboxes, radio buttons and selects.",
"Selecting Form Elements",
"To get the best performance using :disabled",
"In order to get the best performance using :enabled",
"descendant combinator, or whitespace character",
"child combinator, or &gt;",
"adjacent sibling combinator, or +",
"general sibling combinator, or ~",
"display: inline;",
"display: block;",
"display: flex;",
"display: inline-block;",
"display: inline-flex;",
"display: inline-table;	The element is displayed as an inline-level table;",
"display: list-item;",
"display: run-in;	Displays an element as either block or inline, depending on context;",
"display: table;",
"display: table-caption;",
"display: table-column-group;",
"display: table-header-group;",
"display: table-footer-group;",
"display: table-row-group;",
"display: table-cell;",
"display: table-column;",
"display: table-row;",
"display: none;",
"display: initial;",
"display: inherit;",
"z-index: auto",
"word-wrap: normal",
"word-spacing: normal",
"word-break: normal",
"width: auto",
"The white-space property specifies how white-space inside an element is handled.<br><br>white-space: normal",
"visibility: visible",
"vertical-align: baseline",
"user-select: auto",
"unicode-bidi: normal",
"transition-timing-function: linear",
"transition-property: none",
"transition-duration: time",
"transition-delay: time",
"transition: property duration timing-function delay",
"transform-style: flat",
"transform-origin: x-axis y-axis z-axis",
"The transform property applies a 2D or 3D transformation to an element. This property allows you to rotate, scale, move, skew, etc., elements.<br><br>transform: none",
"line-height: normal (default):",
"line-height: 1.6 (recommended):",
"line-height: 80%:",
"line-height: 200%:",
"top: auto"
];
var explainList = [
'var $h1 = $(&#39;h1&#39;); $h1.each(function() {}',
'$(this).parent().before("&lt;br&gt;");',
'$(this).parent().after("&lt;br&gt;");',
'$toc.append("&lt;a href=&#39;#" + $(this).html() + "&#39;&gt;" + $(this).html() + "&lt;/a&gt;");',
'$(this).parent().siblings().toggle();',
'.toc-box {position: fixed; top: 10px; left: 10px; margin: 10px; border: 1px solid #333; background-color:#010; z-index:1; border-radius: 3px;}',
'$( ".myClass" );',
'$( "#myId" );',
'$( "input[name=&#39;first_name&#39;]" );',
'$( "#contents ul.people li" );',
'$( "div.myClass, ul.people" );',
'selector:pseudo-class {property:value;}',
'a:link {color: #FF0000;}',
'a:visited {color: #00FF00;}',
'a:hover {color: #FF00FF;}',
'a:active {color: #0000FF;',
'a.highlight:hover {color: #ff0000;}',
'div:hover {background-color: blue;}',
'p {display: none;} div:hover p {display: block;}',
'p:first-child {color: blue;}',
'p i:first-child {color: blue;}',
'p:first-child i {color: blue;}',
'q:lang(no) {quotes: "~" "~";} //Some text &lt;q lang="no"&gt;A quote in a paragraph&lt;/q&gt; Some text.',
'$( "a.external:first" );',
'$( "tr:odd" );',
'$( "#myForm :input" );',
'$( "div:visible" );',
'$( "div:gt(2)" );',
'$( "div:animated" );',
'jQuery tests the actual visibility of the element, not its CSS visibility or display properties. ',
"visibility test doesn't work with &lt;tr&gt; elements",
'will always be considered hidden',
'Selects the active link a:active',
'Selects every checked &lt;input&gt; element input:checked',
'Selects every disabled &lt;input&gt; element input:disabled',
'Selects every &lt;p&gt; element that has no children p:empty',
'Selects every enabled &lt;input&gt; element input:enabled',
'Selects every &lt;p&gt; elements that is the first child of its parent p:first-child',
'Selects every &lt;p&gt; element that is the first &lt;p&gt; element of its parent p:first-of-type',
'Selects the &lt;input&gt; element that has focus input:focus',
'Selects links on mouse over a:hover',
'Selects &lt;input&gt; elements with a value within a specified range input:in-range',
'Selects all &lt;input&gt; elements with an invalid value input:invalid',
'Selects every &lt;p&gt; element with a lang attribute value starting with "it" p:lang(it)',
'Selects every &lt;p&gt; elements that is the last child of its parent p:last-child',
'Selects every &lt;p&gt; element that is the last &lt;p&gt; element of its parent p:last-of-type',
'Selects all unvisited links a:link',
'Selects every element that is not a &lt;p&gt; element :not(p)',
'Selects every &lt;p&gt; element that is the second child of its parent p:nth-child(2)',
'Selects every &lt;p&gt; element that is the second child of its parent, counting from the last child p:nth-last-child(2)',
'Selects every &lt;p&gt; element that is the second &lt;p&gt; element of its parent, counting from the last child p:nth-last-of-type(2)',
'Selects every &lt;p&gt; element that is the second &lt;p&gt; element of its parent p:nth-of-type(2)',
'Selects every &lt;p&gt; element that is the only &lt;p&gt; element of its parent p:only-of-type',
'Selects every &lt;p&gt; element that is the only child of its parent p:only-child',
'Selects &lt;input&gt; elements with no "required" attribute input:optional',
'Selects &lt;input&gt; elements with a value outside a specified range input:out-of-range',
'Selects &lt;input&gt; elements with a "readonly" attribute specified input:read-only',
'Selects &lt;input&gt; elements with no "readonly" attribute input:read-write',
'Selects &lt;input&gt; elements with a "required" attribute specified input:required',
"Selects the document's root element root",
'Selects the current active #news element (clicked on a URL containing that anchor name) #news:target',
'Selects all &lt;input&gt; elements with a valid value input:valid',
'Selects all visited links a:visited',
'Insert content after every &lt;p&gt; element p::after',
'Insert content before every &lt;p&gt; element p::before',
'Selects the first letter of every &lt;p&gt; element p::first-letter',
'Selects the first line of every &lt;p&gt; element p::first-line',
'Selects the portion of an element that is selected by a user p::selection',
'Too much specificity can be a bad thing',
'if ( $( "div.foo" ).length ) { ...}',
'you should save the selection in a variable rather than making the selection repeatedly',
'Call jQuery methods on the variable just like the original selection',
"If elements are added to the page later, you'll have to repeat the selection or otherwise add them to the selection stored in the variable. Stored selections don't magically update when the DOM changes.",
'$( "div.foo" ).has( "p" )',
'$( "h1" ).not( ".bar" )',
'$( "ul li" ).filter( ".current" )',
'$( "ul li" ).first()',
'$( "ul li" ).eq( 5 )',
':password, :reset, :radio, :text, :submit, :checkbox, :button, :image, :file',
'$( "form :disabled" );',
'$( "form :checked" );',
':checked, :disabled, :enabled, :input, :selected, :checked, eg. $( "form :enabled" );, $( "form :input" );, $( "form :selected" );',
'first select elements with a standard jQuery selector, then use .filter( ":disabled" ), or precede the pseudo-selector with a tag name or some other selector.',
'first select elements with a standard jQuery selector, then use .filter( ":enabled" ), or precede the pseudo-selector with a tag name or some other selector.',
'form h1 {color: #009;}',
'form &gt; p {font-size: 22px;}',
'label + input {display: block;clear: both;}',
"select elements that share the same parent without considering whether they're adjacent",
"Default value. Displays an element as an inline element (like &lt;span&gt;)",
"Displays an element as a block element (like &lt;p&gt;)",
"Displays an element as a block-level flex container. New in CSS3",
"Displays an element as an inline-level block container. The inside of this block is formatted as block-level box, and the element itself is formatted as an inline-level box",
"Displays an element as an inline-level flex container. New in CSS3",
"The element is displayed as an inline-level table;	 ",
"Let the element behave like a &lt;li&gt; element",
"Displays an element as either block or inline, depending on context;	 ",
"Let the element behave like a &lt;table&gt; element",
"Let the element behave like a &lt;caption&gt; element",
"Let the element behave like a &lt;colgroup&gt; element",
"Let the element behave like a &lt;thead&gt; element",
"Let the element behave like a &lt;tfoot&gt; element",
"Let the element behave like a &lt;tbody&gt; element",
"Let the element behave like a &lt;td&gt; element",
"Let the element behave like a &lt;col&gt; element",
"Let the element behave like a &lt;tr&gt; element",
"The element will not be displayed at all (has no effect on layout)",
"Sets this property to its default value. Read about initial",
"Inherits this property from its parent element. Read about inherit",
"auto|number|initial|inherit;",
"normal|break-word|initial|inherit;",
"normal|length|initial|inherit;",
"normal|break-all|keep-all|initial|inherit;",
"auto|value|initial|inherit;",
"normal|nowrap|pre|pre-line|pre-wrap|initial|inherit;",
"visible|hidden|collapse|initial|inherit;",
"baseline|length|sub|super|top|text-top|middle|bottom|text-bottom|initial|inherit;",
"auto|none|text|all;",
"normal|embed|bidi-override|initial|inherit;",
"linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit;",
"none|all|property|initial|inherit;",
"time|initial|inherit;",
"time|initial|inherit;",
"property duration timing-function delay|initial|inherit;",
"flat|preserve-3d|initial|inherit;",
"x-axis y-axis z-axis|initial|inherit;",
"none|transform-functions|initial|inherit;",
"This is a standard line-height about 110% to 120%.",
"This is set to 1.6. This is a unitless value; meaning that line height will be relative to the font size.",
"This is a smaller line-height.",
"This is a bigger line-height.",
"auto|length|initial|inherit;"

];

// Tip Limit counter
  var tipLimit = tipsList.length;

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
