const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'flow_dump.html');
if (!fs.existsSync(htmlPath)) {
  console.error('flow_dump.html not found');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Search for any http/https image URLs
const regex = /https?:\/\/[^\s"'\>]+(?:googleusercontent|lh\d|photos|blob|storage|media|fx|pinhole)[^\s"'\>]*/gi;
const matches = html.match(regex) || [];
const uniqueUrls = Array.from(new Set(matches.map(u => u.replace(/\\/g, ''))));

console.log(`Found ${uniqueUrls.length} unique image/media URLs in HTML dump:`);
console.log(JSON.stringify(uniqueUrls, null, 2));
