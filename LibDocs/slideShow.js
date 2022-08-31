elapseTIme = 5000 // 5 sec
function chkKey() {
  var testkey = getChar(event);
  if(testkey == 'a'){autoShowImg(repeats)}
  else if(testkey == 'A'){autoShowImg(imgnotvisitedList.length)}
  else if(testkey == 'm'){alert(imgnotvisitedList[imgpointer])}
  else if(testkey == 'v'){ viewOriginal();}
  else if(testkey == '5'){ randomPointer();}
  else if(testkey == '2'){ zoomout();}
  else if((testkey == 'f')||(testkey == '6')){
    forwardImg();
    window.location="#pictList";
    document.body.style.cursor = "none"
  }
  else if((testkey == 'b')||(testkey == '4')){
    backwordImg();
    window.location="#pictList";
    document.body.style.cursor = "none"
  }

  else{chkOtherKeys(testkey)} 

}
function getChar(event) {
  if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}

function forwardImg() {
  if(imgpointer < imgnotvisitedList.length-1){ imgpointer = imgpointer + 1 }
  else{ imgpointer = 0 }
  $("#pictList").html(assembleImgLink(imgnotvisitedList[imgpointer]));
}
function backwordImg() {
  if(imgpointer > 0){ imgpointer = imgpointer - 1 }
  else{ imgpointer = imgnotvisitedList.length - 1 }
  $("#pictList").html(assembleImgLink(imgnotvisitedList[imgpointer]));
}
function autoShowImg(countNumber) {
  console.log("auto")
  if (countNumber > 0) {
    forwardImg()
    setTimeout(() => autoShowImg(countNumber - 1), elapseTIme)
  }
}

function viewOriginal() {
  imgUrl = imgnotvisitedList[imgpointer]
  imgUrl = assembleImgUrl(imgUrl);
  window.open(imgUrl);
}

function assembleImgLink(imgUrl) {
      return "<img src='" + imgHeader + imgUrl + "'>"
}

function assembleImgUrl(imgUrl) {
      return imgHeader+imgUrl
}

function shuffle(array) {
    var i = array.length, j = 0, temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1)); temp = array[i];
        array[i] = array[j]; array[j] = temp;
    }
    return array;
}

function zoomin(){
        var currWidth = $("#pictList > img").clientWidth;
 console.log(currWidth)
        $("#pictList").style.width = (currWidth + 100) + "px";
}
function zoomout(){
        var currWidth = $("#pictList > img").clientWidth;
        if(currWidth > 100){
          $("#pictList > img").style.width = (currWidth - 100) + "px";
        }
    }

function randomPointer(){
    imgpointer = Math.floor(Math.random() * imgnotvisitedList.length)
    forwardImg()
}
    repeats = 10

    imgnotvisitedList = pictList
    imgpointer = Math.floor(Math.random() * imgnotvisitedList.length)

    forwardImg()

document.body.style.cursor = "none"

