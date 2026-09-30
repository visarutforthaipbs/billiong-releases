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
const PREVIOUS = ['2.0.4', '2.0.3', '2.0.2'];
const proPaused = /salesPaused:\s*true/.test(config);
for (const [name, html] of [['index', index], ['support', support]]) {
  for (const phrase of [`Mac Direct ${V}`, 'ไม่รองรับใบกำกับภาษี', 'ไม่ใช้อัตรา 3% อัตโนมัติ', 'สำรองข้อมูลและเก็บ PDF เดิมก่อนอัปเดต', 'Windows ยังเป็น 2.0.1 Beta รุ่นเก่า', 'การรับรองโดยนักบัญชี']) {
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
assert.ok(index.includes('Windows 2.0.1 Beta (รุ่นเก่า)'), 'Windows download is labelled as an older Beta');
assert.ok(index.includes('Windows 2.0.1 Beta'));
assert.ok(!support.includes('promptpay-599.svg'), 'Support must not include purchase QR');
assert.ok(demo.includes('พักเดโมรุ่นเก่า'));
assert.ok(demo.includes(V));
for (const old of PREVIOUS) assert.ok(!demo.includes(old));
assert.ok(!demo.includes('<script'), 'Retired demo must not execute old app');
assert.ok(!demo.includes('localStorage'), 'Retired demo must not mutate saved data');
console.log(`PASS: built ${V} release pages, schema, downloads, disclosures, Pro ${proPaused ? 'paused' : 'on sale'}, Windows label, retired demo`);
