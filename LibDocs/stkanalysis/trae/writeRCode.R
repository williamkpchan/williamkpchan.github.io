
# Define the data
tblData282828 <- c(39, 22, 15, 14, 11, 14, 15, 14, 20, 14, 21, 21, 22, 21, 23, 13, 16, 26, 24, 25, 21, 21, 26, 29)

# Convert the data to a string format suitable for JavaScript
dataString <- paste0("const tblData282828 = [", paste(tblData282828, collapse = ","), "];")

# Append to HTML file
htmlFile <- "D:/Dropbox/Public/LibDocs/stkanalysis/testfile.html"
write(dataString, file = htmlFile, append = TRUE)


