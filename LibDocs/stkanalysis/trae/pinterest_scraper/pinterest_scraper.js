const puppeteer = require('puppeteer');
const fs = require('fs').promises;
//const open = require('open');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// 完全兼容的等待函数
function waitForTimeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPinterestImages(url, maxScrolls) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // 设置视口以加载更多内容
    await page.setViewport({ width: 1200, height: 800 });
    // 导航到Pinterest页面
    console.log(`正在访问: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    // 等待页面加载完成
    await page.waitForSelector('img', { timeout: 30000 });
    // 自动滚动并收集图片，限制最大滚动次数
    console.log(`开始滚动页面，最大滚动次数: ${maxScrolls}`);
    const imageUrls = await autoScrollAndCollectImages(page, maxScrolls);
    console.log(`共找到 ${imageUrls.length} 张图片`);
    // 创建HTML文件
    const htmlContent = generateHtml(imageUrls, url);

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

    const filePath = `pinterest_images_${yymmdd_hhmm}.html`;
    // 保存HTML文件
    await fs.writeFile(filePath, htmlContent);
    console.log(`已将结果保存到 ${filePath}`);


    // Open the HTML file in the default web browser

    const { exec } = require('child_process');
    // Specify the system command you want to execute
    const command = filePath;
    // Execute the system command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error executing command: ${stderr}`);
        return;
      }
      console.log(`Command output: ${stdout}`);
    });

    return imageUrls;
  } catch (error) {
    console.error('发生错误:', error);
    return [];
  } finally {
    await browser.close();
    readline.close();
  }
}

// 自动滚动并收集图片
async function autoScrollAndCollectImages(page, maxScrolls) {
  let allImages = new Set();
  let scrollCount = 0;
  
  while (scrollCount < maxScrolls) {
    // 提取当前可见的图片
    const currentImages = await extractImages(page);
    const previousCount = allImages.size;
    currentImages.forEach(img => allImages.add(img));
    const newImagesCount = allImages.size - previousCount;
    console.log(`第 ${scrollCount+1}/${maxScrolls} 次滚动: 新增 ${newImagesCount} 张图片`);

    //if(newImagesCount==0){scrollCount = maxScrolls}
    // 滚动到页面底部
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    // 等待页面加载新内容
    await waitForTimeout(2000);
    scrollCount++;
  }
  
  console.log(`已达到最大滚动次数(${maxScrolls})，停止滚动`);
  return Array.from(allImages);
}

// 提取页面图片的辅助函数
async function extractImages(page) {
  return await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    return Array.from(images)
      .map(img => img.src)
      .filter(src => src && src.includes('pinimg.com'));
  });
}

// 生成HTML文件
function generateHtml(imageUrls, originalUrl) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pinterest图片收集结果</title>
  <link href="https://williamkpchan.github.io/maincss.css" rel="stylesheet" type="text/css">
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Pinterest图片收集结果</h1>
    <strong>来源:</strong> <a href="${originalUrl}" target="_blank">${originalUrl}</a>
    <br>
    ${imageUrls.map(url => ` <img src="${url}"> `).join('\n')}
</body>
</html>`;
}

// 主函数
async function main() {
  try {
    const url = await new Promise(resolve => {
      readline.question('请输入Pinterest页面URL: ', resolve);
    });
    if (!url.trim()) {
      console.log('URL不能为空');
      return;
    }
    const maxScrollsInput = await new Promise(resolve => {
      readline.question('请输入最大滚动次数(建议10-50): ', resolve);
    });
    const maxScrolls = parseInt(maxScrollsInput, 10);
    if (isNaN(maxScrolls) || maxScrolls <= 0) {
      console.log('无效的滚动次数，使用默认值15');
      maxScrolls = 50;
    }
    await getPinterestImages(url, maxScrolls);
  } catch (error) {
    console.error('执行脚本时发生错误:', error);
  }
}

// 运行主函数
main();
