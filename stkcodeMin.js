function sCt(stc) {
  iH = "<img src='http://charts.aastocks.com/servlet/Charts?fontsize=12&15MinDelay=F&lang=1&titlestyle=1&vol=1"
  iI = "&Indicator=3&indpara1=3&indpara2=5&indpara3=10&indpara4=15&indpara5=20"
  sC1 = "&subChart1=3&ref1para1=5&ref1para2=10&ref1para3=3"
  sC2 = "&subChart2=3&ref2para1=12&ref2para2=26&ref2para3=9"
  sC3 = "&subChart3=12&ref3para1=0&ref3para2=0&ref3para3=0"
  sC4 = "&scheme=3&com=100"
  iCW ="&chartwidth=1050&chartheight=690&stockid=";
  iPC= "&period=";
  iT="&type=1&logoStyle=1'><br>";
  sA = "http://www.aastocks.com"
  iV = [4, 3, 2, 1, 5012, 5007, 5000, 7, 11, 12];
  ah = "<a href='"
  var iW = window.open("");

  nH = sA + "/tc/ltp/rtquote.aspx?symbol="
  nT = ".HK"
  nS = nH + stc + nT;

  qH = sA + "/tc/stocks/quote/detail-quote.aspx?symbol=";
  qS = qH + stc;
  nA = ah + nS + "' target = _blank>" + stc + "</a>" ;
  qA = ah + qS + "' target = _blank>" + stc + "</a>" ;

  sS = '<style>body { background-color: black; color: green} a { text-decoration: none; color: #28B8B8;}</style>';
  iA = sS + "\n<center>News: " + nA + " . quote: " + qA+ "<br>" ;

  for( var pd = 0; pd < iV.length; pd++){
    iA = iA + iH +   iI +   sC1 +   sC2 +   sC3 +   sC4 +   iCW +   iPC+   iT+ stc + iPC + iV[pd] + iT;
  };
  iW.document.write(iA);
}

