
setwd("D:/KPC/Dropbox/Public/LibDocs/recentChinBooks")

pageList = readLines("booklist.txt")
totalpages = length(pageList)

sampleheader = readLines("sample.html")

for (page in 1:totalpages){
	cat(page , " ")
	thepage=readLines(pageList[page])
	startline = grep("<table border=", thepage)
	thepage = thepage[-(1:startline[1])]
	sink(paste0(sprintf("%03d", page),".html"))
	cat(sampleheader, sep="\n")
	cat(thepage, sep="\n")
	sink()
}

#======
