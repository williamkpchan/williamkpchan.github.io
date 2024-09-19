var topicLength;

if (typeof markerName == 'undefined') { markerName = 'h2';}
if(typeof(topicEnd) == 'undefined'){ topicEnd = "<br>";}

var toc = $('#toc');
var markerList = []

if(markerName != "h0"){
  $(markerName).each(function(i) {
      // prepare for the toc
      var topic = $(this), topicNumber = i; topicLength = topicNumber +1;

      // make a content list
      var markerContent = $(this).text();
      markerList.push(markerContent);
  
      // toc coding here
      if (typeof(showTopicNumber) !== 'undefined'){
        if (showTopicNumber == true){
          toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a>'+topicEnd);
        }else{
          toc.append('<a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a>'+topicEnd);
        }
      }else{
        toc.append('<a href="#topic-'+topicNumber+'" target="_self" onclick="jumpto(' + topicNumber + ')">'+topic.html()+'</a><br>');
      }
      // toc.append(topicNumber +' <a href="#topic-'+topicNumber+'" target="_self">'+topic.html()+'</a><br>');

      // modify the target id
      topic.attr('id', 'topic-' + topicNumber);
      topic.after('&emsp;<a href=#top target="_self"><b>&#8679;</b></a><br>')
  });
}

totalLength = topicLength
notvisitedList = [...Array(totalLength).keys()];
imgnotvisitedList = notvisitedList
WLPointer = 0
