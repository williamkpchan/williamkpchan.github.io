const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const { exec } = require('child_process');

const url = 'https://sputniknews.cn/'; // 替换为实际URL
const targetClass = '.container'; // 替换为实际类名


function generateFilename(nameHeader) {
    const timestamp = Date.now();
    // Convert the timestamp to a Date object
    const date = new Date(timestamp);

    // Extract the year, month, and day components
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    // Combine the components to form YYMMDD format
    const yymmdd_hhmm = `${year}${month}${day}_${hours}${minutes}`;
    //const yymmdd = `${year}${month}${day}`;

    const filePath = `${nameHeader}_${yymmdd_hhmm}.html`;
    return filePath
}


function openFile(filePath) {
  return new Promise((resolve, reject) => {
    let command;
    if (process.platform === 'win32') {
      command = `start "" "${filePath}"`;
    } else if (process.platform === 'darwin') {
      command = `open "${filePath}"`;
    } else {
      command = `xdg-open "${filePath}"`;
    }
    exec(command, (error) => {
      if (error) {
        console.error(`无法自动打开文件: ${error.message}`);
        console.log(`请手动打开文件: ${filePath}`);
        reject(error);
      } else {
        console.log(`已在浏览器中打开结果文件: ${filePath}`);
        resolve();
      }
    });
  });
}


async function extractElementsByClass(url, targetClass) {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // Get all elements with the target class and their HTML
    const elements = $(targetClass).map((index, element) => {
      return {
        html: $(element).html(),
        text: $(element).text().trim(),
        class: $(element).attr('class'),
        tag: element.tagName
      };
    }).get();
    
    return elements;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  } finally {
    await browser.close();
  }
}



// 使用示例
(async () => {
  try {
    const elements = await extractElementsByClass(url, targetClass);

    // Convert the elements data to HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Extracted Elements</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: #f5f5f5;
    }

  </style>
</head>
<body>
  <h1>Extracted Elements from ${url}</h1>
  <p>Target class: "${targetClass}"</p>
  <p>Total elements found: ${elements.length}</p>
  
  <div class="elements-list">
    ${elements.map((element, index) => `
      <div class="element-container">
        <div class="element-info">
          <span class="tag">Element #${index + 1} (${element.tag})</span>
          ${element.class ? `<span class="classes"> Classes: ${element.class}</span>` : ''}
        </div>
        <div class="element-html">
          ${element.html || 'No inner HTML'}
        </div>
        ${element.text ? `<div class="element-text">Text content: "${element.text}"</div>` : ''}
      </div>
    `).join('')}
  </div>
</body>
</html>
`;

    const filePath = generateFilename("extracted_elements");
    await fs.writeFile(filePath, htmlContent);
    console.log(`\n所有结果已保存到 ${filePath}`);
    await openFile(filePath);

  } catch (error) {
    console.error('运行时错误:', error);
  }
})();