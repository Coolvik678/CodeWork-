import subprocess
import json
import sys

def main():
    print("Starting MCP server...")
    p = subprocess.Popen(
        ['python', '-m', 'notebooklm_mcp.server'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        text=True
    )

    req1 = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/list",
        "params": {}
    }
    print("Sending tools/list request...")
    p.stdin.write(json.dumps(req1) + "\n")
    p.stdin.flush()

    tools = None
    for line in p.stdout:
        try:
            resp = json.loads(line)
            if resp.get('id') == 1:
                tools = resp['result']['tools']
                print("Found tools:", [t['name'] for t in tools])
                print(json.dumps(tools, indent=2))
                break
        except Exception as e:
            continue
            
    if not tools:
        print("Failed to get tools.")
        p.terminate()
        return

    # Assuming there's a tool like "notebooklm_list" or "notebooklm_ask"
    # we can try to call it to find the notebook.
    
    p.terminate()

if __name__ == "__main__":
    main()
