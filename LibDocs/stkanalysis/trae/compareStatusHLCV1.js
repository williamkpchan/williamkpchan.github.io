//const codeTable = ['00001', '00002', '00003', '00005', '00006', '00011', '00012', '00016', '00017', '00027', '00066', '00101', '00175', '00241', '00267', '00285', '00288', '00291', '00316', '00322', '00386', '00388', '00669', '00688', '00700', '00762', '00823', '00836', '00857', '00868', '00881', '00883', '00939', '00941', '00960', '00968', '00981', '00992', '01038', '01044', '01088', '01093', '01099', '01109', '01113', '01177', '01209', '01211', '01299', '01378', '01398', '01876', '01928', '01929', '01997', '02020', '02269', '02313', '02318', '02319', '02331', '02359', '02382', '02388', '02628', '02688', '02899', '03692', '03968', '03988', '06690', '06862', '09618', '09633', '09961', '09988', '09999', '02800', '01951', '01385',];
// 老千 '00302','02233','00357',
//const codeTable = ['00388', '02208', '01951', '01448', '01171', '02800', '00700', '09988', '00005', '00883', '02828', '00857', '00939', '02318', '01299', '03968', '00941', '01398', '00522', '09618', '00386', '01211', '02899', '03988', '09999', '01088', '00016', '01288', '02269', '09961', '01816', '02382', '00992', '01919', '01109', '00981', '00836', '00001', '09633', '01093', '02601', '01910', '00027', '00669', '06690', '02020', '00011', '02388', '00916', '01928', '00020', '00175', '02628', '00291', '01833', '01378', '00728', '02359', '09626', '00002', '02331', '06862', '01113', '00780', '00006', '01801', '00762', '09901', '02688', '03993', '01548', '02618', '09992', '00288', '06160', '02319', '01766', '00285', '01972', '01800', '00003', '00960', '06030', '01658', '00966', '01138', '02057', '00688', '06881', '01336', '03908', '02313', '01898', '00968', '02333', '03692', '03328', '01347', '01038', '03888', '09987', '01339', '01177', '02018', '02328', '01099', '02883', '00135', '01193', '01876', '06865', '02338', '01209', '03800', '00316', '01818', '00358', '02600', '01071', '01913', '00241', '00019', '01997', '03067', '02380', '00868', '03998', '02202', '00322', '02588', '00819', '00998', '00384', '00763', '01787', '02099', '00101', '00425', '00914', '03898', '00570', '01797', '00390', '00257', '00267', '00012', '00066', '06186', '00270', '00881', '03320', '02400', '00136', '02013', '03618', '01066', '01908', '01030', '00683', '06823', '01798', '03323', '01208', '03759', '01952', '06088', '01918', '01772', '00467', '01186', '03969', '01302', '00921', '01357', '06110', '09969', '01929', '02666', '00772', '06078', '00696', '03311', '00293', '00371', '03900', '00956', '02162', '02607', '00991', '06855', '02238', '00083', '01776', '02386', '06818', '00220', '00576', '06060', '01157', '00017', '03808', '01044', '02357', '00142', '03347', '01359', '06098', '01415', '00354', '01179', '00014', '03110', '02196', '01128', '00189', '03032', '00123', '01896', '02343', '00934', '00867', '01368', '00995', '00177', '00552', '01883', '00639', '00151', '09922', '00489', '00152', '00148', '00586', '01381', '01530', '00853', '01882', '00813', '03360', '00799', '00598', '02096', '00667', '09698', '01610', '01618', '02888', '01821', '03738', '06066', '02186', '06699', '00880', '02128', '00884', '01072', '06886', '00874', '01070', '01516', '00551', '06049', '02669', '02257', '01513', '09995', '02255', '00694', '01681', '01999', '01508', '00631', '01478', '01385', '00777', '01055', '00525', '01199', '02039', '01060', '03613', '00004', '00579', '00338', '00817', '02869', '02638', '00856', '00548', '01963', '06869', '00081', '00363', '00590', '00303', '01958', '00200', '03377', '00317', '03709', '01579', '01316', '00656', '01119', '01811', '00341', '06099', '00909', '02689', '03319', '00087', '03958', '00297', '01907', '02145', '02276', '01888', '01313', '00861', '01310', '00038', '06185', '09959', '02777', '00345', '00010', '03899', '01666', '02005', '09966', '00460', '02877', '00023', '00440', '06808', '00179', '00855', '00596', '02866', '02285', '00347', '06666', '01995', '01877', '02362', '06127', '01428', '01691', '02158', '01515', '02155', '03983', '01600', '00165', '02801', '00710', '09911', '00708', '00670', '02611', '02252', '00308', '00823', '01613', '02009', '02823', '02822', '07226', '07299', '02840', '01858', '01860', '07200', '07288', '03037', '00412', '00751', '02727', '02356', '02342', '06178', '03188', '00778', '00636', '07568', '07522', '07552', '00182', '07500', '03606', '06969', '00268', '00144', '00564', '03668', '00300', '06181', '01698', '02556', '01164', '00788', '02577', '09896', '01810', '02015', '03690', '06618', '09888', '01024', '09926', '03033', '09868',];
const codeTable = ['01299','01788','09988','01810','03690','00700','00981','09868','00939','09926','02318','01211','01024','09992','09618','00241','00388','03750','01801','09995','01398','06060','01347','00941','09626','02015','03800','02586','03968','02628','02507','03988','01093','01530','09660','03678','02269','02899','02096','00883','09961','00020','09999','01519','00005','02587','03888','02648','01336','02382','06181','00553','09888','00175','00669','01177','01053','02020','01357','00165','01378','02388','01109','06160','01877','00308','03908','01952','00853','03896','00968','03868','03993','06030','00285','00268','01918','02601','02333','09880','00992','00027','00386','06881','02367','06936','09863','01928','01359','02328','01951','02331','09688','06955','06855','09698','02469','00267','00568','00016','02319','06693','02172','06690','02600','03328','01288','00998','09923','00688','02228','01428','00325','06086','00857','06618','01988','06168','02018','02550','06990','01208','00291','03738','00728','00358','02313','06869','06186','02359','00300','01339','01919','03692','01686','06862','01548','02076','01787','02400','02611','02186','01088','00256','01860','06055','06099','01997','01929','02282','00762','00001','01772','06682','00966','02268','01898','09676','06969','01108','01776','01709','00719','00780','02688','00136','01888','02423','01658','01385','09969','02432','00012','01193','02097','00902','01276','09899','02419','02577','01818','02556','02498','09636','06865','02338','01113','02157','01164','09633','01171','00836','00189','02162','00763','02050','02357','06603','01060','02013','00868','00512','02799','03898','00066','00002','06680','00013','02196','06088','00753','02057','00867','02888','06066','01375','00017','09866','03808','02238','03347','01318','02255','09699','09606','01258','01585','02598','00384','06886','02252','00200','00288','00772','02522','00003','00354','01635','01558','00916','06818','06178','01308','06127','00412','01833','00914','00522','00347','02666','02533','00489','00101','09987','03933','01880','03618','09901','06616','09911','01364','00788','00168','02616','03996','00917','06806','09878','02465','02016','02099','00895','01126','00322','02588','02202','00425','01070','00535','00581','00011','02380','00327','00552','03998','00317','02171','01415','02208','03900','01797','01908','02276','01209','02603','00270','09896','00697','03288','00856','00667','03877','02429','01138','06069','00826','00345','02618','01128','02105','01099','01698','00960','00316','00991','01773','00257','02510','00297','03360','01368','01477','01972','01044','01816','00467','00564','00314','01066','01675','01691','03759','03606','06821','03958','01541','01057','00019','00006','00323','09985','01910','02865','02443','01800','01274','00956','03939','02883','06110','01876','09696','00390','00817','02142','02460','09678','01349','01055','01316','06078','00999','09997','02777','02562','03323','00576','02610','00460','09959','01456','00177','02643','02158','02453','01071','09922','00220','01112','00187','00144','02858','02727','01610','01302','00631','02508','02517','02233','00588','00604','02343','00376','00683','00179','02009','00990','00586','00008','02155','06196','00921','02592','01341','06963','06098','02232','00083','00880','00881','01508','02552','00148','00551','02145','01038','09690','02555','02696','02563','06979','01735','01766','01030','01913','00863','06808','01114','00014','01033','06185','01478','00710','01606','06831','00590','00392','00135','01513','01837','00839','09890','03311','00371','00855','00038','06609','02607','03320','00123','01072','01911','09956','01186','01361','01083','09993','03330','00570','09979','02722','01896','02410','00548','02669','00558','00777','01799','06683','00434','01836','01579','02473','02312','02617','09885','00670','01611','06049','03668','00357','01963','02866','00218','00819','00696','00107','02192','01999','00598','02128','03339','02285','01651','02256','00874','06666','01882','00303','01313','00340','02273','00909','00596','00152','00525','03866','01167','02257','01157','01907','01516','00293','06699','01618','03931','00639','02150','01811','02689','00207','03658','02005','03880','02218','00887','00995','06198','09966','02506','01515','01672','01798','09996','02291','02068','01142','00338','01528','02356','02306','02411','00546','01729','00151','00579','09858','00815','06883','00975','01179','01372','03306','02431','03319','01448','00010','06676','00326','00398','02342','01199','02487','01115','02569','00694','00866','03650','01133','01082','02602','00656','00341','01866','01762','00363','01958','00336','01405','01883','00751','01086','00142','03709','02402','01995','02629','02565','89988','03393','09879','01159','00081','00799','00798','06826','03396','03788','06655','03380','03669','01873','03839','09989','02315','02378','00290','02589','03899','02038','00272','02869','03337','00169','02039','03969','09881','02121','01358','00591','06608','02386','02373','02880','01681','00258','02007','02149','02418','02582','00119','01382','00400','00659','02209','03613','01763','01458','03978','01815','02477','01333','00806','01920','00511','09668','01330','02877','01733','02245','00227','02126','02570','01263','02609','01747','01196','03681','00116','01277','01091','00934','02314','01310','03698','01858','00636','01939','01396','03677','00370','80941','00440','01921','02111','00182','02309','01117','00085','06100','01252','00004','01789','09639','03918','00023','00813','01945','00565','01168','02160','01571','00087','00554','03818','01769','01065','00884','06996','02100'];

