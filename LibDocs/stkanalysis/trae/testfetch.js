let stkdata;
let stockData;
  theCode = '01810'
  //theCode = $("#editor").text
  theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,42,qfq';


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
console.log("jsonStr: " + jsonStr + "<br><br>")
console.log("theCode: " + theCode + "<br><br>")
console.log("Object.keys stkdata: "+Object.keys(stkdata))
console.log("Object.keys stkdata.data: "+Object.keys(stkdata.data))
console.log("Object.keys stkdata.data[`hk${theCode}`]: "+Object.keys(stkdata.data[`hk${theCode}`]))
console.log("Object.keys stkdata.data[`hk${theCode}`].qt): "+Object.keys(stkdata.data[`hk${theCode}`].qt))
console.log("Object.keys stkdata.data[`hk${theCode}`].qt[`hk${theCode}`]): "+Object.keys(stkdata.data[`hk${theCode}`].qt[`hk${theCode}`]))
console.log("Object.keys stkdata.data[`hk${theCode}`].qt[`hk${theCode}`][1]): "+ stkdata.data[`hk${theCode}`].qt[`hk${theCode}`][1])

    if (stkdata.code === 0) {
      const stkNameObj = stkdata.data[`hk${theCode}`].qt

      const qtValue = stkdata.data[`hk${theCode}`].qt[`hk${theCode}`][44]
      console.log(qtValue);
      console.log(parseInt(qtValue));

    } else {
      console.log(`Request failed with error: ${stkdata.msg}`);
    }

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

