import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";
import path from "path";

async function main() {
  const [,, start, end] = process.argv;
  if (!start || !end) {
    console.error("Usage: node phase2_deep_reading.mjs <start_id> <end_id>");
    process.exit(1);
  }

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "notebooklm-mcp"]
  });

  const client = new Client(
    { name: "query-client", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  await client.connect(transport);
  
  const notebookUrl = "https://notebooklm.google.com/notebook/29ab1485-9947-4783-a96a-c56920aefd21";
  const inventoryPath = "NOTEBOOK_LM_SOURCE_INVENTORY.md";
  const inventory = fs.readFileSync(inventoryPath, "utf8");

  // Extract titles for the range
  const titles = [];
  const lines = inventory.split("\n");
  for (let i = parseInt(start); i <= parseInt(end); i++) {
    const line = lines.find(l => l.startsWith(`| ${i} |`));
    if (line) {
      const parts = line.split("|");
      titles.push(parts[2].trim());
    }
  }

  for (const title of titles) {
    console.log(`Processing Source: ${title}...`);
    const question = `Please provide a deep analysis of the source titled "${title}". 
    I need:
    1. A detailed summary (2-3 sentences minimum).
    2. Specific skills or techniques taught.
    3. Code patterns or implementations contained.
    4. Applicability (Anti-Gravity, Gemini CLI, Both, Remotion, Generic, Plot Code).
    5. Dependencies.
    6. Implementation priority.
    7. Gotchas/warnings.`;

    try {
      const result = await client.callTool({
        name: "ask_question",
        arguments: { 
          notebook_url: notebookUrl,
          browser_options: { headless: true, timeout_ms: 300000 },
          question
        }
      }, { timeout: 300000 });

      const fileName = `source_${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
      const filePath = path.join("notebook.lm", "comprehension", fileName);
      
      const content = result.content[0].text;
      fs.writeFileSync(filePath, `# Comprehension: ${title}\n\n${content}`, "utf8");
      console.log(`Saved to ${filePath}`);
    } catch (e) {
      console.error(`Error processing ${title}:`, e);
    }
  }

  process.exit(0);
}

main().catch(console.error);
