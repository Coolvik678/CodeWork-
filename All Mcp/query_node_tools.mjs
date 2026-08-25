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
  const tools = await client.listTools();
  fs.writeFileSync("node_tools.json", JSON.stringify(tools, null, 2), "utf8");
  process.exit(0);
}

main().catch(console.error);