closeArr = [];
highArr = [];
lowArr = [];
let dataObj = [];
let stkName = "";
status3UpCnt = 0
status3DnCnt = 0
status4UpCnt = 0
status4DnCnt = 0
status5UpCnt = 0
status5DnCnt = 0
status10UpCnt = 0
status10DnCnt = 0
upXMsg = ""

statusUpXCnt3 = 0
statusUpXCnt4 = 0
statusUpXCnt5 = 0
statusUpXCnt10 = 0
statusDnXCnt3 = 0
statusDnXCnt4 = 0
statusDnXCnt5 = 0
statusDnXCnt10 = 0

highpassCnt = 0
highFailCnt = 0
lowpassCnt = 0
lowFailCnt = 0
closepassCnt = 0
closeFailCnt = 0

function main() {
	(async () => {
		const trendstatus = document.getElementById("trendstatus");
		// Create table headers
		const headerRow = document.createElement("tr");
		const codeHeader = document.createElement("th");
		const nameHeader = document.createElement("th");
		const statusHLCHeader = document.createElement("th");
		const status3Header = document.createElement("th");
		const status4Header = document.createElement("th");
		const status5Header = document.createElement("th");
		const status10Header = document.createElement("th");

		// Add click handlers and styling to headers
		codeHeader.textContent = "编号";
		codeHeader.style.cursor = "pointer";
		codeHeader.onclick = () => sortTable(0);

		nameHeader.textContent = "股名";
		nameHeader.style.cursor = "pointer";
		nameHeader.onclick = () => sortTable(1);

		statusHLCHeader.textContent = "HLC";
		statusHLCHeader.style.cursor = "pointer";
		statusHLCHeader.onclick = () => sortTable(2);

		status3Header.textContent = "3日";
		status3Header.style.cursor = "pointer";
		status3Header.onclick = () => sortTable(3);

		status4Header.textContent = "4日";
		status4Header.style.cursor = "pointer";
		status4Header.onclick = () => sortTable(4);

		status5Header.textContent = "5日";
		status5Header.style.cursor = "pointer";
		status5Header.onclick = () => sortTable(5);

		status10Header.textContent = "10日";
		status10Header.style.cursor = "pointer";
		status10Header.onclick = () => sortTable(6);

		headerRow.appendChild(codeHeader);
		headerRow.appendChild(nameHeader);
		headerRow.appendChild(statusHLCHeader);
		headerRow.appendChild(status3Header);
		headerRow.appendChild(status4Header);
		headerRow.appendChild(status5Header);
		headerRow.appendChild(status10Header);

		trendstatus.appendChild(headerRow);

		for (let i = 0; i < codeTable.length; i++) {
			await fetchKline(codeTable[i]);
			const statusMsgHLC = compareHLC(codeTable[i]);
			const statusMsg3 = checkXStatus(3, 6);
			const statusMsg4 = checkXStatus(4, 10);
			const statusMsg5 = checkXStatus(5, 10);
			const statusMsg10 = checkXStatus(10, 20);
			if (statusMsg3.includes('升穿') ||
				statusMsg4.includes('升穿') ||
				statusMsg5.includes('升穿') ||
				statusMsg10.includes('升穿')) {

				upXMsg = upXMsg + "<gr><br>" + codeTable[i] + " " + stkName + "</gr> "

				if (statusMsg3.includes('升穿')) {
					upXMsg = upXMsg + "&emsp;" + statusMsg3
					statusUpXCnt3 = statusUpXCnt3 +1
				}
				if (statusMsg4.includes('升穿')) {
					upXMsg = upXMsg + "&emsp;" + statusMsg4
					statusUpXCnt4 = statusUpXCnt4 +1
				}
				if (statusMsg5.includes('升穿')) {
					upXMsg = upXMsg + "&emsp;" + statusMsg5
					statusUpXCnt5 = statusUpXCnt5 +1
				}
				if (statusMsg10.includes('升穿')) {
					upXMsg = upXMsg + "&emsp;" + statusMsg10
					statusUpXCnt10 = statusUpXCnt10 +1
				}
			}

				if (statusMsg3.includes('跌穿')) {
					statusDnXCnt3 = statusDnXCnt3 +1
				}
				if (statusMsg4.includes('跌穿')) {
					statusDnXCnt4 = statusDnXCnt4 +1
				}
				if (statusMsg5.includes('跌穿')) {
					statusDnXCnt5 = statusDnXCnt5 +1
				}
				if (statusMsg10.includes('跌穿')) {
					statusDnXCnt10 = statusDnXCnt10 +1
				}

			if (trendstatus) {
				const dataRow = document.createElement("tr");

				const codeCell = document.createElement("td");
				const nameCell = document.createElement("td");
				const statusHLCCell = document.createElement("td");
				const status3Cell = document.createElement("td");
				const status4Cell = document.createElement("td");
				const status5Cell = document.createElement("td");
				const status10Cell = document.createElement("td");

				codeCell.innerHTML = `<o onclick="xunbao('` + codeTable[i] + `')">` + codeTable[i] + "</o>"

				nameCell.textContent = stkName;
				statusHLCCell.innerHTML = statusMsgHLC;
				status3Cell.innerHTML = statusMsg3;
				status4Cell.innerHTML = statusMsg4;
				status5Cell.innerHTML = statusMsg5;
				status10Cell.innerHTML = statusMsg10;

				dataRow.appendChild(codeCell);
				dataRow.appendChild(nameCell);
				dataRow.appendChild(statusHLCCell);
				dataRow.appendChild(status3Cell);
				dataRow.appendChild(status4Cell);
				dataRow.appendChild(status5Cell);
				dataRow.appendChild(status10Cell);

				trendstatus.appendChild(dataRow);
			} else {
				console.error("Element with id 'trendstatus' not found.");
			}
		}
		showStat()
	})();
}

