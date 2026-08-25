const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const VIDEO_DIR = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const audioFiles = fs.readdirSync(VIDEO_DIR).filter(f => f.toLowerCase().includes('voiceover') || f.toLowerCase().endsWith('.m4a') || f.toLowerCase().endsWith('.mp3') || f.toLowerCase().endsWith('.wav'));

console.log('Found Audio Files in Video Directory:', audioFiles);

if (audioFiles.length === 0) {
  console.error('No voiceover file found in', VIDEO_DIR);
  process.exit(1);
}

const sourceAudioPath = path.join(VIDEO_DIR, audioFiles[0]);
const targetAudioPath = path.join(PUBLIC_DIR, 'voiceover.mp3');

// Convert/Copy to public/voiceover.mp3
fs.copyFileSync(sourceAudioPath, targetAudioPath);
console.log(`Copied ${sourceAudioPath} -> ${targetAudioPath}`);

// Run FFmpeg silence detection to get exact timestamps & total duration
try {
  const output = execSync(`npx remotion ffmpeg -i "${targetAudioPath}" -af silencedetect=noise=-30dB:d=0.3 -f null -`, { encoding: 'utf8', stdio: 'pipe' });
  console.log('FFmpeg Output Snippet:\n', output.slice(-1000));
} catch (err) {
  const stderr = err.stderr || err.stdout || '';
  console.log('FFmpeg Output stderr:\n', stderr.slice(-1500));
}
