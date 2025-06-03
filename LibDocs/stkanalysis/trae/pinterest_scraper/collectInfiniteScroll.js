const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function extractAnchorsFromInfiniteScroll(url, targetClass, scrollTimeout = 2000, maxScrolls = 10) {
 const browser = await puppeteer.launch({ headless: 'new' });
 try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // 存储已收集的元素数量，用于检测内容是否加载
  let previousCount = 0;
  let scrolls = 0;
  
  // 循环滚动页面直到内容不再加载或达到最大滚动次数
  while (scrolls < maxScrolls) {
   // 滚动到页面底部
   await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
   });
   
   // 等待页面加载新内容
   await page.waitForTimeout(scrollTimeout);
   
   // 计算当前已加载的目标元素数量
   const currentCount = await page.$$eval(`a.${targetClass}`, elements => elements.length);
   
   // 如果没有新内容加载，则停止滚动
   if (currentCount === previousCount) {
    console.log('内容加载完成，停止滚动');
    break;
   }
   
   previousCount = currentCount;
   scrolls++;
   console.log(`已滚动 ${scrolls}/${maxScrolls}，当前元素数量: ${currentCount}`);
  }
  
  // 获取完整渲染后的 HTML
  const html = await page.content();
  const $ = cheerio.load(html);
  
  // 提取所有目标锚点元素
  const anchors = $(`a.${targetClass}`).map((index, element) => ({
   text: $(element).text().trim(),
   href: $(element).attr('href'),
   class: $(element).attr('class')
  })).get();
  
  return anchors;
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
  const url = 'https://example-infinite-scroll.com'; // 替换为实际无限滚动页面URL
  const targetClass = 'special-link';
  const maxScrolls = 15; // 最大滚动次数
  const scrollTimeout = 3000; // 每次滚动后等待时间（毫秒）
  
  const result = await extractAnchorsFromInfiniteScroll(url, targetClass, scrollTimeout, maxScrolls);
  console.log(`共提取 ${result.length} 个锚点元素`);
  console.log('示例结果:', result.slice(0, 3)); // 仅显示前3个结果
 } catch (error) {
  console.error('运行时错误:', error);
 }
})();

//1. **滚动机制**：使用 `window.scrollTo(0, document.body.scrollHeight)` 滚动到页面底部
//2. **内容检测**：通过比较每次滚动前后目标元素数量，判断是否有新内容加载
//3. **终止条件**：设置最大滚动次数和内容加载超时机制，避免无限循环
//4. **进度反馈**：控制台输出滚动进度和元素计数，便于调试
//5. **参数配置**：
//  - `scrollTimeout`：调整每次滚动后的等待时间（毫秒）
//  - `maxScrolls`：设置最大滚动次数上限
// 如需更复杂的加载检测，可改用 `page.waitForSelector()` 等待特定元素出现
// 此方案能有效处理大多数基于滚动的无限加载页面，确保捕获全部目标元素。
