// Renders social-thumbnail.html at exact 1200x630 and writes the output PNG/JPG.
// Run from project root: node line-oa-promos/render-social.cjs

const { chromium } = require('/Users/visarutsankham/.cursor/extensions/oderwat.indent-rainbow-8.3.1/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1200, height: 630 });

  const file = 'file://' + path.resolve(__dirname, 'social-thumbnail.html');
  await page.goto(file, { waitUntil: 'load' });

  await page.evaluate(async () => {
    await document.fonts.ready;
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(i =>
      i.complete ? null : new Promise(r => { i.onload = i.onerror = r; })
    ));
  });

  const out = path.resolve(__dirname, '../public/cover-social.png');
  await page.screenshot({ path: out, fullPage: false, animations: 'disabled' });
  console.log('Written:', out);

  await browser.close();
})();
