# filter pinterest file
library(crayon)
workFolder = "D:/Dropbox/Public/LibDocs/stkanalysis/trae/pinterest_scraper"
setwd(workFolder)
#filename = "nameHeader_250615_1533"
cat(red("remove empty lines!"))

filename = readline("enter filename without extension: ")
wholePage = readLines(paste0(filename,".html"))

emptyLineIdx = grep("^\n", wholePage)
if(length(emptyLineIdx)>0){
  wholePage = wholePage[-emptyLineIdx]
}


cat("all wholePage ",length(wholePage))
cat(red("filtering..."))
pngIdx = grep("\\.png", wholePage)
wholePage = wholePage[-pngIdx]

uniqueElements = unique(gsub("<img.*/", "", wholePage))

uniqueEleLen = length(uniqueElements)
cat("uniqueElements ",uniqueEleLen)

removeIdx = numeric()

for(i in 1:uniqueEleLen){
  cat(". ",i,"of", uniqueEleLen)
  # seek this element
  seekEle = uniqueElements[i]

  # seek elements
  eleIdx = grep(seekEle, wholePage)
  eleIdx = eleIdx[-length(eleIdx)]

  removeIdx = c(removeIdx, eleIdx)
}
newwholePage = wholePage[-removeIdx]

newfilename = paste0(filename, "filtered.html")
sink(newfilename)
cat(newwholePage, sep="\n")
sink()

cat("\n",format(Sys.time(), "%H:%M:%OS"),"Job completed\n")
