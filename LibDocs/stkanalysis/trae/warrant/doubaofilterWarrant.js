// doubao
const fs = require('fs');
const readline = require('readline');
const cheerio = require('cheerio');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for input file path
rl.question('Enter HTML file path (default: input.html): ', (filePath) => {
  filePath = filePath.trim() || 'input.html';

  // Prompt for minimum strike price
  rl.question('Enter minimum strike price (default: 0): ', (minStrikeStr) => {
    const minStrike = parseFloat(minStrikeStr) || 0;
    rl.close();

    // Read and process file
    fs.readFile(filePath, 'utf8', (err, html) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
      }

      const $ = cheerio.load(html);
      const tableData = [];

      // Parse table rows WITH efgear (amplifier)
      $('tr.table-row').each((index, element) => {
        const $row = $(element);
        const $symElement = $row.find('td[data-field-key="sym"]');

        // Extract new field: efgear (amplifier)
        const efgear = $row.find('td[data-field-key="efgear"]').text().trim();

        const stkName = $symElement.find('div[data-export-split="1"]').text().trim();
        const stkCode = $symElement.find('a.bmpLnk.cls').text().replace('.HK', '').trim();
        const strikePrice = parseFloat($row.find('td[data-field-key="strike"]').text().trim());
        const ldate = $row.find('td[data-field-key="ldate"]').text().trim();

        // Filter step: Only include rows with strikePrice >= minStrike
        if (strikePrice >= minStrike) {
          tableData.push({ 
            stkCode, 
            stkName, 
            strikePrice, 
            ldate, 
            amplifier: efgear // Renamed to "amplifier"
          });
        }
      });

      // Sort by strikePrice
      tableData.sort((a, b) => a.strikePrice - b.strikePrice);

      // Generate HTML table body WITH amplifier column
      const htmlTableBody = tableData.map(row => `
        <tr>
          <td>${row.stkCode}</td>
          <td>${row.stkName}</td>
          <td>${row.strikePrice.toFixed(3)}</td>
          <td>${row.ldate}</td>
          <td>${row.amplifier}</td> <!-- New column -->
        </tr>
      `).join('');

      // Read warrantheader.html
      fs.readFile('warrantheader.html', 'utf8', (err, headerHtml) => {
        if (err) {
          console.error(`Error reading header file: ${err.message}`);
          return;
        }

        // Concatenate header and table body (WITH new column in header)
        const combinedHtml = headerHtml + `
          <div class="filtered-count">Showing ${tableData.length} records with strike price ≥ ${minStrike}</div>
          <table>
            <tr>
              <th>Stock Code</th>
              <th>Stock Name</th>
              <th>Strike Price</th>
              <th>Expiry Date</th>
              <th>實際槓桿</th> <!-- New header -->
            </tr>
            ${htmlTableBody}
          </table>
        `;

        // Save to output.html
        fs.writeFile('output.html', combinedHtml, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing file: ${err.message}`);
          } else {
            console.log(`Filtered results saved to output.html (${tableData.length} records)`);
          }
        });
      });
    });
  });
});
