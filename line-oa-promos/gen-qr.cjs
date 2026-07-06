// Generates a QR-code-LOOKING SVG (decorative, not scannable) for marketing visuals.
const fs = require('fs');
const N = 25, q = 2, cell = 10, size = (N + q * 2) * cell;
let s = 1337;
const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s >>> 16) / 32768; };
const g = Array.from({ length: N }, () => Array(N).fill(0));

function finder(r, c) {
  for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
    const border = (i === 0 || i === 6 || j === 0 || j === 6);
    const center = (i >= 2 && i <= 4 && j >= 2 && j <= 4);
    g[r + i][c + j] = (border || center) ? 1 : 0;
  }
}
finder(0, 0); finder(0, N - 7); finder(N - 7, 0);

// timing patterns
for (let i = 8; i < N - 8; i++) { g[6][i] = i % 2 === 0 ? 1 : 0; g[i][6] = i % 2 === 0 ? 1 : 0; }

const reserved = (r, c) => ((r < 9 && c < 9) || (r < 9 && c >= N - 8) || (r >= N - 8 && c < 9) || r === 6 || c === 6);
for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { if (!reserved(r, c)) g[r][c] = rnd() > 0.5 ? 1 : 0; }

// alignment pattern (bottom-right, version-2 style)
function align(r, c) {
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) {
    const border = (Math.abs(i) === 2 || Math.abs(j) === 2), center = (i === 0 && j === 0);
    g[r + i][c + j] = (border || center) ? 1 : 0;
  }
}
align(18, 18);

let rects = '';
for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
  if (g[r][c]) rects += `<rect x="${(c + q) * cell}" y="${(r + q) * cell}" width="${cell}" height="${cell}"/>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#ffffff"/><g fill="#1c1a17">${rects}</g></svg>`;
fs.writeFileSync('public/assets/brand/qr-sample.svg', svg);
console.log('wrote public/assets/brand/qr-sample.svg', svg.length, 'bytes');