// Add this function at the end of the file
function sortTable(columnIndex) {
	const table = document.getElementById("trendstatus");
	const rows = Array.from(table.rows).slice(1); // Skip header row
	const header = table.rows[0];

	// Toggle sort direction
	const currentDir = header.cells[columnIndex].getAttribute('data-sort') === 'asc' ? 'desc' : 'asc';

	// Update sort direction indicator
	Array.from(header.cells).forEach(cell => cell.removeAttribute('data-sort'));
	header.cells[columnIndex].setAttribute('data-sort', currentDir);

	rows.sort((a, b) => {
		let aValue = a.cells[columnIndex].textContent.replace(/<[^>]*>/g, '');
		let bValue = b.cells[columnIndex].textContent.replace(/<[^>]*>/g, '');

		// Handle numeric sorting for code column
		if (columnIndex === 0) {
			return currentDir === 'asc' ?
				aValue.localeCompare(bValue) :
				bValue.localeCompare(aValue);
		}

		// Default string comparison for other columns
		return currentDir === 'asc' ?
			aValue.localeCompare(bValue) :
			bValue.localeCompare(aValue);
	});

	// Remove existing rows
	while (table.rows.length > 1) {
		table.deleteRow(1);
	}

	// Add sorted rows
	rows.forEach(row => table.appendChild(row));
}

