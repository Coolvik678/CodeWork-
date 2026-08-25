import { connectToBrowser } from './src/browser/connect.js';
import { handleFlowOpen } from './src/tools/flow-open.js';
import { handleGenerateImage } from './src/tools/generate-image.js';

try {
  console.log("Connecting browser via CDP on port 9222...");
  await connectToBrowser({ cdpPort: 9222 });
  await handleFlowOpen({});

  console.log("Generating stickman sleeping while smoking image via Google Flow MCP...");
  const result = await handleGenerateImage({
    prompt: "Minimalist stick figure character lying down sleeping on a simple bed while holding a small smoking cigarette, simple black vector line art, round head, stick body, pure solid white background, high contrast monochrome line illustration, clean, vector style, no background details",
    auto_confirm: true,
    model: "Nano Banana 2",
    ratio: "16:9"
  });

  console.log("Result:", JSON.stringify(result, null, 2));
} catch (err) {
  console.error("Error executing Google-Flow_MCP generation:", err);
}
