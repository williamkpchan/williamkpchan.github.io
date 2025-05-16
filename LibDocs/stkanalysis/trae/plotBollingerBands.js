

// <y>加权移动平均 (WMA)</y>
function weightedMovingAverage(data, period) {
 const weights = Array.from({length: period}, (_, i) => period - i);
 const wma = new Array(period - 1).fill(null); // <y>填充 null</y>
 for (let i = period - 1; i < data.length; i++) {
  let sum = 0;
  let weightSum = 0;
  for (let j = 0; j < period; j++) {
   sum += data[i - j] * weights[j];
   weightSum += weights[j];
  }
  wma.push(sum / weightSum);
 }
 return wma;
}

// <y>标准差</y>
function standardDeviation(data, period) {
 const std = new Array(period - 1).fill(null); // <y>填充 null</y>
 for (let i = period - 1; i < data.length; i++) {
  const avg = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
  const variance = data.slice(i - period + 1, i + 1).reduce((a, b) => a + Math.pow(b - avg, 2), 0) / period;
  std.push(Math.sqrt(variance));
 }
 return std;
}

// <y>计算保力加通道</y>
function bollingerBands(data, period, multiplier) {
 const wmaL1 = weightedMovingAverage(data, period);
 const wmaL2 = weightedMovingAverage(data, period*2);
 const wmaL3 = weightedMovingAverage(data, period*3);
 const wmaL4 = weightedMovingAverage(data, period*4);
 const wmaL5 = weightedMovingAverage(data, period*5);

 const std = standardDeviation(data, period);
 const upperBand = wmaL2.map((val, i) => val === null ? null : val + multiplier * std[i]);
 const lowerBand = wmaL2.map((val, i) => val === null ? null : val - multiplier * std[i]);
//console.log("lowerBand: ",lowerBand)
 return { wmaL1, wmaL2, wmaL3, wmaL4, wmaL5, upperBand, lowerBand, std };
}

function plotBollingerBands(data, dateArr, period, multiplier, chartTitle, stockName) {
    // 计算保力加通道数据
    const bands = bollingerBands(data, period, multiplier);

    // 创建标题
    const title = document.createElement('pk');
    title.innerHTML = chartTitle + " " + thecode +" "+stockName+ '&emsp;<a href=#top target="_self"><b>&#8679;</b></a><br>';
    document.body.appendChild(title);

    // 动态创建画布
    const canvas = document.createElement('canvas');
    const aspectRatio = 1.2; // 预设宽高比
    const containerWidth = document.body.clientWidth; // 获取页面宽度
    canvas.style.width = '100%';
    canvas.width = containerWidth;
    canvas.height = containerWidth / aspectRatio; 
    document.body.appendChild(canvas);

    // 获取画布上下文
    const ctx = canvas.getContext('2d');

    // 绘制图表
    new Chart(ctx, {
        type: 'line',
        data: {
            //labels: Array.from({ length: data.length }, (_, i) => i + 1),
            labels: dateArr,
            datasets: [
                {
                    label: 'Price',
                    data: data,
                    borderColor: 'yellow',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },
                {
                    label: 'WMAL5',
                    data: bands.wmaL1,
                    borderColor: 'green',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },
                {
                    label: 'wmaL10',
                    data: bands.wmaL2,
                    borderColor: 'red',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },
                {
                    label: 'wmaL15',
                    data: bands.wmaL3,
                    borderColor: 'orange',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },
                {
                    label: 'wmaL20',
                    data: bands.wmaL4,
                    borderColor: 'brown',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },
                {
                    label: 'wmaL25',
                    data: bands.wmaL5,
                    borderColor: 'gray',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },
                {
                    label: 'Upper Band',
                    data: bands.upperBand,
                    borderColor: 'purple',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },
                {
                    label: 'Lower Band',
                    data: bands.lowerBand,
                    borderColor: 'purple',
                    fill: false,
                    borderWidth: 1,
                    pointStyle: false,
                },

            ]
        },
        options: {
            responsive: false,
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
}

plotBollingerBands(closeArr, dateArr, 5, 1,"收市", stockName);
