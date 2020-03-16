	$('div').each(function(k) {
		var chapterTopic = $(this);
		chapterTopic.children("h4").after('<div class="topicIndex"></div>');
		var subToc = chapterTopic.children("h4").siblings(".topicIndex");

		chapterTopicNumber = k + 1

		chapterTopic.find("strong").each(function(j) {
			var section = $(this), sectionNumber = j + 1;
			var sectionName = section.text();
			subToc.append('<a href="#subtopic-' + chapterTopicNumber + "-" +sectionNumber+'" target="_self">'+sectionName+'</a><br>');
			section.attr('id', 'subtopic-' + chapterTopicNumber + "-" + sectionNumber);
		});
	});
