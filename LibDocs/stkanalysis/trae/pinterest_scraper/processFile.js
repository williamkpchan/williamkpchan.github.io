//// read in a file, and then filter all lines, by chopping the pattern "<img.*/", then from the remaining parts find all duplicates with line indexes, then set unique and remove all duplicates from the original file, save the file
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function processFile() {
  try {
    const fileName = await new Promise(resolve => {
      readline.question('请输入要处理的文件名: ', resolve);
    });
    readline.close();

    const filePath = path.resolve(process.cwd(), fileName);
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');

    console.log(`\n读取文件: ${fileName}`);
    console.log(`总行数: ${lines.length}`);

    // 处理每行并移除<img.../>标签
    const processedLines = lines.map((line, index) => {
      const cleanedLine = line.replace(/<img[^>]*\//, '');
      // 可选：去除首尾空白字符
      const trimmedLine = cleanedLine.trim();
      return trimmedLine;
    });

    // 调试输出：显示处理后的前10行
    console.log("\n前40行处理结果:");
    processedLines.slice(0, 40).forEach((line, index) => {
      console.log(`行 ${index + 1}: "${line}"`);
    });

    // 统计每行出现的次数
    const lineCounts = new Map();
    processedLines.forEach((line, index) => {
      if (!lineCounts.has(line)) {
        lineCounts.set(line, { count: 0, indexes: [] });
      }
      const entry = lineCounts.get(line);
      entry.count++;
      entry.indexes.push(index);
    });

    // 找出所有重复行
    const duplicateLines = Array.from(lineCounts.entries())
      .filter(([line, { count }]) => count > 1 && line.trim() !== '');

    console.log(`\n检测到 ${duplicateLines.length} 组重复行`);
    
    // 详细输出重复行信息
    if (duplicateLines.length > 0) {
      console.log("\n重复行详情:");
      duplicateLines.forEach(([line, { indexes }]) => {
        console.log(`内容: "${line}"`);
        console.log(`行号: ${indexes.map(i => i + 1).join(', ')}`);
        console.log(`出现次数: ${indexes.length}`);
        console.log('---');
      });
    }

    // 收集需要删除的行索引
    const duplicateIndexes = new Set();
    duplicateLines.forEach(([_, { indexes }]) => {
      // 保留第一个，删除其余重复行
      for (let i = 1; i < indexes.length; i++) {
        duplicateIndexes.add(indexes[i]);
      }
    });

    // 生成新内容
    const newLines = lines.filter((_, index) => !duplicateIndexes.has(index));
    const newContent = newLines.join('\n');

    // 保存文件
    await fs.writeFile(filePath, newContent, 'utf8');
    console.log(`\n处理完成! 共删除 ${duplicateIndexes.size} 行`);

  } catch (error) {
    console.error('处理文件时出错:', error.message);
  }
}

processFile();
