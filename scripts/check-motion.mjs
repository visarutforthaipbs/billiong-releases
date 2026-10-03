import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transform } from 'esbuild';
const source = fs.readFileSync(new URL('../src/scripts/motion.ts', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'ts', format: 'iife' });
function fixture({ reduced = false, supported = true } = {}) {
  function element(motion, order = '0') {
    const classes = new Set();
    return { dataset: { motion, motionOrder: order }, classList: { add: (...names) => names.forEach(n => classes.add(n)), remove: (...names) => names.forEach(n => classes.delete(n)), toggle: (n, enabled) => enabled ? classes.add(n) : classes.delete(n), contains: n => classes.has(n) }, style: { setProperty() {} } };
  }
  const reveal = element('reveal', '2'), pending = element('reveal'), hero = element('hero');
  const observers = [], media = { matches: reduced, addEventListener(_, callback) { this.change = callback; } };
  const document = { hidden: false, querySelectorAll: selector => selector.includes('reveal') ? [reveal, pending] : [hero], addEventListener(_, callback) { this.visibility = callback; } };
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
    intersect(target, visible) { this.callback([{ target, isIntersecting: visible }]); }
  }
  const window = { matchMedia: () => media, ...(supported ? { IntersectionObserver: Observer } : {}) };
  vm.runInNewContext(code, { window, document, IntersectionObserver: Observer });
  return { reveal, pending, hero, observers, media, document };
}
const normal = fixture();
assert.equal(normal.reveal.classList.contains('motion-enter'), false, 'Content stays visible before intersection');
normal.observers[0].intersect(normal.reveal, true);
assert.equal(normal.reveal.classList.contains('motion-enter'), true, 'Visible section starts entrance');
assert.equal(normal.observers[0].targets.has(normal.reveal), false, 'Entrance runs only once');
normal.observers[0].intersect(normal.hero, true);
assert.equal(normal.hero.classList.contains('motion-playing'), true, 'Visible hero runs');
normal.document.hidden = true; normal.document.visibility();
assert.equal(normal.hero.classList.contains('motion-playing'), false, 'Background page pauses');
normal.document.hidden = false; normal.document.visibility();
assert.equal(normal.hero.classList.contains('motion-playing'), true, 'Visible page resumes');
normal.observers[0].intersect(normal.hero, false);
assert.equal(normal.hero.classList.contains('motion-playing'), false, 'Offscreen hero pauses');
normal.media.matches = true; normal.media.change();
assert.equal(normal.hero.classList.contains('motion-enabled'), false, 'Live reduced-motion switch disables drift');
assert.equal(normal.reveal.classList.contains('motion-enter'), false, 'Live reduced-motion switch clears entrance');
assert.equal(normal.observers[0].targets.size, 0, 'Reduced-motion switch disconnects observer');
normal.media.matches = false; normal.media.change();
assert.equal(normal.observers[1].targets.has(normal.reveal), false, 'Already seen content does not replay');
assert.equal(normal.observers[1].targets.has(normal.pending), true, 'Unseen content can animate when preference permits');
for (const options of [{ reduced: true }, { supported: false }]) {
  const fallback = fixture(options);
  assert.equal(fallback.observers.length, 0, 'Fallback creates no motion observer');
  assert.equal(fallback.hero.classList.contains('motion-enabled'), false, 'Fallback keeps hero static');
  assert.equal(fallback.reveal.classList.contains('motion-enter'), false, 'Fallback keeps content visible');
}
console.log('PASS: section entrances, offscreen/background pause, live reduced-motion changes, and unsupported-observer fallback');
