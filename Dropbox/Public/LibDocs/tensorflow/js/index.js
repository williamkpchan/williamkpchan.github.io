const trainX = [
  3.3,4.4,5.5,6.71,6.93,4.168,9.779,6.182,7.59,2.167,7.042,10.791,5.313,7.997,5.654,9.27,3.1
];
const trainY = [
  1.7,2.76,2.09,3.19,1.694,1.573,3.366,2.596,2.53,1.221,2.827,3.465,1.65,2.904,2.42,2.94,1.3
];

const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));

function predict(x) {
  return tf.tidy(function() {
    return m.mul(x).add(b);
  });
}

function loss(prediction, labels) {
  //subtracts the two arrays & squares each element of the tensor then finds the mean.
  const error = prediction.sub(labels).square().mean();
  return error;
}

function train() {
  const learningRate = 0.005;
  const optimizer = tf.train.sgd(learningRate);

  optimizer.minimize(function() {
    const predsYs = predict(tf.tensor1d(trainX));
    console.log(predsYs);
    stepLoss = loss(predsYs, tf.tensor1d(trainY));
    console.log(stepLoss.dataSync()[0]);
    return stepLoss;
  });
  plot();
}
const predictionsBefore = predict(tf.tensor1d(trainX));

async function plot() {
  let plotData = [];

  for (let i = 0; i < trainY.length; i++) {
    plotData.push({ x: trainX[i], y: trainY[i] });
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  var scatterChart = new Chart(ctx, {
    type: "line",  data: {
      datasets: [
        {
          label: "Training Data",        showLine: false,        data: plotData,        fill: false
        },      {
          label: "Y = " + m.dataSync()[0] + "X + " + b.dataSync()[0],        data: [
            {
              x: 0,            y: b.dataSync()[0]
            },          {
              x: 11,            y: 11 * m.dataSync()[0] + b.dataSync()[0]
            }
          ],

          // Changes this dataset to become a line
          type: "line",        borderColor: "red",        fill: false
        }
      ]
    },  options: {
      scales: {
          yAxes: [
           {
              ticks: {
                max: 5
              }
            }
          ],      xAxes: [
          {
            type: "linear",          position: "bottom"
          }
        ]
      }
    }
  });
}
plot();