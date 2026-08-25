const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function cleanFolder(folderName) {
  const targetDir = path.join(publicDir, folderName);
  if (!fs.existsSync(targetDir)) return;

  const files = fs.readdirSync(targetDir);
  files.forEach(file => {
    if (file.includes('[') || file.includes(']')) {
      const cleanName = file.split('_')[0] + '.jpg';
      const oldPath = path.join(targetDir, file);
      const newPath = path.join(targetDir, cleanName);
      console.log(`Renaming: ${file} -> ${cleanName}`);
      fs.renameSync(oldPath, newPath);
    }
  });
}

cleanFolder('video1');
cleanFolder('video2');

console.log('Public folder asset filenames cleaned successfully!');
