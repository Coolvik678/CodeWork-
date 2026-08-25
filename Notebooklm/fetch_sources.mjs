import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";

async function main() {
  const transport = new StdioClientTransport({
    command: "cmd.exe",
    args: ["/c", "notebooklm-mcp"]
  });

  const client = new Client(
    { name: "test-client", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  await client.connect(transport);
  
  console.log("Reading sources without headless...");
  const result = await client.callTool({
    name: "ask_question",
    arguments: { 
      notebook_url: "https://notebooklm.google.com/notebook/29ab1485-9947-4783-a96a-c56920aefd21",
      question: "Please copy out every single source EXACTLY word for word from the notebook. I mean raw export of all 60 sources.",
      browser_options: {
        show: true,
        headless: false,
        timeout_ms: 300000
      }
    }
  });

  fs.writeFileSync("notebook.lm/research_data_full.json", JSON.stringify(result, null, 2), "utf8");
  console.log("Done");

  process.exit(0);
}

main().catch(console.error);
