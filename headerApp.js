function changeCode(thecode) {
     url = "https://williamkpchan.github.io/LibDocs/Random Charts.html" + "?" + thecode;
	window.open(url);
}

window.scrollTo(0,(document.body.scrollHeight));
$("k").click(function() { changeCode($(this).text()) });
