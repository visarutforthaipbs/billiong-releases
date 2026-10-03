// Run after npm run build. These checks do not verify external download objects.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const index = read('dist/index.html');
const support = read('dist/support/index.html');
const demo = read('dist/demo-app.html');
// The current Mac version comes from the product config, so the checks follow each release.
const config = read('src/config/product.ts');
const V = config.match(/mac:\s*\{\s*version:\s*"([^"]+)"/)[1];
const W = config.match(/windows:\s*\{\s*version:\s*"([^"]+)"/)[1];
const PREVIOUS = ['2.0.11', '2.0.10', '2.0.4', '2.0.3', '2.0.2'];
const proPaused = /salesPaused:\s*true/.test(config);
for (const [name, html] of [['index', index], ['support', support]]) {
  for (const phrase of [`Mac Direct ${V}`, 'ไม่รองรับใบกำกับภาษี', 'ไม่ใช้อัตรา 3% อัตโนมัติ', 'สำรองข้อมูลและเก็บ PDF เดิมก่อนอัปเดต', `Windows ${W} Beta (64 บิต)`, 'การรับรองโดยนักบัญชี']) {
    assert.ok(html.includes(phrase), `${name}: missing disclosure ${phrase}`);
  }
  for (const phrase of ['เปิดอ่านเอกสารเก่าได้ โดยไม่ต้องยกเลิก', 'ทบทวนใบแจ้งหนี้เก่าค้างรับได้เฉพาะกรณีที่รองรับ', 'การเก็บเข้าคลังแยกจากการยกเลิกพร้อมเหตุผล', 'ไม่ลงวันที่ย้อนหลังและไม่แก้ต้นฉบับ', 'ฐานข้อมูล JSON และชุดไฟล์หลักฐานแยกกัน', 'JSON ไม่มีไฟล์แนบอยู่ข้างใน', 'ไม่ใช่การรับรองความถูกต้องของหลักฐาน']) {
    assert.ok(html.includes(phrase), `${name}: missing historical-recovery/backup disclosure ${phrase}`);
  }
  for (const phrase of [...PREVIOUS, 'ใบแจ้งหนี้เก่าเป็นชำระแล้ว', 'Open Anyway', 'Run anyway', 'ได้เหมือนตอนติดตั้งจริงทุกอย่าง', 'คำนวณ VAT (7%)', 'ครบทุกฟีเจอร์', 'ซิงก์อัตโนมัติผ่าน', '/cover-social.png', '<iframe']) {
    assert.ok(!html.includes(phrase), `${name}: obsolete claim ${phrase}`);
  }
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(json, `${name}: JSON-LD missing`);
  const schema = JSON.parse(json[1]);
  assert.ok(schema.featureList.some(feature => feature.includes('พักประมาณการภาษี')));
  if (name === 'support') assert.ok(!schema.offers, 'Support must not advertise prices');
  if (name === 'index' && proPaused) assert.ok(!schema.offers.some(o => /Pro/.test(o.name)), 'Paused Pro must not be offered in JSON-LD');
}
assert.ok(index.includes(`BillNgai-${V}-universal.dmg`));
assert.ok(index.includes(`releases/download/v${V}/BillNgai-${V}-universal.dmg`));
assert.ok(index.includes(`r2.dev/BillNgai-${V}-universal.dmg`));
for (const old of PREVIOUS) assert.ok(!index.includes(`BillNgai-${old}-universal.dmg`), `stale download ${old}`);
if (proPaused) {
  for (const sale of ['promptpay-599.svg', '#pro-order', 'ซื้อ Pro Early Bird', 'ส่งสลิป', 'Early Bird']) assert.ok(!index.includes(sale), `Paused Pro still sold: ${sale}`);
  assert.ok(index.includes('Pro พักการขายชั่วคราว'));
}
assert.ok(index.includes(`Windows ${W} Beta (64 บิต)`), 'Current Windows Beta is clearly labelled');
assert.ok(index.includes(`BillNgai-${W}-x64-Setup.exe`), 'Current Windows installer linked');
if (!proPaused) {
  for (const sale of ['#pro-order', 'promptpay-599.svg', 'ซิงก์ Google Drive', 'สูงสุด 3 บัญชี Google ต่อรหัส']) assert.ok(index.includes(sale), `Pro offer incomplete: ${sale}`);
  for (const stale of ['พักการขาย', 'พักซิงก์', 'ซิงก์และกู้คืนคลาวด์']) assert.ok(!index.includes(stale) && !support.includes(stale), `stale sync/Pro copy: ${stale}`);
}
const privacy = read('dist/privacy.html');
assert.ok(privacy.includes('Cloudflare') && privacy.includes('drive.file'), 'privacy policy describes the sync service');
assert.ok(index.includes('/privacy.html'), 'privacy policy is linked');
assert.ok(index.includes(`Windows ${W} Beta`));
assert.ok(!support.includes('promptpay-599.svg'), 'Support must not include purchase QR');
assert.ok(demo.includes('พักเดโมรุ่นเก่า'));
assert.ok(demo.includes(V));
for (const old of PREVIOUS) assert.ok(!demo.includes(old));
assert.ok(!demo.includes('<script'), 'Retired demo must not execute old app');
assert.ok(!demo.includes('localStorage'), 'Retired demo must not mutate saved data');
for (const oldArt of ['/assets/brand/characters/', '/assets/brand/objects/', '/assets/brand/icons/']) assert.ok(!index.includes(oldArt), `Legacy artwork remains: ${oldArt}`);
assert.ok(index.includes('/assets/brand/clay/'), 'Clay artwork present');
const downloadDialog = index.match(/<dialog[^>]*id="download-dialog"[^>]*>[\s\S]*?<\/dialog>/)?.[0];
assert.ok(downloadDialog, 'Download dialog present');
const disclosurePosition = downloadDialog.indexOf('<details');
assert.ok(disclosurePosition > downloadDialog.indexOf('id="download-confirm-btn"'), 'Mac download precedes detailed notes');
assert.ok(disclosurePosition > downloadDialog.indexOf('id="download-confirm-btn-win"'), 'Windows download precedes detailed notes');
assert.ok(!/<details[^>]*\bopen(?:\s|=|>)/.test(downloadDialog), 'Detailed notes start collapsed');
assert.ok(downloadDialog.includes('logo-b-clay.webp'), 'Clay identity artwork in download dialog');
const featureArt = [...read('src/components/Features.astro').matchAll(/iconUrl: "([^"]+)"/g)].map(match => match[1]);
assert.equal(featureArt.length, 9, 'Nine feature illustrations present');
assert.equal(new Set(featureArt).size, 9, 'Each feature has a distinct illustration');
for (const file of [...featureArt, '/assets/brand/clay/promo-hero.webp', '/assets/brand/clay/promo-data-ownership.webp']) {
  assert.ok(index.includes(file), `Promo artwork rendered: ${file}`);
  assert.ok(fs.existsSync(path.join(root, 'dist', file)), `Promo artwork bundled: ${file}`);
}
assert.ok(!index.includes('ออฟไลน์ได้ 100%') && !index.includes('ทำงานออฟไลน์ 100%'), 'Offline claims qualified');
assert.ok(!demo.includes('พักประมาณการภาษี ซิงก์คลาวด์'), 'Retired demo describes current sync availability');
console.log(`PASS: built ${V} release pages, schema, downloads, disclosures, Pro ${proPaused ? 'paused' : 'on sale'}, Windows label, retired demo`);
