const fs = require('fs');
const path = require('path');

const publicVideo2 = path.join(__dirname, '..', 'public', 'video2');
const projectImages = path.join(__dirname, '..', '..', 'videos', 'how_did_ancient_humans_become_asian', 'images');

[publicVideo2, projectImages].forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      fs.unlinkSync(path.join(dir, f));
    });
    console.log(`Cleaned all files in ${dir}`);
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Old images completely wiped. Ready for 22 FRESH Video #2 image generations!');
