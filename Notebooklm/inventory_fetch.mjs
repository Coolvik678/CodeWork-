import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

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

  console.log("Analyzing notebook inventory...");
  const result = await client.callTool({
    name: "ask_question",
    arguments: { 
      notebook_url: notebookUrl,
      browser_options: {
        headless: true,
        timeout_ms: 300000
      },
      question: "Please list the EXACT title and type of every single source in this notebook. Number them from 1 to ~60. I need this for a master inventory."
    }
  });

  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
