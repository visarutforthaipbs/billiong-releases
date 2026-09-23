// Run after npm run build. These checks do not verify external download objects.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const index = read('dist/index.html');
const support = read('dist/support/index.html');
const demo = read('dist/demo-app.html');
for (const [name, html] of [['index', index], ['support', support]]) {
  for (const phrase of ['Mac Direct 2.0.3', 'ไม่รองรับใบกำกับภาษี', 'ไม่ใช้อัตรา 3% อัตโนมัติ', 'สำรองข้อมูลและเก็บ PDF เดิมก่อนอัปเดต', 'Windows ยังเป็น 2.0.1 Beta', 'การรับรองโดยนักบัญชี']) {
    assert.ok(html.includes(phrase), `${name}: missing disclosure ${phrase}`);
  }
  for (const phrase of ['Open Anyway', 'Run anyway', 'ได้เหมือนตอนติดตั้งจริงทุกอย่าง', 'คำนวณ VAT (7%)', 'ครบทุกฟีเจอร์', 'ซิงก์อัตโนมัติผ่าน', '/cover-social.png', '<iframe']) {
    assert.ok(!html.includes(phrase), `${name}: obsolete claim ${phrase}`);
  }
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(json, `${name}: JSON-LD missing`);
  const schema = JSON.parse(json[1]);
  assert.ok(schema.featureList.some(feature => feature.includes('พักประมาณการภาษี')));
  if (name === 'support') assert.ok(!schema.offers, 'Support must not advertise prices');
}
assert.ok(index.includes('BillNgai-2.0.3-universal.dmg'));
assert.ok(!index.includes('BillNgai-2.0.2-universal.dmg'));
assert.ok(index.includes('Windows 2.0.1 Beta'));
assert.ok(!support.includes('promptpay-599.svg'), 'Support must not include purchase QR');
assert.ok(demo.includes('พักเดโมรุ่นเก่า'));
assert.ok(!demo.includes('<script'), 'Retired demo must not execute old app');
assert.ok(!demo.includes('localStorage'), 'Retired demo must not mutate saved data');
console.log('PASS: built release pages, schema, downloads, disclosures, and retired demo');
