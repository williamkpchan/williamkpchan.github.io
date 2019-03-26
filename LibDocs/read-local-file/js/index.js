function readSingleFile(afile) {
  var file = afile.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(thefile) {
    var contents = thefile.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.innerHTML = contents;
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);
