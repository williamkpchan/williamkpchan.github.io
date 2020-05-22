function largerFont() {
    var font_size = $("body").css('font-size');
    var font_sizeVal = parseInt(font_size.substr(0, 2)) + 2;
    font_size = font_sizeVal + "px";
    $("body").css('font-size', font_size);
    //window.localStorage["bodyFontSize"] = size;
    //console.log($("body").css('font-size'));
}
function smallerFont() {
    var font_size = $("body").css('font-size');
    var font_sizeVal = parseInt(font_size.substr(0, 2)) - 2;
    font_size = font_sizeVal + "px";
    $("body").css('font-size', font_size);
    //window.localStorage["bodyFontSize"] = size;
    //console.log($("body").css('font-size'));
}
