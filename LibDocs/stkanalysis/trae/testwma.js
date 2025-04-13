function checkX(prevL, prevS, curL, curS) {
 if (curS == curL){return "<y>平</y>" }
 if (((prevL == prevS) && (curS > curL )) || ((prevL>prevS) && (curS > curL ))){
  return '<r>升穿</r>'
 }
 if (((prevL == prevS) && (curS < curL )) || ((prevL<prevS) && (curS < curL ))){
  return '<bgr>跌穿</bgr>'
 }
 if ((prevL<prevS) && (curS > curL )){return '<pk>继续升</pk>' } // c must > prevC, this is not correct, further check for condition
 if ((prevL>prevS) && (curS < curL )){return '<lg>继续跌</lg>' }
}


function calculateWeightedMovingAverage(data, period) {
 if (data.length < period) {
  throw new Error("Data array is shorter than the period.");
 }

 // calculate the weights and sum of weights
 const weights = Array.from({ length: period }, (_, i) => i + 1);
 const weightSum = weights.reduce((a, b) => a + b, 0);
 
 // extract recentData
 const recentData = data.slice(data.length - period);

 // calculate weightedSum, this is still the sum
 const weightedSum = recentData.reduce((sum, value, index) => {
  return sum + value * weights[index];
 }, 0);

 return weightedSum / weightSum;  // this is ema value
}

function checkXStatus(shortperiod, longperiod) {
 // Create a new array without the last element
 prevArray = data.slice(0, data.length - 1);

 prevLWma = calculateWeightedMovingAverage(prevArray, longperiod);
 prevSWma = calculateWeightedMovingAverage(prevArray, shortperiod);
 curLWma = calculateWeightedMovingAverage(data, longperiod);
 curSWma = calculateWeightedMovingAverage(data, shortperiod);
  console.log("prevLWma " +prevLWma)
  console.log("prevSWma " +prevSWma)
  console.log("curLWma " +curLWma)
  console.log("curSWma " +curSWma)

  longTrend = [prevLWma, curLWma]
  shortTrend = [prevSWma, curSWma]

 // <y>动态创建画布</y>
 const canvas = document.createElement('canvas');
   canvas.width = 200;
   canvas.height = 100;
 document.body.appendChild(canvas);

 // <y>获取画布上下文</y>
 const ctx = canvas.getContext('2d');

 // <y>绘制图表</y>
 new Chart(ctx, {
  type: 'line',
  data: {
   labels: Array.from({length: data.length}, (_, i) => i + 1),
   datasets: [
    {
     label: 'data',
     data: data,
     borderColor: 'red',
     fill: false,
     borderWidth: 1,
     pointStyle: false,
    },
    {
     label: 'longTrend',
     data: longTrend,
     borderColor: 'blue',
     fill: false,
     borderWidth: 1,
     pointStyle: false,
    },
    {
     label: 'shortTrend',
     data: shortTrend,
     borderColor: 'green',
     fill: false,
     borderWidth: 1,
     pointStyle: false,
    }
   ]
  },
  options: {
   responsive: true,
   scales: {
    x: {
     display: true,
     title: {
      display: false,
      text: 'Time'
     }
    },
    y: {
     display: true,
     title: {
      display: false,
      text: 'Price'
     }
    }
   }
  }
 });

 return (shortperiod + "日线" + checkX(prevLWma, prevSWma, curLWma, curSWma) + longperiod + "日线")
}

// Example usage:
const data = [10, 20, 40, 30, 35, 30, 35];

console.log(checkXStatus(3, 5))