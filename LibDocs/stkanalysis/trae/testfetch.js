let stkdata;
let stockData;

fetch()
  theCode = $("#editor").text
  theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,42,qfq';
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(text => {
    const jsonStr = text.replace('kline_dayqfq=', '');
    stkdata = JSON.parse(jsonStr);
    if (stkdata.code === 0) {
      console.log(Object.keys(stkdata.data[`hk${theCode}`]))
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
