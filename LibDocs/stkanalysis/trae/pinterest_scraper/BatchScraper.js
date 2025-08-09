const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const { exec } = require('child_process');

// 完全兼容的等待函数
function waitForTimeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// 从单个URL收集资源
async function getResources(url, maxScrolls) {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	let retryCount = 0;
	const maxRetries = 2;
	let resources; // Declare resources here to be accessible by the fallback return

	try { // Added outer try block to associate with the finally block
		while (retryCount <= maxRetries) {
			try {
				console.log(`\n正在处理URL: ${url}`);
				console.log('--------------------------------');

				// 设置视口以加载更多内容
				await page.setViewport({ width: 1200, height: 800 });

				// 导航到页面
				console.log(`正在访问: ${url}`);
				await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

				// 等待初始内容加载完成
				console.log('等待初始图片、带srcset的图片和iframe加载...wait 60s');
				await Promise.all([
					page.waitForSelector('img', { timeout: 4000 }),
					page.waitForSelector('img[srcset]', { timeout: 4000 }),
					page.waitForSelector('iframe', { timeout: 4000 }),
					page.waitForSelector('a', { timeout: 4000 })
				].map(promise => promise.catch(() => null)));

				// 自动滚动并收集资源
				console.log(`\n开始滚动页面，最大滚动次数: ${maxScrolls}`);
				resources = await autoScrollAndCollectResources(page, maxScrolls);

				console.log(`共找到 ${resources.images.length} 张图片, ${resources.iframes.length} 个iframe, 和 ${resources.anchors.length} 个锚点`);

				return {
					url,
					resources
				};
			} catch (error) {
				retryCount++;
				if (retryCount > maxRetries) {
					console.error(`处理URL ${url} 时发生错误(重试${maxRetries}次后失败):`, error);
					return {
						url,
						resources: { 
							images: [], 
							iframes: [],
							anchors: []
						}
					};
				}
				console.log(`重试第${retryCount}次...`);
				await waitForTimeout(5000); // 等待5秒后重试
			}
		}
		// This block is reached if the while loop finishes without returning.
		// This might happen if maxRetries < 0, or if the loop condition is met without a return inside.
		console.warn(`URL ${url} - Exited retry loop without explicit success or failure return. Returning empty resources.`);
		return {
		    url,
		    resources: { images: [], iframes: [], anchors: [] }
		};
	} finally { // This finally block is now correctly associated with the outer try
		await browser.close();
		console.log("FInished, browser.close!");
	}
}

// 自动滚动并收集所有资源
async function autoScrollAndCollectResources(page, maxScrolls) {
	const resources = {
		images: new Set(),
		iframes: new Set(),
		anchors: new Set()
	};
	let scrollCount = 0;

	while (scrollCount < maxScrolls) {
		// 提取当前可见的资源
		const currentResources = await extractResources(page);

		// 更新资源集合
		const previousImageCount = resources.images.size;
		const previousIframeCount = resources.iframes.size;
		const previousAnchorCount = resources.anchors.size;

		currentResources.images.forEach(img => resources.images.add(img));
		currentResources.iframes.forEach(iframe => resources.iframes.add(iframe));

		// Create unique anchors using href+text as key
		currentResources.anchors.forEach(anchor => {
			const key = `${anchor.href}|${anchor.text}`;
			resources.anchors.add(JSON.stringify(anchor));
		});

		const newImagesCount = resources.images.size - previousImageCount;
		const newIframesCount = resources.iframes.size - previousIframeCount;
		const newAnchorsCount = resources.anchors.size - previousAnchorCount;

		console.log(`第 ${scrollCount + 1}/${maxScrolls} 次滚动: 新增 ${newImagesCount} 张图片, ${newAnchorsCount} 锚点, ${newIframesCount} 个iframe`);

		// Exit loop if no new resources found
		if (newImagesCount === 0 && newIframesCount === 0 && newAnchorsCount === 0) {
			console.log('没有发现新资源，停止滚动');
			break;
		}

		// 滚动到页面底部
		await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

		// 等待页面加载新内容
		await waitForTimeout(2000);

		scrollCount++;
	}

	console.log(`已达到最大滚动次数(${maxScrolls})，停止滚动\n`);
	return {
		images: Array.from(resources.images),
		iframes: Array.from(resources.iframes),
		anchors: Array.from(resources.anchors).map(str => JSON.parse(str))
	};
}

