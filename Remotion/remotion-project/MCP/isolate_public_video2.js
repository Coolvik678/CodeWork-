const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const backupDir = path.join(__dirname, '..', 'public_backup');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const video1Dir = path.join(publicDir, 'video1');
const backupVideo1Dir = path.join(backupDir, 'video1');

if (fs.existsSync(video1Dir)) {
  if (fs.existsSync(backupVideo1Dir)) {
    fs.rmSync(backupVideo1Dir, { recursive: true, force: true });
  }
  fs.renameSync(video1Dir, backupVideo1Dir);
  console.log('Moved public/video1 -> public_backup/video1!');
}

console.log('Public directory isolated successfully for Video #2!');
