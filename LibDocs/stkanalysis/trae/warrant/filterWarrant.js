const fs = require('fs');
const cheerio = require('cheerio');

// Read the HTML file
const html = fs.readFileSync('warrant388.html', 'utf8');

// Load the HTML content using cheerio
const $ = cheerio.load(html);
console.log("$ ", $ )

// Extract data for each row
const tableData = [];
$('tr.table-row').each((index, element) => {

console.log("index ", index )
    const stkCode = $(element).find('td[data-field-key="sym"] div[data-export-split="1"]').text();
    const stkName = $(element).find('td[data-field-key="sym"] div[data-export-split="2"] a').text();
    const strikePrice = $(element).find('td[data-field-key="strike"]').text();
    const ldate = $(element).find('td[data-field-key="ldate"]').text();

console.log("stkCode ", stkCode, " ldate ", ldate )
    tableData.push({ stkCode, stkName, strikePrice, ldate });
});

// Create a table
const tableHtml = `<table border="1">
    <tr>
        <th>Stock Code</th>
        <th>Stock Name</th>
        <th>Strike Price</th>
        <th>Expiry Date</th>
    </tr>
    ${tableData.map(data => `
        <tr>
            <td>${data.stkCode}</td>
            <td>${data.stkName}</td>
            <td>${data.strikePrice}</td>
            <td>${data.ldate}</td>
        </tr>
    `).join('')}
</table>`;

console.log(tableHtml);
