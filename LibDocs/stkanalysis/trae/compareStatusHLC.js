//const codeTable = ['00001', '00002', '00003', '00005', '00006', '00011', '00012', '00016', '00017', '00027', '00066', '00101', '00175', '00241', '00267', '00285', '00288', '00291', '00316', '00322', '00386', '00388', '00669', '00688', '00700', '00762', '00823', '00836', '00857', '00868', '00881', '00883', '00939', '00941', '00960', '00968', '00981', '00992', '01038', '01044', '01088', '01093', '01099', '01109', '01113', '01177', '01209', '01211', '01299', '01378', '01398', '01876', '01928', '01929', '01997', '02020', '02269', '02313', '02318', '02319', '02331', '02359', '02382', '02388', '02628', '02688', '02899', '03692', '03968', '03988', '06690', '06862', '09618', '09633', '09961', '09988', '09999', '02800', '01951', '01385',];
// 老千 '00302','02233','00357',
const codeTable = ['00388','02208','01951','01448','01171','02800','00700','09988','00005','00883','02828','00857','00939','02318','01299','03968','00941','01398','00522','09618','00386','01211','02899','03988','09999','01088','00016','01288','02269','09961','01816','02382','00992','01919','01109','00981','00836','00001','09633','01093','02601','01910','00027','00669','06690','02020','00011','02388','00916','01928','00020','00175','02628','00291','01833','01378','00728','02359','09626','00002','02331','06862','01113','00780','00006','01801','00762','09901','02688','03993','01548','02618','09992','00288','06160','02319','01766','00285','01972','01800','00003','00960','06030','01658','00966','01138','02057','00688','06881','01336','03908','02313','01898','00968','02333','03692','03328','01347','01038','03888','09987','01339','01177','02018','02328','01099','02883','00135','01193','01876','06865','02338','01209','03800','00316','01818','00358','02600','01071','01913','00241','00019','01997','03067','02380','00868','03998','02202','00322','02588','00819','00998','00384','00763','01787','02099','00101','00425','00914','03898','00570','01797','00390','00257','00267','00012','00066','06186','00270','00881','03320','02400','00136','02013','03618','01066','01908','01030','00683','06823','01798','03323','01208','03759','01952','06088','01918','01772','00467','01186','03969','01302','00921','01357','06110','09969','01929','02666','00772','06078','00696','03311','00293','00371','03900','00956','02162','02607','00991','06855','02238','00083','01776','02386','06818','00220','00576','06060','01157','00017','03808','01044','02357','00142','03347','01359','06098','01415','00354','01179','00014','03110','02196','01128','00189','03032','00123','01896','02343','00934','00867','01368','00995','00177','00552','01883','00639','00151','09922','00489','00152','00148','00586','01381','01530','00853','01882','00813','03360','00799','00598','02096','00667','09698','01610','01618','02888','01821','03738','06066','02186','06699','00880','02128','00884','01072','06886','00874','01070','01516','00551','06049','02669','02257','01513','09995','02255','00694','01681','01999','01508','00631','01478','01385','00777','01055','00525','01199','02039','01060','03613','00004','00579','00338','00817','02869','02638','00856','00548','01963','06869','00081','00363','00590','00303','01958','00200','03377','00317','03709','01579','01316','00656','01119','01811','00341','06099','00909','02689','03319','00087','03958','00297','01907','02145','02276','01888','01313','00861','01310','00038','06185','09959','02777','00345','00010','03899','01666','02005','09966','00460','02877','00023','00440','06808','00179','00855','00596','02866','02285','00347','06666','01995','01877','02362','06127','01428','01691','02158','01515','02155','03983','01600','00165','02801','00710','09911','00708','00670','02611','02252','00308','00823','01613','02009','02823','02822','07226','07299','02840','01858','01860','07200','07288','03037','00412','00751','02727','02356','02342','06178','03188','00778','00636','07568','07522','07552','00182','07500','03606','06969','00268','00144','00564','03668','00300','06181','01698','02556','01164','00788','02577','09896','01810', '02015', '03690', '06618', '09888', '01024','09926','03033','09868',];

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
        const status31Header = document.createElement("th");

        codeHeader.textContent = "Code";
        nameHeader.textContent = "Stock Name";
        statusHLCHeader.textContent = "Status HLC";
        status3Header.textContent = "Status 3";

        headerRow.appendChild(codeHeader);
        headerRow.appendChild(nameHeader);
        headerRow.appendChild(statusHLCHeader);
        headerRow.appendChild(status3Header);

        trendstatus.appendChild(headerRow);

        for (let i = 0; i < codeTable.length; i++) {
            await fetchKline(codeTable[i]);
            const statusMsgHLC = compareHLC();
            const statusMsg3 = checkXStatus(3, 6);
            if(statusMsg3.includes('升穿')){

               upXMsg = upXMsg + "<gr><br>"+codeTable[i] + " "+stkName +"</gr> "

               if(statusMsg3.includes('升穿')){
                upXMsg = upXMsg + "&emsp;"+statusMsg3
               }
            }

            if (trendstatus) {
              const dataRow = document.createElement("tr");

              const codeCell = document.createElement("td");
              const nameCell = document.createElement("td");
              const statusHLCCell = document.createElement("td");
              const status3Cell = document.createElement("td");

              codeCell.innerHTML = `<o onclick="xunbao('` + codeTable[i] + `')">`+ codeTable[i] + "</o>"

              nameCell.textContent = stkName;
              statusHLCCell.innerHTML = statusMsgHLC;
              status3Cell.innerHTML = statusMsg3;

              dataRow.appendChild(codeCell);
              dataRow.appendChild(nameCell);
              dataRow.appendChild(statusHLCCell);
              dataRow.appendChild(status3Cell);

              trendstatus.appendChild(dataRow);
            } else {
              console.error("Element with id 'trendstatus' not found.");
            }
        }
        showStat()
    })();
}

