// Node.js Cheerio HTML Parsing and Saving

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;

const url = 'https://sputniknews.cn/'; // Replace with your target URL
const targetClass = 'cell'; // Replace with the class you want to extract

async function fetchPage(url) {
 // Launch Puppeteer browser
 const browser = await puppeteer.launch({
  headless: 'new' // Use the new Headless mode
 });
 const page = await browser.newPage();

 // Configure Puppeteer to mimic a regular browser
 await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
 await page.setViewport({ width: 1366, height: 768 });

 try {
  console.log(`Fetching ${url}...`);
  await page.goto(url, {
   waitUntil: 'domcontentloaded', // Wait for page to fully load
   timeout: 30000 // 30 seconds timeout
  });
  
  // Get the page content
  const html = await page.content();
  return html;
 } catch (error) {
  console.error('Error fetching page:', error);
  return null;
 } finally {
  await browser.close();
 }
}


async function processHtml(html, targetClass) {
 if (!html) {
  throw new Error('No HTML content provided');
 }

 const $ = cheerio.load(html);
 
 // Find all elements with the target class (not just divs)
 const targetElements = $(`.${targetClass}`);
 
 if (targetElements.length === 0) {
  throw new Error(`No elements with class "${targetClass}" found`);
 }
 
 // Create a container for all extracted elements
 let extractedContent = '';
 
 // Process each matching element
 targetElements.each((index, element) => {
  const tagName = element.tagName.toLowerCase();
  const elementHtml = $(element).html();
  
  // Preserve the original element type and attributes
  extractedContent += `
  <div class="extracted-element" data-original-tag="${tagName}">
   <${tagName} class="${targetClass}">
    ${elementHtml}
   </${tagName}>
  </div>
  `;
 });
 
 // Create a new HTML structure with all extracted content
 const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Extracted Content</title>
 <style>
  body {
   font-family: Arial, sans-serif;
   line-height: 1.6;
   max-width: 1200px;
   margin: 0 auto;
   padding: 20px;
  }
 </style>
</head>
<body>
 <h1>Extracted Content from ${targetClass} class</h1>
 <div class="extracted-content">
  ${extractedContent}
 </div>
</body>
</html>`;
 
 return newHtml;
}
async function main() {
 try {
  // Step 1: Fetch the page with Puppeteer
  const html = await fetchPage(url);
  
  if (!html) {
   console.log('Failed to fetch page');
   return;
  }
  
  // Step 2: Process the HTML to extract specific content
  const extractedHtml = await processHtml(html, targetClass);
  
  // Step 3: Save the extracted content
  await fs.writeFile('extracted-content.html', extractedHtml);
  console.log('Successfully saved extracted content to extracted-content.html');
 } catch (error) {
  console.error('Error:', error.message);
 }
}

// Run the main function
main();
