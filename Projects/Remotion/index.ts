
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execPromise = promisify(exec);

const server = new Server(
    {
        name: "remotion-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

const InitArgsSchema = z.object({
    projectName: z.string().describe("Name of the Remotion project to create"),
    cwd: z.string().optional().describe("Directory to create the project in"),
});

const RenderArgsSchema = z.object({
    entry: z.string().describe("Entry file path (e.g., src/index.ts)"),
    composition: z.string().describe("Composition ID to render"),
    output: z.string().describe("Output file path (e.g., out/video.mp4)"),
    cwd: z.string().describe("Working directory of the Remotion project"),
});

const ListArgsSchema = z.object({
    entry: z.string().describe("Entry file path"),
    cwd: z.string().describe("Working directory of the Remotion project"),
});

const PreviewArgsSchema = z.object({
    entry: z.string().describe("Entry file path"),
    cwd: z.string().describe("Working directory of the Remotion project"),
});

const GeographicSetupArgsSchema = z.object({
    cwd: z.string().describe("Working directory of the Remotion project"),
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "remotion_init",
                description: "Initialize a new Remotion project",
                inputSchema: {
                    type: "object",
                    properties: {
                        projectName: { type: "string" },
                        cwd: { type: "string" },
                    },
                    required: ["projectName"],
                },
            },
            {
                name: "remotion_render",
                description: "Render a Remotion composition to a video",
                inputSchema: {
                    type: "object",
                    properties: {
                        entry: { type: "string" },
                        composition: { type: "string" },
                        output: { type: "string" },
                        cwd: { type: "string" },
                    },
                    required: ["entry", "composition", "output", "cwd"],
                },
            },
            {
                name: "remotion_list_compositions",
                description: "List compositions in a Remotion project",
                inputSchema: {
                    type: "object",
                    properties: {
                        entry: { type: "string" },
                        cwd: { type: "string" },
                    },
                    required: ["entry", "cwd"],
                },
            },
            {
                name: "remotion_preview",
                description: "Start the Remotion preview server",
                inputSchema: {
                    type: "object",
                    properties: {
                        entry: { type: "string" },
                        cwd: { type: "string" },
                    },
                    required: ["entry", "cwd"],
                },
            },
            {
                name: "remotion_geography_setup",
                description: "Scaffold a geographic video template: creates public/assets/maps and standardizes a cinematic map rule file.",
                inputSchema: {
                    type: "object",
                    properties: {
                        cwd: { type: "string" },
                    },
                    required: ["cwd"],
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        if (name === "remotion_init") {
            const { projectName, cwd } = InitArgsSchema.parse(args);
            const command = `npx create-remotion@latest ${projectName} --template blank --yes`;
            const { stdout, stderr } = await execPromise(command, { cwd: cwd || process.cwd() });
            return {
                content: [{ type: "text", text: `Project ${projectName} initialized.\nStdout: ${stdout}\nStderr: ${stderr}` }],
            };
        }

        if (name === "remotion_render") {
            const { entry, composition, output, cwd } = RenderArgsSchema.parse(args);
            const command = `npx remotion render ${entry} ${composition} ${output}`;
            const { stdout, stderr } = await execPromise(command, { cwd });
            return {
                content: [{ type: "text", text: `Render complete.\nStdout: ${stdout}\nStderr: ${stderr}` }],
            };
        }

        if (name === "remotion_list_compositions") {
            const { entry, cwd } = ListArgsSchema.parse(args);
            const command = `npx remotion compositions ${entry}`;
            const { stdout, stderr } = await execPromise(command, { cwd });
            return {
                content: [{ type: "text", text: stdout }],
            };
        }

        if (name === "remotion_preview") {
            const { entry, cwd } = PreviewArgsSchema.parse(args);
            // Start preview in background as it's a long running process
            const command = `npx remotion preview ${entry}`;
            // We don't await this as it won't finish
            exec(command, { cwd });
            return {
                content: [{ type: "text", text: "Remotion preview server starting in background. Check your browser at http://localhost:3000" }],
            };
        }

        if (name === "remotion_geography_setup") {
            const { cwd } = GeographicSetupArgsSchema.parse(args);
            const assetsDir = path.join(cwd, "public", "assets", "maps");
            fs.mkdirSync(assetsDir, { recursive: true });

            const rulesFile = path.join(cwd, "geography-rules.md");
            const rulesContent = `# Geographical Video Generation Rules
1. ALWAYS use local assets from \`public/assets/maps\`. Do not generate or substitute custom map images.
2. Use dark cinematic gradients for the background of Earth-level scenes.
3. Apply smooth programmatic Pan/Zoom using Remotion \`spring\` and \`interpolate\` to focus on specific lat/lon coordinates mapped to pixel values.
4. Layer voice-over audio with geographical indicators (population bars, borders) synced to the frame timeline.`;
            fs.writeFileSync(rulesFile, rulesContent);
            return {
                content: [{ type: "text", text: `Geographical template setup complete.\n- Created directory: ${assetsDir}\n- Created file: ${rulesFile}\n\nPlease be sure to place SVG maps in the directory and reference the geography-rules.md when prompting the agent.` }]
            };
        }

        throw new Error(`Unknown tool: ${name}`);
    } catch (error: any) {
        return {
            content: [{ type: "text", text: `Error: ${error.message}` }],
            isError: true,
        };
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Remotion MCP server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
