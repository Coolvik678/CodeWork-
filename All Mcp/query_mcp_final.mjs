import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";

async function main() {
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

  console.log("Analyzing sources... please wait about 2-3 minutes.");
  const result = await client.callTool({
    name: "ask_question",
    arguments: { 
      notebook_url: notebookUrl,
      browser_options: {
        show: false,
        headless: true,
        timeout_ms: 300000
      },
      question: "Analyze all sources. Group the information into: 1. Remotion Skills, 2. Claude Code/Antigravity Skills, 3. Integration Hacks. For each one, explain what to implement. I need the full details to carry out the user's plan."
    }
  });
  
  fs.writeFileSync("notebook.lm/research_data.json", JSON.stringify(result, null, 2), "utf8");
  console.log("Extraction complete. Saved to notebook.lm/research_data.json");
  
  process.exit(0);
}

main().catch(console.error);
