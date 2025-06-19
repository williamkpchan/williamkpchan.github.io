# filter pinterest file
library(crayon)
workFolder = "D:/Dropbox/Public/LibDocs/stkanalysis/trae/pinterest_scraper"
setwd(workFolder)
#filename = "nameHeader_250615_1533"
cat(red("\n\n\nremove empty lines!\n"))
cat(pink("make sure all imgs on one line of its own! and remove empty lines\n\n\n"))


filename = readline("enter filename without extension: ")
wholePage = readLines(paste0(filename,".html"))

wholePage <- unlist(strsplit(wholePage, "<img"))
wholePage = gsub("^ {1,}", "", wholePage)

wholePage = wholePage[wholePage != ""]
oldwholePageLen = length(wholePage)

cat("all wholePage ",length(wholePage))
cat(red("\nfiltering...\n"))

pngIdx = grep("\\.png", wholePage)
cat("\npngIdx ",  length(pngIdx),"\n")
if(length(pngIdx)>0){
  wholePage = wholePage[-pngIdx]
}

videoIdx = grep("videos", wholePage)
cat("\nvideoIdx ",  length(videoIdx),"\n")
if(length(videoIdx)>0){
  wholePage = wholePage[-videoIdx]
}

smallImgIdx = grep("75x75", wholePage)
cat("\nsmallImgIdx ",  length(smallImgIdx),"\n")
if(length(smallImgIdx)>0){
  wholePage = wholePage[-smallImgIdx]
}

uniqueElements = unique(gsub("src=.*/", "", wholePage))

uniqueEleLen = length(uniqueElements)
cat("\nuniqueElements length:",uniqueEleLen,"\n")

removeIdx = numeric()

for(i in 1:uniqueEleLen){
  cat(". ",i,"of", uniqueEleLen)
  # seek this element
  seekEle = uniqueElements[i]

  # seek elements
  eleIdx = grep(seekEle, wholePage)
  cat(" common ele:", length(eleIdx),"")

  eleIdx = eleIdx[-length(eleIdx)]
  cat("remove ele:", length(eleIdx),"")

  removeIdx = c(removeIdx, eleIdx)
  removeIdx = unique(removeIdx)
  cat("total remove elements:", length(removeIdx),"\n")

}
newwholePage = wholePage[-removeIdx]
cat(red("remain elements:", length(newwholePage),"\n"))
cat("\noriginal line number:",oldwholePageLen)
cat("\nfinal line number:",length(newwholePage))

newfilename = paste0(filename, "filtered.html")
sink(newfilename)
cat(newwholePage, sep="\n")
sink()

cat("\n",format(Sys.time(), "%H:%M:%OS"),"Job completed\n")
