const puppeteer = require('puppeteer');
const fs = require('fs');

async function loginToTumblr(page, username, password) {
  console.log('Navigating to login page...');
  await page.goto('https://www.tumblr.com/login', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Wait for login form to appear
  await page.waitForSelector('button[type="submit"]', { timeout: 10000 });

  // Fill in credentials
  await page.type('input[name="email"]', username);
  await page.type('input[name="password"]', password);

  // Click login button
  await page.click('button[type="submit"]');

  // Wait for login to complete (check for dashboard element)
  try {
    await page.waitForSelector('[data-testid="dashboard"]', { timeout: 15000 });
    console.log('Login successful!');
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

async function scrapeTumblr(url, credentials = null) {
  const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: false, // Set to true after testing
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Login if credentials provided
    if (credentials) {
      const loginSuccess = await loginToTumblr(page, credentials.username, credentials.password);
      if (!loginSuccess) {
        throw new Error('Login failed, cannot proceed with scraping');
      }
      await page.waitForTimeout(2000); // Short pause after login
    }

    console.log(`Navigating to ${url}...`);
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Handle possible consent banners
    try {
      await page.waitForSelector('button[aria-label="Consent"]', { timeout: 5000 });
      await page.click('button[aria-label="Consent"]');
      console.log('Dismissed consent banner');
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('No consent banner found');
    }

    // Scroll to load content
    console.log('Scrolling to load content...');
    await autoScroll(page);

    // Extract media with more robust selectors
    const media = await page.evaluate(() => {
      const items = [];
      
      // Get images from various Tumblr selectors
      const imageSelectors = [
        'img[src*="media.tumblr.com"]',
        'img[src*="assets.tumblr.com"]',
        'figure img',
        '.post-content img'
      ];
      
      imageSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(img => {
          if (img.src && !img.src.startsWith('data:')) {
            items.push({
              type: 'image',
              url: img.src,
              alt: img.alt || ''
            });
          }
        });
      });
      
      // Get videos
      document.querySelectorAll('video source, .tmblr-full iframe').forEach(el => {
        const src = el.src || el.getAttribute('data-src');
        if (src) {
          items.push({
            type: el.tagName.toLowerCase() === 'iframe' ? 'embedded' : 'video',
            url: src,
            poster: el.closest('video')?.poster || ''
          });
        }
      });
      
      return items;
    });

    // Process results
    const uniqueMedia = [...new Map(media.map(item => [item.url, item])).values()]
      .filter(item => item.url) // Remove empty URLs
      .map(item => {
        // Get higher resolution images when possible
        if (item.type === 'image' && item.url.includes('media.tumblr.com')) {
          item.originalUrl = item.url
            .replace(/_\d+\.(jpg|png|gif)$/, '_1280.$1')
            .replace(/(\/s)\d+(\w+\.\w+)$/, '$1640$2') // For new Tumblr URL format
            .replace(/\/s\d+x\d+\//, '/');
        }
        return item;
      });

    console.log(`Found ${uniqueMedia.length} media items`);
    
    // Save results
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `tumblr-media-${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(uniqueMedia, null, 2));
    console.log(`Results saved to ${filename}`);
    
    return uniqueMedia;
  } catch (error) {
    console.error('Error during scraping:', error);
    // Take screenshot for debugging
    await page.screenshot({ path: 'error.png' });
    console.log('Screenshot saved to error.png');
  } finally {
    await browser.close();
  }
}

// Auto-scroll helper
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const maxScrolls = 20;
      let scrollCount = 0;
      
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        scrollCount++;
        
        if (totalHeight >= scrollHeight || scrollCount >= maxScrolls) {
          clearInterval(timer);
          resolve();
        }
      }, 1000);
    });
  });
}

// Usage with credentials
const credentials = {
  username: 'williamkpchan@gmail.com',
  password: 'Kpc580214Tumblr'
};

const tumblrUrl = 'https://sassydw.tumblr.com/archive';

// Run with or without credentials
scrapeTumblr(tumblrUrl, credentials).then(media => {
  console.log('Scraping completed!');
}).catch(err => {
  console.error('Scraping failed:', err);
});