function showStat() {
	statElement = document.createElement("div");
	statMsg = showDate() + " " + showTime() + "<br>" + "趋势统计表 总数：" + codeTable.length + "<br><br>"

	statMsg = statMsg + " <bpk>收</bpk>: 比3日趋势高：<r>" + closepassCnt + "</r>&emsp;"
	statMsg = statMsg + " <bpk>收</bpk>: 比3日趋势低：<gr>" + closeFailCnt + "</gr><br><br>"
	statMsg = statMsg + " 高: 比3日趋势高：<r>" + highpassCnt + "</r>&emsp; "
	statMsg = statMsg + " 高: 比3日趋势低：<gr>" + highFailCnt + "</gr><br><br>"
	statMsg = statMsg + " 低: 比3日趋势高：<r>" + lowpassCnt + "</r>&emsp;"
	statMsg = statMsg + " 低: 比3日趋势低：<gr>" + lowFailCnt + "</gr><br><br><br>"

	statMsg = statMsg + " 3日趋势升：<r>" + status3UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 3日趋势跌：<gr>" + status3DnCnt + "</gr>" + "<br><br>"

	statMsg = statMsg + " 4日趋势升：<r>" + status4UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 4日趋势跌：<gr>" + status4DnCnt + "</gr>" + "<br><br>"

	statMsg = statMsg + " 5日趋势升：<r>" + status5UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 5日趋势跌：<gr>" + status5DnCnt + "</gr>" + "<br><br>"

	statMsg = statMsg + " 10日趋势升：<r>" + status10UpCnt + "</r>&emsp; "
	statMsg = statMsg + " 10日趋势跌：<gr>" + status10DnCnt + "</gr>" + "<br><br><br>"

	statMsg = statMsg + " 3日升穿6日：<r>" + statusUpXCnt3 + "</r>&emsp; "
	statMsg = statMsg + " 3日跌穿6日：<gr>" + statusDnXCnt3 + "</gr>" + "<br><br>"

	statMsg = statMsg + " 4日升穿10日：<r>" + statusUpXCnt4 + "</r>&emsp; "
	statMsg = statMsg + " 4日跌穿10日：<gr>" + statusDnXCnt4 + "</gr>" + "<br><br>"

	statMsg = statMsg + " 5日升穿10日：<r>" + statusUpXCnt5 + "</r>&emsp; "
	statMsg = statMsg + " 5日跌穿10日：<gr>" + statusDnXCnt5 + "</gr>" + "<br><br>"

	statMsg = statMsg + " 10日升穿20日：<r>" + statusUpXCnt10 + "</r>&emsp; "
	statMsg = statMsg + " 10日跌穿20日：<gr>" + statusDnXCnt10 + "</gr>" + "<br><br><br>"

	statElement.innerHTML = statMsg

	const outputDiv = document.getElementById('output');
	outputDiv.parentNode.insertBefore(statElement, outputDiv);

	//document.body.appendChild(statElement);
	//document.body.insertBefore(newDiv, document.body.firstChild);
}




