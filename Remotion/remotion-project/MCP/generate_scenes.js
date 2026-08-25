import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  });
}

const API_KEY = process.env.GOOGLE_FLOW_API_KEY;

if (!API_KEY) {
  console.error("❌ Error: GOOGLE_FLOW_API_KEY is missing in .env file.");
  process.exit(1);
}

/**
 * Generate image using Google AI Studio / Imagen API
 * @param {string} prompt 
 * @param {string} outputPath 
 */
export async function generateImage(prompt, outputPath) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict`;
  
  const body = {
    instances: [
      {
        prompt: prompt,
      },
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
      outputOptions: {
        mimeType: "image/png",
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Google API Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const base64Image = data.predictions?.[0]?.bytesBase64Encoded;

    if (!base64Image) {
      throw new Error("No image data returned from API response.");
    }

    const buffer = Buffer.from(base64Image, "base64");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Saved scene image: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate image for prompt "${prompt.substring(0, 30)}...":`, error.message);
    return false;
  }
}

/**
 * Batch generate scenes from a JSON manifest
 * @param {Array<{fileName: string, prompt: string}>} scenes 
 */
export async function generateBatchScenes(scenes) {
  const imagesDir = path.resolve(__dirname, "../src/assets/images");
  console.log(`🚀 Starting batch generation of ${scenes.length} scenes...`);

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const targetPath = path.join(imagesDir, scene.fileName);
    console.log(`[${i + 1}/${scenes.length}] Generating ${scene.fileName}...`);
    
    await generateImage(scene.prompt, targetPath);
    
    // Rate limit buffer between API requests
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log("🎉 All scene images generated successfully!");
}
