const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const projectRoot = __dirname;
const sourceRoot = '/Users/visarutsankham/Downloads/BillNgai_Master_All_Assets';
const outputRoot = path.join(projectRoot, 'public', 'assets', 'brand');

const magick = ['/opt/homebrew/bin/magick', '/usr/local/bin/magick'].find((p) => fs.existsSync(p)) || 'magick';

function preflight() {
  if (!fs.existsSync(sourceRoot)) {
    console.error(`extract-assets: source not found: ${sourceRoot}`);
    process.exit(1);
  }
  try {
    execFileSync(magick, ['-version'], { stdio: 'ignore' });
  } catch (e) {
    console.error(`extract-assets: ImageMagick not runnable at "${magick}".`);
    process.exit(1);
  }
}

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function run(args) {
  execFileSync(magick, args, { stdio: 'inherit' });
}

function cropSheet({ src, category, set, cols, rows, names, crop, transparent = true, size = 512 }) {
  const outDir = path.join(outputRoot, category);
  ensureDir(outDir);
  const items = [];
  const stepW = crop.stepW || (crop.w / cols);
  const stepH = crop.stepH || (crop.h / rows);
  const itemW = crop.itemW || stepW;
  const defaultItemH = crop.itemH || stepH;
  const itemOffsetX = crop.itemOffsetX || 0;
  const itemOffsetY = crop.itemOffsetY || 0;

  names.forEach((name, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = Math.round(crop.x + col * stepW + itemOffsetX);
    const y = Math.round(crop.y + row * stepH + itemOffsetY);
    const w = Math.round(itemW);
    const h = Math.round((crop.itemHByRow && crop.itemHByRow[row]) || defaultItemH);
    const filename = `${set}-${String(index + 1).padStart(2, '0')}-${slug(name)}.png`;
    const dest = path.join(outDir, filename);
    const args = [
      src,
      '-crop', `${w}x${h}+${x}+${y}`,
      '+repage',
      '-fuzz', '8%',
      '-trim',
      '+repage',
      '-background', 'none',
    ];

    if (transparent) {
      args.push('-transparent', '#fffaf4', '-transparent', '#fff9f3', '-transparent', 'white');
    }

    if (crop.pad) {
      args.push('-bordercolor', 'none', '-border', String(crop.pad));
    }

    args.push('-resize', `${size}x${size}>`, '-define', 'png:color-type=6', dest);
    run(args);
    items.push({
      name,
      category,
      set,
      path: path.relative(projectRoot, dest),
    });
  });

  return items;
}

const iconSets = [
  {
    set: 'set-1',
    src: 'BillNgai_Asset_Library_Batch_01/03_UI_Icons_Set_1.png',
    names: ['Dashboard', 'Invoice', 'Client', 'Send', 'Paid', 'Draft', 'Reminder', 'Download', 'Edit', 'Delete', 'Wallet', 'Payment', 'Tax', 'Report', 'Settings', 'Search', 'Filter', 'Upload', 'Calendar', 'Notification'],
  },
  {
    set: 'set-2',
    src: 'BillNgai_Asset_Library_Batch_01/04_UI_Icons_Set_2.png',
    names: ['Home', 'List', 'Grid', 'Plus', 'Check', 'Close', 'Arrow Right', 'Arrow Left', 'Arrow Up', 'Arrow Down', 'Attachment', 'Email', 'Phone', 'Message', 'File', 'Folder', 'User', 'Team', 'Clock', 'Help'],
  },
  {
    set: 'set-3',
    src: 'BillNgai_Asset_Library_Batch_02/13_UI_Icons_Set_3.png',
    names: ['Analytics', 'Bookmark', 'Star', 'Heart', 'Share', 'Copy', 'Duplicate', 'Archive', 'Pin', 'Tag', 'Link', 'Eye', 'Eye Off', 'Lock', 'Unlock', 'Shield', 'Info', 'Logout', 'Refresh', 'Sync'],
  },
  {
    set: 'set-4',
    src: 'BillNgai_Asset_Library_Batch_02/14_UI_Icons_Set_4.png',
    names: ['Globe', 'Language', 'Location', 'Map Pin', 'Camera', 'Image', 'Video', 'Microphone', 'Print', 'QR Scan', 'Receipt', 'History', 'Sort', 'More', 'Expand', 'Collapse', 'Dark Mode', 'Light Mode', 'Security', 'Verified'],
  },
];

const objectSets = [
  {
    set: 'set-1',
    src: 'BillNgai_Asset_Library_Batch_01/01_Doodle_Objects_Set_1.png',
    names: ['Laptop', 'Smartphone', 'Tablet', 'Desktop Monitor', 'Keyboard', 'Mouse', 'Trackpad', 'Camera', 'Headphones', 'Coffee Mug', 'Takeaway Coffee Cup', 'Potted Plant', 'Desk Lamp', 'Notebook', 'Pencil', 'Pen', 'Ruler', 'Scissors', 'Tape Roll', 'Paper Clip', 'Stapler', 'Push Pin', 'Envelope', 'Folder', 'Backpack'],
  },
];

const characterSets = [
  {
    set: 'set-1',
    src: 'BillNgai_Asset_Library_Batch_01/05_Character_Poses_Set_1.png',
    names: ['Freelancer on Laptop', 'Freelancer Holding Invoice', 'Designer Sketching', 'Developer Coding', 'Photographer with Camera', 'Cafe Owner with Tablet', 'Consultant on Phone', 'Client Reviewing Bill', 'Small Business Owner at Desk', 'Creator Giving Thumbs Up'],
  },
];

preflight();
cleanDir(outputRoot);

console.log("Starting asset slicing...");

for (const config of iconSets) {
  cropSheet({
    ...config,
    src: path.join(sourceRoot, config.src),
    category: 'icons',
    cols: 5,
    rows: 4,
    crop: { x: 44, y: 202, stepW: 1358 / 5, stepH: 782 / 4, itemW: 1358 / 5, itemH: 145 },
    size: 256,
  });
}

for (const config of objectSets) {
  cropSheet({
    ...config,
    src: path.join(sourceRoot, config.src),
    category: 'objects',
    cols: 5,
    rows: 5,
    crop: { x: 37, y: 200, stepW: 1374 / 5, stepH: 819 / 5, itemW: 1374 / 5, itemH: 112, itemHByRow: [138, 112, 112, 112, 112], pad: 14 },
    size: 512,
  });
}

for (const config of characterSets) {
  cropSheet({
    ...config,
    src: path.join(sourceRoot, config.src),
    category: 'characters',
    cols: 5,
    rows: 2,
    crop: { x: 37, y: 217, stepW: 1376 / 5, stepH: 707 / 2, itemW: 1376 / 5, itemH: 285 },
    size: 768,
  });
}

console.log("Asset slicing complete!");