function openNewPage() {
	// Create a new window
	const newWindow = window.open('', '_blank');
	if (newWindow) {
		// Create the HTML content
		const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>升穿统计</title>
    <link rel="stylesheet" href="https://williamkpchan.github.io/maincss.css">
<style>
body {
  background-color: black  !important;
  color: gray;
  justify-content: center;
  align-content: center;
}
#trendstatus {font-size:16px;}
</style>

</head>
<body>
`;

		htmlContentTail = `
</body>
</html>
`;

		// Write the content to the new window
		newWindow.document.write(htmlContent + upXMsg + htmlContentTail);
		// Close the document for writing
		newWindow.document.close();
	}
}




async function fetchKline(theCode) {
	//console.log(theCode)
	return new Promise((resolve, reject) => {
		const theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,31,qfq';

		fetch(theurl)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.text();
			})

			.then(text => {
				const jsonStr = text.replace('kline_dayqfq=', '');
				const stkdata = JSON.parse(jsonStr);

				if (stkdata.code === 0) {
					const newDataObj = stkdata.data[`hk${theCode}`].qfqday || stkdata.data[`hk${theCode}`].day;

					stkName = stkdata.data[`hk${theCode}`].qt[`hk${theCode}`][1];

					closeArr = [];
					highArr = [];
					lowArr = [];

					for (let i = 0; i < newDataObj.length; i++) {
						closeArr.push(Number(newDataObj[i][2]));
						highArr.push(Number(newDataObj[i][3]));
						lowArr.push(Number(newDataObj[i][4]));
					}
					resolve();
				} else {
					console.log(`Request failed with error: ${stkdata.msg}`);
					reject(new Error(`Request failed with error: ${stkdata.msg}`));
				}
			})

			.catch(error => {
				console.log("ERROR!\n" + theCode + "\n" + stkName + "\n" + "newDataObj\n" + newDataObj + error);
				reject(error);
			});

	});
}

function checkX(prevL, prevS, curL, curS) {
	if (curS === curL) { return "<y>平</y>"; }
	if (((prevL === prevS) && (curS > curL)) || ((prevL > prevS) && (curS > curL))) {
		return '<r>升穿</r>';
	}
	if (((prevL === prevS) && (curS < curL)) || ((prevL < prevS) && (curS < curL))) {
		return '<bgr>跌穿</bgr>';
	}
	if ((prevL < prevS) && (curS > curL)) { return '<pk>继续升</pk>'; }
	if ((prevL > prevS) && (curS < curL)) { return '<lg>继续跌</lg>'; }
}

function calculateWeightedMovingAverage(data, period) {
	if (data.length < period) {
		throw new Error("Data array is shorter than the period.");
	}

	const weights = Array.from({ length: period }, (_, i) => i + 1);
	const weightSum = weights.reduce((a, b) => a + b, 0);

	const recentData = data.slice(data.length - period);

	const weightedSum = recentData.reduce((sum, value, index) => {
		return sum + value * weights[index];
	}, 0);

	return weightedSum / weightSum;
}

function checkXStatus(shortperiod, longperiod) {
	curPointer = highArr.length - 1

	const prevArray = closeArr.slice(0, curPointer - 1);

	const prevLWma = calculateWeightedMovingAverage(prevArray, longperiod);
	const prevSWma = calculateWeightedMovingAverage(prevArray, shortperiod);
	const curLWma = calculateWeightedMovingAverage(closeArr, longperiod);
	const curSWma = calculateWeightedMovingAverage(closeArr, shortperiod);

	let shortTrendMsg;
	if (curSWma > prevSWma) {
		shortTrendMsg = shortperiod + "<r>日趋势升</r>";
		if (shortperiod == 3) { status3UpCnt = status3UpCnt + 1 }
		if (shortperiod == 4) { status4UpCnt = status4UpCnt + 1 }
		if (shortperiod == 5) { status5UpCnt = status5UpCnt + 1 }
		if (shortperiod == 10) { status10UpCnt = status10UpCnt + 1 }
	} else if (curSWma === prevSWma) {
		shortTrendMsg = shortperiod + "<y>日趋势平</y>";
	} else {
		shortTrendMsg = shortperiod + "<gr>日趋势跌</gr>";
		if (shortperiod == 3) { status3DnCnt = status3DnCnt + 1 }
		if (shortperiod == 4) { status4DnCnt = status4DnCnt + 1 }
		if (shortperiod == 5) { status5DnCnt = status5DnCnt + 1 }
		if (shortperiod == 10) { status10DnCnt = status10DnCnt + 1 }
	}

	return (shortTrendMsg + ",<br>" + shortperiod + "日" + checkX(prevLWma, prevSWma, curLWma, curSWma) + longperiod + "日");
}

function compareHLC(stkNum) {
	curPointer = highArr.length - 1
	curHigh = highArr[curPointer];
	curLow = lowArr[curPointer];
	curClose = closeArr[curPointer];
	curWma3 = calculateWeightedMovingAverage(closeArr, 3); // calc 3 days
     // console.log("stkNum ", stkNum, " ",curPointer, " H ", curHigh, " L ", curLow, " C ", curClose)
	if (curHigh > curWma3) {
		highMsg = "<r>高:高过三日趋势</r>"
		highpassCnt = highpassCnt + 1
	} else if (curHigh < curWma3) {
		highMsg = "<gr>高:低过三日趋势</gr>"
		highFailCnt = highFailCnt + 1
	} else {
		highMsg = "<y>高:平三日趋势</y>"
	}

	if (curLow > curWma3) {
		lowMsg = "<r>低:高过三日趋势</r>"
		lowpassCnt = lowpassCnt + 1
	} else if (curLow < curWma3) {
		lowMsg = "<gr>低:低过三日趋势</gr>"
		lowFailCnt = lowFailCnt + 1
	} else {
		lowMsg = "<y>低:平三日趋势</y>"
	}

	if (curClose > curWma3) {
		closeMsg = "<r>收:高过三日趋势</r>"
		closepassCnt = closepassCnt + 1
	} else if (curClose < curWma3) {
		closeMsg = "<gr>收:低过三日趋势</gr>"
		closeFailCnt = closeFailCnt + 1
	} else {
		closeMsg = "<y>收:平三日趋势</y>"
	}

	return (closeMsg + ",<br>" + highMsg + ",<br>" + lowMsg);
}



function xunbao(xunbaocode) {
	sessionStorage.setItem("randomcode", xunbaocode)
	localStorage.setItem("randomcode", xunbaocode)
	window.open("../../Random Charts.html");
	// locs = ["HIghLowTrend.html", "Random Charts.html", ]
	//  window.open("HIghLowTrend.html")
}

main();
