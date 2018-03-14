Sys.setlocale(category = 'LC_ALL', 'Chinese')	# this must be added to script to show chinese

dirStr = "D:/Users/REXTONG/Desktop/Herb/class6"
setwd(dirStr)

pageHead = '<body>'
pageTail = '<p><script'

theFilename = "class6.html"
theExtractList = "class6List.txt"

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
cat('<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><base target=_blank><style>body { margin: 10%; font-size: 20px; background-color: #000000; color: #109030;}a { text-decoration: none; color: #28B8B8;}a:visited { color: #389898;}A:hover { color: yellow;}A:focus { color: red;}code { color: pink; background-color: #001500}pre { color: gray; background-color: #001010}div {display: inline-block; width: 48%; padding: 3px; border-radius: 4px; border: 1px solid gray; margin: 3px; vertical-align:middle;}</style>/n</head><body>/n')
cat(newpage, sep = "\n")
sink()

