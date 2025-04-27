const hsReservedCode = [ "110000","110001","110002","110003","110004","110010","110030","110041","110050","110078","111000","111100","221000",]

let stkdata;
let stockData;
theCode = '000002'
theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,42,qfq';
theModCode = ""

function checkCodeLen(theCode) {
  codewidth = theCode.length
  if(codewidth <= 5){
    theCode = "00000"+theCode;
    codewidth = theCode.length;
    theCode = theCode.slice(codewidth-5, codewidth);
    codewidth = theCode.length; //update to be used later
    theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,60,qfq';
    theModCode = "hk"+theCode
  }else{
    if((codewidth == 6) && !hsReservedCode.includes(theCode)){
       if (theCode.charAt(0) == "6"){ theCode = "sh"+ theCode; 
       }else{ theCode = "sz" + theCode}
    }else if(codewidth == 9){
      theCode = theCode.substring(7, 9) + theCode.substring(0, 7);
    }
    codewidth = theCode.length; //update to be used later
    theurl = 'https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=' + theCode + ',day,,,60,qfq';
    theModCode = theCode
  }
}

checkCodeLen(theCode)
console.log("<r>theurl</r>: " + theurl)

fetch(theurl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })

  .then(text => {

    const jsonStr = text.replace('kline_dayqfq=', '');
    stkdata = JSON.parse(jsonStr);
console.log("<r>theCode</r>: " + theModCode + "<br>")
stkName = stkdata.data[`${theModCode}`].qt[`${theModCode}`][1];
console.log("<r>stkName</r>: " + stkName + "<br>")
console.log("<r>Object.keys stkdata</r>: "+Object.keys(stkdata))

console.log("<r>Object.keys stkdata.data</r>: "+Object.keys(stkdata.data))
console.log("<r>Object.keys stkdata.data[`${theModCode}`]</r>: "+Object.keys(stkdata.data[`${theModCode}`]))
console.log("<r>Object.keys stkdata.data[`${theModCode}`].qt)</r>: "+Object.keys(stkdata.data[`${theModCode}`].qt))
console.log("<r>Object.keys stkdata.data[`${theModCode}`].qt[`${theModCode}`])</r>: "+Object.keys(stkdata.data[`${theModCode}`].qt[`${theModCode}`]))
console.log("<r>Object.keys stkdata.data[`${theModCode}`].qt[`${theModCode}`][1])</r>: "+ stkdata.data[`${theModCode}`].qt[`${theModCode}`][1])
console.log("<r>stkdata.data</r>: ")
newObj = stkdata.data[`${theModCode}`].qfqday || stkdata.data[`${theModCode}`].day
console.log("<r>newObj</r>: " + newObj[0])

dateArr = []
closeArr = [];
highArr = [];
lowArr = [];
for (let i = 0; i < newObj.length; i++) {
    dateArr.push(newObj[i][0]);  // no Number here
    closeArr.push(Number(newObj[i][2]));
    highArr.push(Number(newObj[i][3]));
    lowArr.push(Number(newObj[i][4]));
}
console.log("<r>dateArr[newObj.length-1]</r>: " + dateArr[newObj.length-1])
console.log("<r>closeArr[newObj.length-1]</r>: " + closeArr[newObj.length-1])


    if (stkdata.code === 0) {
      const stkNameObj = stkdata.data[`${theModCode}`].qt

      const qtValue = stkdata.data[`${theModCode}`].qt[`${theModCode}`][44]
      console.log(qtValue);
      console.log(parseInt(qtValue));

    } else {
      console.log(`Request failed with error: ${stkdata.msg}`);
    }

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

