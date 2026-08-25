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

  console.log("Analyzing sources (this will take a few minutes)...");
  const result = await client.callTool({
    name: "ask_question",
    arguments: { 
      notebook_url: notebookUrl,
      browser_options: {
        timeout_ms: 300000 // 5 minutes
      },
      question: "Give me a high-level summary of the best practices for Claude Code and Gemini CLI found in this notebook. Focus on specific tricks, tools, and integration patterns mentioned across the sources."
    }
  });
  
  fs.writeFileSync("final_raw_research.json", JSON.stringify(result, null, 2), "utf8");
  console.log("Saved to final_raw_research.json");
  
  process.exit(0);
}

main().catch(console.error);
