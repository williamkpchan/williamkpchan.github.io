  $(function() {
    var toc = $('#toc>ul');

    function makeLi(text, href) {
      return $('<a href="' + href + '" target="_self">' + text + '</a><br>');
    }

    $('b.topic').each(function(i) {
      var chapter = $(this), chapterNumber = i + 1;
      toc.append(
        makeLi(chapter.text(), '#chapter-' + chapterNumber)
      );
      chapter.attr('id', 'chapter-' + chapterNumber);
    });

  });
