const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const path = require('path');

const VIDEO_SLUG = 'how_did_ancient_humans_become_asian';
const OUTPUT_LOCATION = path.join(__dirname, '..', '..', 'videos', VIDEO_SLUG, `${VIDEO_SLUG}.mp4`);
const ENTRY_POINT = path.join(__dirname, '..', 'src', 'index.ts');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function main() {
  console.log('Bundling Remotion project for Video #2...');
  
  const bundleLocation = await bundle({
    entryPoint: ENTRY_POINT,
    publicDir: PUBLIC_DIR,
  });

  console.log('Bundle created successfully at:', bundleLocation);

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'StickmanVideo2',
  });

  console.log(`Starting render for composition "${composition.id}"...`);
  console.log(`Total duration: ${composition.durationInFrames} frames (${(composition.durationInFrames / 30).toFixed(1)}s)`);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: OUTPUT_LOCATION,
    onProgress: ({ progress }) => {
      process.stdout.write(`Rendering Video #2 Progress: ${(progress * 100).toFixed(1)}%\r`);
    },
  });

  console.log(`\nSUCCESS! Video #2 rendered successfully to:\n${OUTPUT_LOCATION}`);
}

main().catch((err) => {
  console.error('\nRender Error:', err);
  process.exit(1);
});
