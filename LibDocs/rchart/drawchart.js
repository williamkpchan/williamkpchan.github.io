// stkpriceDataArr = [1,3,4];
// stLineData  = [1,4]; is the start and end point

theMax = Math.max(...stkpriceDataArr);
theMin = Math.min(...stkpriceDataArr);

function drawchart() {
	var line = new RGraph.Line({
		id: 'cvs',
		data: stkpriceDataArr,
		options: {
			title: 'Test Chart',
			titleColor: 'grey',
			titleSize: 25,
			titleVpos: 0.1,
			spline: true,
			textAccessible: true,
			hmargin: 0,
			gutterBottom: 35,
			gutterLeft: 0,
			ylabels: true,
			numticks: null,
			numlabels: 15,

			noyaxis: false,

			linewidth: 0.5,
			shadow: false,
			colors: ['blue'],
			tickmarks: 'triangle',
			ticksize: 2,
			textSize: 10,
			ymax: theMax,
			ymin: theMin,

			backgroundGrid: true,
			backgroundGridColor:  '#242',
			backgroundGridVlines: false,
			backgroundGridHlines: true,
			backgroundGridBorder: true,
			axisColor: '#392',
			labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
			textColor: 'grey',
		}
	}).draw()
};

function drawStLine() {
	var stLine = new RGraph.Line({
		id: 'cvs',
		data: stLineData,
		options: {
			spline: false,
			hmargin: 0,
			gutterBottom: 35,
			gutterLeft: 0,
			ylabels: true,
			numticks: null,
			numlabels: 15,
			noyaxis: false,
			linewidth: 1,
			colors: ['red'],
			tickmarks: 'triangle',
			ticksize: 3,
			textSize: 10,
			ymax: theMax,
			ymin: theMin,

			backgroundGrid: true,
			backgroundGridColor:  '#242',
			backgroundGridVlines: false,
			backgroundGridHlines: true,
			backgroundGridBorder: true,
			axisColor: '#392',
			textColor: 'grey',
		}
	}).draw()
};
