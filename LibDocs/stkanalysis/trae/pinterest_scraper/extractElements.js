const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function extractAnchorsByClass(url, targetClass) {
 const browser = await puppeteer.launch({ headless: 'new' }); // 启动无头浏览器
 try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' }); // 等待网络请求完成
  
  // 获取完整渲染后的 HTML
  const html = await page.content();
  
  // 使用 Cheerio 加载 HTML
  const $ = cheerio.load(html);
  
  // 提取所有带有目标类的锚点元素
  const anchors = $(`a.${targetClass}`).map((index, element) => {
   return {
    text: $(element).text().trim(),
    href: $(element).attr('href'),
    class: $(element).attr('class')
   };
  }).get();
  
  return anchors;
 } catch (error) {
  console.error('Error occurred:', error);
  throw error;
 } finally {
  await browser.close(); // 确保浏览器始终关闭
 }
}

// 使用示例
(async () => {
 try {
  const url = 'https://example.com'; // 替换为实际URL
  const targetClass = 'special-link'; // 替换为实际类名
  
  const result = await extractAnchorsByClass(url, targetClass);
  console.log('提取的锚点元素:', result);
 } catch (error) {
  console.error('运行时错误:', error);
 }
})();
//使用说明：
//1. 安装依赖：`npm install puppeteer cheerio`
//2. 修改代码中的 `url` 和 `targetClass` 变量
//3. 运行脚本：`node script.js`

// 使用 CSS 选择器 `a.special-link` 精确匹配目标元素

//如需提取其他类型的元素，只需修改选择器即可。
// 例如，提取带有特定类的 `&lt;div>` 元素可使用 `div.special-class`。

