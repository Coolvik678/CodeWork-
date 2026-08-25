import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

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
  
  const result = await client.callTool({
    name: "notebook_list",
    arguments: { max_results: 100 }
  });
  
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

main().catch(console.error);
