const puppeteer = require('puppeteer');
const fs = require('fs').promises;

// 完全兼容的等待函数
function waitForTimeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 从单个URL收集资源
async function getPinterestImages(url, maxScrolls) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log(`\n正在处理URL: ${url}`);
    console.log('--------------------------------');
    
    // 设置视口以加载更多内容
    await page.setViewport({ width: 1200, height: 800 });
    
    // 导航到Pinterest页面
    console.log(`正在访问: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // 等待初始内容加载完成
    console.log('等待初始图片、带srcset的图片和iframe加载...');
    await Promise.all([
      page.waitForSelector('img', { timeout: 30000 }),
      page.waitForSelector('img[srcset]', { timeout: 30000 }),
      page.waitForSelector('iframe', { timeout: 30000 })
    ].map(promise => promise.catch(() => null)));
    
    // 自动滚动并收集资源
    console.log(`开始滚动页面，最大滚动次数: ${maxScrolls}`);
    const resources = await autoScrollAndCollectResources(page, maxScrolls);
    
    console.log(`共找到 ${resources.images.length} 张图片 和 ${resources.iframes.length} 个iframe`);
    
    return {
      url,
      resources
    };
  } catch (error) {
    console.error(`处理URL ${url} 时发生错误:`, error);
    return {
      url,
      resources: { images: [], iframes: [] }
    };
  } finally {
    await browser.close();
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

// 生成HTML文件 - 合并所有URL的资源
function generateHtml(allResults) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pinterest多页面资源收集结果</title>
  <link href="https://williamkpchan.github.io/maincss.css" rel="stylesheet" type="text/css">
  <style>
  </style>
</head>
<body>
  <h1>Pinterest多页面资源收集结果</h1>
  <p>共处理 ${allResults.length} 个页面</p>
  
  ${allResults.map(result => `
   ${result.resources.images.map(url => ` <img src="${url}" alt="Pinterest图片"> `).join('\n')}
   ${result.resources.iframes.map(url => ` <iframe src="${url}" frameborder="0" allowfullscreen></iframe> `).join('\n')}
  `).join('\n')}
</body>
</html>`;
}

// 主函数
async function main() {
  try {
    // 读取URL文件
    const urlFileContent = await fs.readFile('inputurls.txt', 'utf8');
    const urls = urlFileContent
      .split('\n')
      .map(url => url.trim())
      .filter(url => url && !url.startsWith('#')); // 过滤空行和注释
    
    if (urls.length === 0) {
      console.log('未找到有效URL，请检查inputurls.txt文件');
      return;
    }
    
    console.log(`找到 ${urls.length} 个有效URL`);
    
    // 获取最大滚动次数
    const maxScrolls = process.argv[2] 
      ? parseInt(process.argv[2], 10) 
      : 50;
    
    if (isNaN(maxScrolls) || maxScrolls <= 0) {
      console.log('无效的滚动次数，使用默认值50');
      maxScrolls = 50;
    }
    
    console.log(`设置最大滚动次数为: ${maxScrolls}`);
    
    // 处理每个URL
    const allResults = [];

    urls.forEach(async (url, index) => {
      console.log(`${index} of ${urls.length}`);
      const result = await getPinterestImages(url, maxScrolls);
      allResults.push(result);
    });

    
    // 生成合并的HTML文件
    const htmlContent = generateHtml(allResults);
    const filePath = `pinterest_all_resources_${Date.now()}.html`;
    
    // 保存HTML文件
    await fs.writeFile(filePath, htmlContent);
    console.log(`\n所有结果已合并到 ${filePath}`);
    
  } catch (error) {
    console.error('执行脚本时发生错误:', error);
  }
}

// 运行主函数
main();