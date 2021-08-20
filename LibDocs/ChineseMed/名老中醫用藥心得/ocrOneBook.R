library(crayon)
library(magick)
library(tesseract)

tesseractTrainData = "C:/Users/william/AppData/Local/tesseract4/tesseract4/tessdata/"
# remember to copy the traindata to the folder
#chi <- tesseract("chi_sim")
chi <- tesseract("chi_simAcer0")

datapathOCR = "C:/R programs/chineseOCR/laozhyi"

setwd(datapathOCR)
  cat(red("\nExtracting images from pdf..."))
  shell(shQuote("C:/xpdf-tools-win-4.03/bin64/pdfimages a.pdf -j"))

  cat(yellow("\nrenaming images from pgm to jpg"))
  shell(shQuote("ren *.pgm *.jpg"))
  shell(shQuote("ren *.pbm *.jpg"))
  shell(shQuote("del *.ppm"))

  # run rename.bat to use _j_ name
  allText = character()
  allFiles <- list.files(path = datapathOCR, pattern = "jpg", full.names = FALSE)
  cat("\ncropping images...")

    # form: AxB+C+D, width x height starting at x:C, y:D
    # crop out width:100px and height:150px starting +50px from the left
    # image_crop(image, "100x150+50")

    # width = 1748 height = 2793 cut: 0-245, and 2600-2760
  for(i in allFiles){
    imgLine = paste0('<br><img class="lazy" data-src="', i, '"><br>')
    allText = c(allText, imgLine)
  }

Sys.setlocale(category = 'LC_ALL', 'Chinese')
options("encoding" = "UTF-8")

sink("result.txt")
  cat(allText, sep="\n")
sink()
