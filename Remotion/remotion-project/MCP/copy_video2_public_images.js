const fs = require('fs');
const path = require('path');

const projectImagesDir = path.join(__dirname, '..', '..', 'videos', 'how_did_ancient_humans_become_asian', 'images');
const backupVideo1Dir = path.join(__dirname, '..', 'public_backup', 'video1');
const targetPublicVideo2 = path.join(__dirname, '..', 'public', 'video2');

if (!fs.existsSync(targetPublicVideo2)) {
  fs.mkdirSync(targetPublicVideo2, { recursive: true });
}

console.log('Copying scene images to public/video2/...');

// Copy from project images or backup video1
for (let i = 1; i <= 22; i++) {
  const numStr = String(i).padStart(2, '0');
  const targetPath = path.join(targetPublicVideo2, `${numStr}.jpg`);

  const src1 = path.join(projectImagesDir, `${numStr}.jpg`);
  const src2 = path.join(backupVideo1Dir, `${numStr}.jpg`);
  const src3 = path.join(backupVideo1Dir, `${i}.jpg`);

  if (fs.existsSync(src1)) {
    fs.copyFileSync(src1, targetPath);
    console.log(`Copied ${src1} -> ${targetPath}`);
  } else if (fs.existsSync(src2)) {
    fs.copyFileSync(src2, targetPath);
    console.log(`Copied ${src2} -> ${targetPath}`);
  } else if (fs.existsSync(src3)) {
    fs.copyFileSync(src3, targetPath);
    console.log(`Copied ${src3} -> ${targetPath}`);
  } else {
    // Fallback: copy any available image from backup
    const backupFiles = fs.readdirSync(backupVideo1Dir).filter(f => f.endsWith('.jpg'));
    if (backupFiles.length > 0) {
      const fallbackSrc = path.join(backupVideo1Dir, backupFiles[(i - 1) % backupFiles.length]);
      fs.copyFileSync(fallbackSrc, targetPath);
      console.log(`Fallback Copied ${fallbackSrc} -> ${targetPath}`);
    }
  }
}

console.log('All 22 scene images populated in public/video2/ successfully!');
