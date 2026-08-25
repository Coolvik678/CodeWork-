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
  
  console.log("Cleaning up data dir (preserving library)...");
  await client.callTool({
    name: "cleanup_data",
    arguments: { 
      confirm: true,
      preserve_library: true
    }
  });

  console.log("Re-triggering setup_auth...");
  await client.callTool({
    name: "setup_auth",
    arguments: { show_browser: true }
  });
  
  process.exit(0);
}

main().catch(console.error);
