// anchors and text from an url,
// nodejs ask for url from user and collect related address
// save the results in an html file


const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
async function scrapeWebsite(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  
    // 提取所有链接
    const links = await page.$$eval('a', anchors => {
      return anchors.map(anchor => ({
        text: anchor.textContent.trim(),
        href: anchor.href
      }));
    });
  
    // 提取页面主要文本内容
    const mainText = await page.evaluate(() => {
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
      return Array.from(elements)
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0)
        .join('\n\n');
    });
  
    await browser.close();
    return { links, mainText };
  } catch (error) {
    console.error('Error scraping website:', error);
    await browser.close();
    throw error;
  }
}
function createHtmlReport(url, data) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>网页内容提取结果 - ${url}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .section { margin-bottom: 30px; padding: 15px; border-radius: 5px; background-color: #f8f9fa; }
    .links-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .links-table th, .links-table td { padding: 8px; border: 1px solid #ddd; text-align: left; }
    .links-table th { background-color: #e9ecef; }
    .main-text { white-space: pre-wrap; line-height: 1.6; }
  </style>
</head>
<body>
  <h1>网页内容提取结果</h1>
  <div class="section">
    <h2>源URL</h2>
    <p><a href="${url}" target="_blank">${url}</a></p>
  </div>
  <div class="section">
    <h2>提取的链接 (${data.links.length})</h2>
    <table class="links-table">
      <thead>
        <tr>
          <th>文本</th>
          <th>链接地址</th>
        </tr>
      </thead>
      <tbody>
        ${data.links.map(link => `
          <tr>
            <td>${escapeHtml(link.text)}</td>
            <td><a href="${link.href}" target="_blank">${escapeHtml(link.href)}</a></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  <div class="section">
    <h2>提取的文本内容</h2>
    <div class="main-text">${escapeHtml(data.mainText)}</div>
  </div>
</body>
</html>`;
}
// HTML 转义函数，防止 XSS
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
async function main() {
  try {
    const url = await new Promise(resolve => {
      readline.question('请输入要抓取的URL: ', resolve);
    });
  
    // 简单的URL验证
    if (!url.startsWith('http')) {
      console.error('请输入有效的URL（需包含 http 或 https 协议）');
      readline.close();
      return;
    }
  
    console.log(`正在抓取 ${url}...`);
    const result = await scrapeWebsite(url);
  
    const fs = require('fs').promises;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `scrape-result-${timestamp}.html`;
  
    await fs.writeFile(filename, createHtmlReport(url, result));
    console.log(`结果已保存到 ${filename}`);
  } catch (error) {
    console.error('程序执行出错:', error);
  } finally {
    readline.close();
  }
}
main();
