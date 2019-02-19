
$(document).ready(function(){
    $('.keys').click(function(){
    parent.history.back();
    return false;
    });
});

$(document).ready(function(){
	thisImgHead = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1&Indicator=3&indpara1=3&indpara2=5&indpara3=10&indpara4=15&indpara5=20&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0&scheme=3&com=100&chartwidth=680&chartheight=400&stockid=";
	thisImgPCode= "&period=7";
	thisImgTail="&type=1&logoStyle=1' ";

theList = ['110000','000001.sh','111000.HK','111100.HK'];
	$( "#codelist" ).append("Total: " + theList.length + "<br>");
	theList.forEach(function(value) {
		$( "#codelist" ).append('<span onclick=sCt("' +value + '")>' + value + '</span>&emsp;');
	});
	$( "#codelist" ).append("<br>");

	for( var codeNo = 0; codeNo < theList.length; codeNo++){
		theText = theList[codeNo];
		theFunccode =  "<div>" + theText + "<br>" + thisImgHead + theText + thisImgPCode + thisImgTail + "onclick = \"sCt('" + theText + "')\">" + "</div>";
		$( "#codelist" ).append( theFunccode);
	};
});

function chkKey() { var testkey = getChar(event);
  if(testkey == 'c'){showChart();}
  if(testkey == 'f'){window.open("../../STK/!!!%20STKMon%20!!!/flsz181130.html");}
  if(testkey == 's'){window.open("../stkListVH.html");}
}

function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}


function openHtml(){
  console.log( "keypress: " + $(this).value );
};

function showChart() {
  var thecode = prompt("Code Number:", "");
  if (thecode != null && thecode != "") {sCt(thecode);}
}