// 提取页面所有资源的辅助函数
async function extractResources(page) {
	return await page.evaluate(() => {
		// Extract unique images
		const images = [...new Set(Array.from(document.querySelectorAll('img'))
			.map(img => img.src)
			.filter(src => src))];

		// Extract unique srcset images
		const srcsetImages = [...new Set(Array.from(document.querySelectorAll('img[srcset]'))
			.flatMap(img => img.srcset.split(',')
				.map(item => item.trim().split(' ')[0])
				.filter(url => url)))];

		// Extract unique iframes
		const iframes = [...new Set(Array.from(document.querySelectorAll('iframe'))
			.map(iframe => iframe.src)
			.filter(src => src && src.trim() !== ''))];

		// Extract unique anchors
		const anchors = [...new Set(Array.from(document.querySelectorAll('a'))
			.map(a => ({
				href: a.href,
				text: a.textContent.trim()
			}))
			.filter(a => a.href))];

		return {
			images: [...new Set([...images, ...srcsetImages])],
			iframes,
			anchors
		};
	});
}

// 生成HTML文件 - 合并所有URL的资源
function generateHtml(allResults) {
	return `
<!DOCTYPE html>
<base target="_blank"><html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="https://williamkpchan.github.io/maincss.css">
<script src='https://williamkpchan.github.io/mainscript.js'></script>
<style>
body { 
  width:80%;
  margin-left:10%;
  background-color: black;
  color: gray;
  justify-content: center;
  align-content: center;
  font-size: 28px;
}
</style>
</head>
<body>
<pre>
  <h1>页面资源收集结果</h1>
  <p>共处理 ${allResults ? allResults.length : 0} 个页面</p>
  
  ${(allResults || []).map(result => `
        <h2><a href="${result.url}" target="_blank">${result.url}</a></h2>
        <h3>图片资源 (${(result.resources.images || []).length})</h3>
          ${(result.resources.images || []).map(url => ` <img src="${url}"> `).join('')}

        <h3>iframe资源 (${(result.resources.iframes || []).length})</h3>
        ${(result.resources.iframes || []).map(url => ` <iframe src="${url}" frameborder="0" allowfullscreen></iframe> `).join('')}

        <h3>锚点资源 (${(result.resources.anchors || []).length})</h3>
        ${(result.resources.anchors || []).map(anchor => ` 
          <a href="${anchor.href}">${anchor.text || anchor.href}</a> 
        `).join('')}
  `).join('')}
</body>
</html>`;
}

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

    const filePath = `nameHeader_${yymmdd_hhmm}.html`;
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
			console.log('无效的滚动次数，使用默认值20');
			maxScrolls = 20;
		}

		console.log(`设置最大滚动次数为: ${maxScrolls}`);

		// 处理每个URL
		const allResults = [];
		counter = 0
		for (const url of urls) {
			counter = counter + 1
			console.log(counter)
			const result = await getResources(url, maxScrolls);
			allResults.push(result);
		}


		// 生成合并的HTML文件
		const htmlContent = generateHtml(allResults);
		const filePath = generateFilename("batchScrap")

		// 保存HTML文件
		await fs.writeFile(filePath, htmlContent);
		console.log(`\n所有结果已合并到 ${filePath}`);
		await openFile(filePath);

	} catch (error) {
		console.error('执行脚本时发生错误:', error);
	}
}

// 运行主函数
main();
