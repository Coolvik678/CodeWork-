import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";

async function main() {
  const transport = new StdioClientTransport({
    command: "python",
    args: ["-m", "notebooklm_mcp.server"]
  });

  const client = new Client(
    { name: "query-client", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  await client.connect(transport);
  
  console.log("Refreshing auth...");
  const authResult = await client.callTool({
    name: "refresh_auth",
    arguments: {}
  });
  console.log(JSON.stringify(authResult, null, 2));

  console.log("Fetching notebooks...");
  const result = await client.callTool({
    name: "notebook_list",
    arguments: { max_results: 100 }
  });
  
  fs.writeFileSync("notebooks.json", JSON.stringify(result, null, 2), "utf8");
  
  process.exit(0);
}

main().catch(console.error);
