$("img").click(function() {
 $('img').css('max-height', $(window).height());
 window.location = "#topic-" + topicpointer;
})

$("img").dblclick(function() {
 $('img').css('max-height', '100%');
 window.location = "#topic-" + topicpointer;
})
