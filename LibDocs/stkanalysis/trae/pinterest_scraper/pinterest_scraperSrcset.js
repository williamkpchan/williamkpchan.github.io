const puppeteer = require('puppeteer');
const fs = require('fs').promises;
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
    
    // 等待初始内容加载完成 - 等待三种类型的资源
    console.log('等待初始图片、带srcset的图片和iframe加载...');
    await Promise.all([
      page.waitForSelector('img', { timeout: 30000 }),
      page.waitForSelector('img[srcset]', { timeout: 30000 }),
      page.waitForSelector('iframe', { timeout: 30000 })
    ].map(promise => promise.catch(() => null))); // 忽略超时错误
    
    // 自动滚动并收集图片，限制最大滚动次数
    console.log(`开始滚动页面，最大滚动次数: ${maxScrolls}`);
    const resources = await autoScrollAndCollectResources(page, maxScrolls);
    
    console.log(`共找到 ${resources.images.length} 张图片 和 ${resources.iframes.length} 个iframe`);
    
    // 创建HTML文件
    const htmlContent = generateHtml(resources, url);
    const filePath = `pinterest_resources_${Date.now()}.html`;
    
    // 保存HTML文件
    await fs.writeFile(filePath, htmlContent);
    console.log(`已将结果保存到 ${filePath}`);
    
    return resources;
  } catch (error) {
    console.error('发生错误:', error);
    return { images: [], iframes: [] };
  } finally {
    await browser.close();
    readline.close();
  }
}

// 自动滚动并收集所有资源
async function autoScrollAndCollectResources(page, maxScrolls) {
  const resources = { images: new Set(), iframes: new Set() };
  let scrollCount = 0;
  
  while (scrollCount < maxScrolls) {
    // 提取当前可见的资源
    const currentResources = await extractResources(page);
    
    // 更新资源集合
    const previousImageCount = resources.images.size;
    const previousIframeCount = resources.iframes.size;
    
    currentResources.images.forEach(img => resources.images.add(img));
    currentResources.iframes.forEach(iframe => resources.iframes.add(iframe));
    
    const newImagesCount = resources.images.size - previousImageCount;
    const newIframesCount = resources.iframes.size - previousIframeCount;
    
    console.log(`第 ${scrollCount+1}/${maxScrolls} 次滚动: 新增 ${newImagesCount} 张图片, ${newIframesCount} 个iframe`);
    
    // 滚动到页面底部
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    
    // 等待页面加载新内容
    await waitForTimeout(2000);
    
    scrollCount++;
  }
  
  console.log(`已达到最大滚动次数(${maxScrolls})，停止滚动`);
  return {
    images: Array.from(resources.images),
    iframes: Array.from(resources.iframes)
  };
}

// 提取页面所有资源的辅助函数
async function extractResources(page) {
  return await page.evaluate(() => {
    // 提取普通图片
    const images = Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && src.includes('pinimg.com'));
    
    // 提取带srcset的图片
    const srcsetImages = Array.from(document.querySelectorAll('img[srcset]'))
      .flatMap(img => {
        // 解析srcset属性获取所有图片URL
        return img.srcset.split(',')
          .map(item => item.trim().split(' ')[0])
          .filter(url => url && url.includes('pinimg.com'));
      });
    
    // 提取iframe
    const iframes = Array.from(document.querySelectorAll('iframe'))
      .map(iframe => iframe.src)
      .filter(src => src && src.trim() !== '');
    
    return {
      images: [...new Set([...images, ...srcsetImages])],
      iframes
    };
  });
}

// 生成HTML文件 - 更新为显示所有资源
function generateHtml(resources, originalUrl) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pinterest资源收集结果</title>
  <link rel="stylesheet" href="https://williamkpchan.github.io/maincss.css">
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Pinterest资源收集结果</h1>
    <strong>来源:</strong> <a href="${originalUrl}" target="_blank">${originalUrl}</a>
  
    <h2>图片资源 (${resources.images.length})</h2>
      ${resources.images.map(url => `<img src="${url}">`).join('\n')}

    <h2>iframe资源 (${resources.iframes.length})</h2>
    ${resources.iframes.map(url => `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`).join('\n')}
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
      maxScrolls = 15;
    }
    
    await getPinterestImages(url, maxScrolls);
  } catch (error) {
    console.error('执行脚本时发生错误:', error);
  }
}

// 运行主函数
main();
