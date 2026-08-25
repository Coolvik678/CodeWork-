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

  console.log("Phase 1: Adding notebook to library for stability...");
  const addResult = await client.callTool({
    name: "add_notebook",
    arguments: { 
      url: notebookUrl,
      name: "Gemini CLI to Claude Code",
      description: "Research notes and best practices for Gemini CLI, Claude Code, and Remotion.",
      topics: ["Gemini CLI", "Claude Code", "Remotion", "Plot Code"],
      content_types: ["best practices", "code patterns"]
    }
  });
  console.log("Add Result:", JSON.stringify(addResult, null, 2));

  console.log("Fetching notebook details via ask_question...");
  const queryResult = await client.callTool({
    name: "ask_question",
    arguments: { 
      notebook_url: notebookUrl,
      browser_options: {
        headless: true,
        timeout_ms: 180000 
      },
      question: "Generate a list of all source titles in this notebook. Format as a numbered list from 1 to 60."
    }
  });
  
  fs.writeFileSync("notebook.lm/source_titles_raw.json", JSON.stringify(queryResult, null, 2), "utf8");
  
  process.exit(0);
}

main().catch(console.error);
