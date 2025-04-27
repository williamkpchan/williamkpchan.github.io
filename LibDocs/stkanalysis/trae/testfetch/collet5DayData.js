let theurlHead = 'https://web.ifzq.gtimg.cn/appstock/app/day/query?code=hk'
const theCode = '00388'


// Start the process
async function main() {
	fetch5DayData()
}

function fetch5DayData(theCode) {
  let theurl = theurlHead + theCode
  RGraph.AJAX.getJSON(theurl, function (rawJSON){
  // jsonString = '{"code":0,"msg":"","data":{"hk00388"
  keys = Object.keys(rawJSON); // read the structure keys ["code", "msg", "data"]
  console.log(keys);

  data5Day = rawJSON.data
  thestkkey = Object.keys(thedata)[0] // this is the stk key name
  tempdata = thedata[Object.keys(thedata)[0]]; // {data: Array(5), qt: {…}, vcm: ""} five sets of data here

  var thedata = rawJSON[Object.keys(rawJSON)[2]]
  thestkkey = Object.keys(thedata)[0] // this is 
	// 	console.log("BaseObj.hk00388.stkname" + "<br>" + BaseObj['hk00388'].stkname);
	// 	console.log("BaseObj.hk00388.lastDateValue" + "<br>" + BaseObj['hk00388'].lastDateValue);
	// 	console.log("BaseObj.hk00388.high" + "<br>" + BaseObj['hk00388'].high);
	// 	console.log("BaseObj.hk00388.low" + "<br>" + BaseObj['hk00388'].low);
	//   console.log("BaseObj.hk00388.closes" + "<br>" + BaseObj['hk00388'].closes);
  })
}

main()