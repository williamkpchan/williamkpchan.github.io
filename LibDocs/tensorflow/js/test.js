const trainY = [
  3.3, 4.4, 5.5, 6.71, 6.93, 4.168, 9.779, 6.182, 7.59, 2.167, 7.042, 10.791, 5.313, 7.997, 5.654, 9.27, 3.1, 1, 10, 11.5, 8, 9, 6
];
const trainX = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));

function predict(x) { return tf.tidy(function() { return m.mul(x).add(b); });}
function loss(prediction, labels) { return prediction.sub(labels).square().mean();}

function train() {
  const learningRate = 0.001;
  const optimizer = tf.train.sgd(learningRate);

  optimizer.minimize(function() {
	const predsYs = predict(tf.tensor1d(trainX));
	stepLoss = loss(predsYs, tf.tensor1d(trainY));
	themsg = "the error is " + stepLoss.dataSync()[0] +"&emsp;"+ " m = " + m.dataSync()[0] +"&emsp;"+ " b = " + b.dataSync()[0] + "<br>"
	+ "the endpoint is x: "+ trainX[trainX.length-1] + "&emsp;"+"y: " +(trainY[trainX.length-1] * m.dataSync()[0] + b.dataSync()[0]) + "<br><br>"
	$("#report").prepend(themsg);
	return stepLoss;
	plot(); 
  });
}
