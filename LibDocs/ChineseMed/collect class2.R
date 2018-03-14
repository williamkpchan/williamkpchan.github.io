Sys.setlocale(category = 'LC_ALL', 'Chinese')	# this must be added to script to show chinese

dirStr = "D:/Users/REXTONG/Desktop/Herb/class2"
setwd(dirStr)

pageHead = '<body>'
pageTail = '</body>'

theFilename = "class2.html"
theExtractList = "class2List.txt"

tocpage = readLines(theExtractList, warn = F)
lentocpage = length(tocpage)

newpage = ""

chopHead <- function(thepage, pageHead){
	headlinenum = grep(pageHead, thepage)  # chop head
    return(thepage[-(1:(headlinenum-1))])
}

chopTail <- function(thepage, pageTail){
    taillinenum = grep(pageTail, thepage)  # chop tail
	if(length(taillinenum) != 0){
	    return(thepage[-(taillinenum:length(thepage))])
	} else {
		return("")
	}
}

for(i in 1:lentocpage){
	cat(i, " ")
	theURL = tocpage[i]
	thepage = readLines(theURL, warn = F)
   	thepage = chopHead(thepage, pageHead)
   	thepage = chopTail(thepage, pageTail)
   	newpage = c(newpage, thepage)
}

sink(theFilename)
cat(newpage, sep = "\n")
sink()

