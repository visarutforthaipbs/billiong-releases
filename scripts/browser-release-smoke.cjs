const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '../dist');
const out = path.resolve(__dirname, '../test-artifacts');
fs.mkdirSync(out, { recursive: true });
const server = http.createServer((req, res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) return res.writeHead(404).end();
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(origin, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(out, `landing-${width}.png`), fullPage: true });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'horizontal overflow');
      await page.locator('#hero a[href="#download"]').click();
      const download = page.locator('#download-dialog');
      assert.ok(await download.isVisible());
      assert.ok((await download.innerText()).includes('สำรองข้อมูลและเก็บ PDF เดิมก่อนอัปเดต'));
      assert.ok((await page.locator('#download-confirm-btn').getAttribute('href')).endsWith('BillNgai-2.0.3-universal.dmg'));
      await page.screenshot({ path: path.join(out, `download-${width}.png`) });
      await page.locator('#close-dialog-btn').click();
      await page.locator('a[href="#pro-order"]').first().click();
      assert.ok((await page.locator('#pro-dialog').innerText()).includes('Pro ไม่ปลดล็อกฟีเจอร์ที่พักให้บริการ'));
      await page.screenshot({ path: path.join(out, `pro-${width}.png`) });
      await page.goto(origin + '/support', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('img[src*="promptpay"]').count(), 0);
      assert.ok((await page.locator('body').innerText()).includes('Mac Direct 2.0.3'));
      await page.screenshot({ path: path.join(out, `support-${width}.png`), fullPage: true });
      await page.goto(origin + '/demo-app.html');
      assert.equal(await page.locator('script').count(), 0);
      assert.equal(errors.length, 0, errors.join('\n'));
      await page.close();
    }
    console.log('PASS: desktop/mobile page, download and purchase disclosures, support, retired demo; no JS errors');
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
