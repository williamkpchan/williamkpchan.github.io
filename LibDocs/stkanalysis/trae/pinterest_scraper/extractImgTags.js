const fs = require('fs').promises;
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function extractImgTags() {
  try {
    const fileName = await new Promise(resolve => {
      readline.question('请输入要处理的文件名: ', resolve);
    });
    readline.close();

    const filePath = path.resolve(process.cwd(), fileName);
    const content = await fs.readFile(filePath, 'utf8');

    // 使用正则表达式匹配所有 <img.../> 标签
    const imgRegex = /<img[^>]*\/>/g;
    const imgTags = content.match(imgRegex) || [];

    console.log(`共找到 ${imgTags.length} 个 <img> 标签`);
    
    if (imgTags.length > 0) {
      console.log("\n匹配结果:");
      imgTags.forEach((tag, index) => {
        console.log(`[${index + 1}] ${tag}`);
      });
    }

    // 保存匹配结果到文件
    const outputPath = path.join(path.dirname(filePath), 'img_tags.txt');
    await fs.writeFile(outputPath, imgTags.join('\n'), 'utf8');
    console.log(`\n匹配结果已保存到: ${outputPath}`);

  } catch (error) {
    console.error('处理文件时出错:', error.message);
  }
}

extractImgTags();
