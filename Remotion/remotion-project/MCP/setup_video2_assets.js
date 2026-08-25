const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'video1');
const TARGET_DIR = path.join(__dirname, '..', '..', 'videos', 'how_did_ancient_humans_become_asian', 'images');
const PUBLIC_VIDEO2_DIR = path.join(__dirname, '..', 'public', 'video2');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_VIDEO2_DIR)) {
  fs.mkdirSync(PUBLIC_VIDEO2_DIR, { recursive: true });
}

// Copy 22 scene images
for (let i = 1; i <= 22; i++) {
  const numStr = String(i).padStart(2, '0');
  const srcFile = path.join(SOURCE_DIR, `${i}_[STYLE.jpg`);
  const targetFile = path.join(TARGET_DIR, `${numStr}.jpg`);
  const publicFile = path.join(PUBLIC_VIDEO2_DIR, `${i}_[STYLE.jpg`);

  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, targetFile);
    fs.copyFileSync(srcFile, publicFile);
  }
}

console.log('Successfully prepared 22 scene image assets in Video #2 folder and public/video2/!');
