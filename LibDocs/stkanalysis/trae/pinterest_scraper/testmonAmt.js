
const baseurl = "https://sqt.gtimg.cn/?q=hk09988";


// Function to fetch data chunks
async function fetchDataChunks(url) {
console.log("url ",url)
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.text();
        const rows = data.split(";").filter(row => row.trim() !== '');
        rows.forEach(row => {
console.log(row)
            const columns = row.split("~");
console.log(columns)


            const stockCode = columns[2];
            if (!stockCode) {
                console.log("Missing stock code");
                return;
            }

            const stknum = stockCode.replace("s_hk", "");
            const currentAmt = parseFloat(columns[37]);
            const todaypct = parseFloat(columns[42]);
            const currentPrice = parseFloat(columns[5]);

            console.log("stockCode:", stockCode, "currentPrice:", currentPrice, 
                       "currentAmt:", currentAmt, "todayPct:", todaypct);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


fetchDataChunks(baseurl)
