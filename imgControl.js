$("img").click(function() {
 $('img').css('max-height', $(window).height());
 window.location = "#topic-" + topicpointer;
})

$("img").dblclick(function() {
 $('img').css('height', 'auto');
 $('img').css('width', 'auto');
 window.location = "#topic-" + topicpointer;
})
