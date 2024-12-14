url = "https://williamkpchan.github.io/LibDocs/physicalTherapy.html"
textfile = "" // cannot directly assign to fetch because time delay
targetpattern = "<h2>";
arrayOfStrings = []

// Function to locate the marker substring, eg targetpattern <h2>
function findSubstring(arr, substring) {
  indexarr = []
  for (i = 0; i < arr.length; i++) {
    index = arr[i].indexOf(substring);
    if (index != -1) {
      indexarr.push(i)
    }
  }
  return indexarr;
}


function chopblocks(arr, substring) {
  for (i = 0; i < result.length-1; i++) {
    startLine = result[i]
    endLine = result[i+1] -1
    subsetArray = textfile.slice(startLine, endLine);
    arrayOfStrings.push(subsetArray.join("<br>"))
  }
    startLine = result[result.length-1]
    endindex = textfile.indexOf("readbook");
    lastString = textfile.slice(startLine, endLine);
    arrayOfStrings.push(lastString.join("<br>"))
}


// fetch file and chopblocks
function chopblocks(url) {
  fetch(url).then( r => r.text())
   .then(data => data.split('\n')) // split into lines
   .then(data => textfile = data)
   .then(data => result = findSubstring(data, targetpattern)) // result is the pointer array
   .then(data => result = chopblocks()
  )
  return arrayOfStrings
}
