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

  console.log("Phase 1: Fetching inventory...");
  const result = await client.callTool({
    name: "ask_question",
    arguments: { 
      notebook_url: notebookUrl,
      browser_options: {
        headless: true,
        timeout_ms: 300000
      },
      question: "List all source titles and their types. Number them 1-60."
    }
  });
  
  fs.writeFileSync("notebook.lm/source_titles_raw.json", JSON.stringify(result, null, 2), "utf8");
  process.exit(0);
}

main().catch(console.error);
