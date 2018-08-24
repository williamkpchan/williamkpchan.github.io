	stkpriceDataArr = [1,3,4];

	function drawchart() {
		theMax = Math.max(...stkpriceDataArr);
		theMin = Math.min(...stkpriceDataArr);

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

//			adjustable: true,
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
//				backgroundGridAutofitNumhlines: 7,

				axisColor: '#392',
//			labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
			textColor: 'grey',
		}
	    }).draw()
	};