function showStat(){
    h4content = document.createElement("h4");
    statMsg = showDate() +" "+ showTime() + "<br>" + "<pk>短线</pk>趋势统计表 总数："+ codeTable.length +  "<br><br>"

    statMsg = statMsg + " <r>高: 比3日趋势高：" +highpassCnt + "</r> "
    statMsg = statMsg + " <gr>高: 比3日趋势低：" +highFailCnt + "</gr><br><br>"
    statMsg = statMsg + " <r>低: 比3日趋势高：" +lowpassCnt + "</r>"
    statMsg = statMsg + " <gr>低: 比3日趋势低：" +lowFailCnt + "</gr><br><br>"
    statMsg = statMsg + " <r>收: 比3日趋势高：" +closepassCnt + "</r>"
    statMsg = statMsg + " <gr>收: 比3日趋势低：" +closeFailCnt + "</gr><br><br>"

    statMsg = statMsg + " <r>3日趋势升：" +status3UpCnt + "</r> "
    statMsg = statMsg + " <gr>3日趋势跌：" +status3DnCnt + "</gr>" + "<br><br>"


    h4content.innerHTML = statMsg
    document.body.appendChild(h4content);
}





async function fetchKline(theCode) {
//console.log(theCode)
    return new Promise((resolve, reject) => {
        const theurl = 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?_var=kline_dayqfq&param=hk' + theCode + ',day,,,10,qfq';

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
          console.log("ERROR!\n"+ theCode+ "\n"+ stkName +"\n" + "newDataObj\n"+ newDataObj+error);
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
    if ((prevL > prevS) && (curS < curL)) { return '<lg>继续跌</lg>';}
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
    curPointer = highArr.length -1

    const prevArray = closeArr.slice(0, curPointer - 1);

    const prevLWma = calculateWeightedMovingAverage(prevArray, longperiod);
    const prevSWma = calculateWeightedMovingAverage(prevArray, shortperiod);
    const curLWma = calculateWeightedMovingAverage(closeArr, longperiod);
    const curSWma = calculateWeightedMovingAverage(closeArr, shortperiod);

    let shortTrendMsg;
    if (curSWma > prevSWma) {
        shortTrendMsg = shortperiod + "<r>日趋势升</r>";
        if(shortperiod == 3){status3UpCnt = status3UpCnt +1}
    } else if (curSWma === prevSWma) {
        shortTrendMsg = shortperiod + "<y>日趋势平</y>";
    } else {
        shortTrendMsg = shortperiod + "<gr>日趋势跌</gr>";
        if(shortperiod == 3){status3DnCnt = status3DnCnt +1}
    }

    return (shortTrendMsg + ",<br>" + shortperiod + "日线" + checkX(prevLWma, prevSWma, curLWma, curSWma) + longperiod + "日线");
}

function compareHLC() {
    curPointer = highArr.length -1
    curHigh = highArr[curPointer];
    curLow = lowArr[curPointer];
    curClose = closeArr[curPointer];
    curWma3 = calculateWeightedMovingAverage(closeArr, 3); // calc 3 days
    if(curHigh > curWma3){
      highMsg = "<r>高:高过三日趋势</r>"
      highpassCnt = highpassCnt +1
    }else if(curHigh < curWma3){
      highMsg = "<gr>高:低过三日趋势</gr>"
      highFailCnt = highFailCnt +1
    }else{
      highMsg = "<y>高:平三日趋势</y>"
    }

    if(curLow > curWma3){
      lowMsg = "<r>低:高过三日趋势</r>"
      lowpassCnt = lowpassCnt +1
    }else if(curLow < curWma3){
      lowMsg = "<gr>低:低过三日趋势</gr>"
      lowFailCnt = lowFailCnt +1
    }else{
      lowMsg = "<y>低:平三日趋势</y>"
    }

    if(curClose > curWma3){
      closeMsg = "<r>收:高过三日趋势</r>"
      closepassCnt = closepassCnt +1
    }else if(curClose < curWma3){
      closeMsg = "<gr>收:低过三日趋势</gr>"
      closeFailCnt = closeFailCnt +1
    }else{
      closeMsg = "<y>收:平三日趋势</y>"
    }

    return (highMsg + ",<br>" + lowMsg + ",<br>" + closeMsg);
}

function xunbao(xunbaocode) {
       localStorage.setItem("randomcode", xunbaocode)
       window.open("../../Random Charts.html");
       // locs = ["HIghLowTrend.html", "Random Charts.html", ]
       //  window.open("HIghLowTrend.html")
}

main();
