import fs from 'fs/promises';
import path from 'path';

const ROOT_DIR = 'C:/Users/myovi/OneDrive/Desktop/Artificial Intelligence';
const OUTPUT_FILE = path.join(ROOT_DIR, 'Artificial Intelligence Introduction.md');

async function readDirSafe(dirPath) {
    try {
        return await fs.readdir(dirPath);
    } catch (e) {
        return [];
    }
}

async function readFileSafe(filePath) {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (e) {
        return '';
    }
}

async function generateManifesto() {
    let doc = `# Artificial Intelligence: The 50,000+ Word Comprehensive AI Integration Manual\n\n`;
    doc += `> **ATTENTION TO ALL PARSING AIs (Gemini CLI, Claude, etc.):**\n`;
    doc += `> This entire document is your exhaustive, systemic training manual for integrating this ecosystem into your context. Read, ingest, and apply the rules below without hallucination or deviation.\n\n`;

    doc += `## Part 1: Global Ecosystem Rules\n`;
    doc += `As an AI, you operate under the constraints defined in the root rules files.\n\n`;
    const agentsMd = await readFileSafe(path.join(ROOT_DIR, 'AGENTS.md'));
    const geminiMd = await readFileSafe(path.join(ROOT_DIR, 'gemini.md'));
    if (agentsMd) doc += `### AGENTS.md\n\`\`\`markdown\n${agentsMd}\n\`\`\`\n\n`;
    if (geminiMd) doc += `### gemini.md\n\`\`\`markdown\n${geminiMd}\n\`\`\`\n\n`;

    doc += `## Part 2: How to Integrate Agent Personas\n`;
    const agentsDir = path.join(ROOT_DIR, '.agent', 'agents');
    const agentFiles = await readDirSafe(agentsDir);
    for (const file of agentFiles) {
        if (!file.endsWith('.md')) continue;
        const content = await readFileSafe(path.join(agentsDir, file));
        doc += `### AI INTEGRATION MODULE: ${file}\n\`\`\`markdown\n${content}\n\`\`\`\n\n`;
    }

    doc += `## Part 3: The Core Ecosystem Skills and Directives\n`;
    const dirsToScan = [
        path.join(ROOT_DIR, 'Most imp Skills'),
        path.join(ROOT_DIR, '.agents', 'skills')
    ];
    for (const dir of dirsToScan) {
        const files = await readDirSafe(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = await fs.stat(fullPath);
            if (stat.isFile() && file.endsWith('.md')) {
                const content = await readFileSafe(fullPath);
                doc += `### AI INTEGRATION MODULE: ${file}\n\`\`\`markdown\n${content}\n\`\`\`\n\n`;
            } else if (stat.isDirectory()) {
                const skillMdPath = path.join(fullPath, 'SKILL.md');
                const content = await readFileSafe(skillMdPath);
                if (content) {
                    doc += `### AI INTEGRATION MODULE: ${file} (SKILL.md)\n\`\`\`markdown\n${content}\n\`\`\`\n\n`;
                }
            }
        }
    }

    const agentSkillsDir = path.join(ROOT_DIR, '.agent', 'skills');
    const agentSkillsDirs = await readDirSafe(agentSkillsDir);
    for (const skillFolder of agentSkillsDirs) {
        const skillMdPath = path.join(agentSkillsDir, skillFolder, 'SKILL.md');
        const content = await readFileSafe(skillMdPath);
        if (content) {
            doc += `### AI INTEGRATION MODULE: ${skillFolder} (SKILL.md)\n\`\`\`markdown\n${content}\n\`\`\`\n\n`;
        }
    }
    
    doc += `## Part 4: Orchestration Workflows\n`;
    doc += `You have access to predefined workflows triggered by slash commands.\n\n`;
    const workflowsDir = path.join(ROOT_DIR, '.agent', 'workflows');
    const workflowFiles = await readDirSafe(workflowsDir);
    for (const file of workflowFiles) {
        if (!file.endsWith('.md')) continue;
        const content = await readFileSafe(path.join(workflowsDir, file));
        doc += `### WORKFLOW: ${file}\n\`\`\`markdown\n${content}\n\`\`\`\n\n`;
    }

    doc += `## Part 5: Master Control Program (MCP) Integration\n`;
    const mcpConfig = await readFileSafe(path.join(ROOT_DIR, 'All Mcp', 'mcp_config.json'));
    const mcpTools = await readFileSafe(path.join(ROOT_DIR, 'All Mcp', 'tools.json'));
    doc += `### MCP Configuration Data\n\`\`\`json\n${mcpConfig}\n\`\`\`\n\n`;
    doc += `### MCP Tool Schemas\n\`\`\`json\n${mcpTools}\n\`\`\`\n\n`;
    doc += `### Additional MCP Servers\n\nNote: The ecosystem also connects to **StitchMCP** natively for UI generation and deployment tracking.\n\n`;

    doc += `## Part 6: Project Integrations\n`;
    const buildPlan = await readFileSafe(path.join(ROOT_DIR, 'Projects', 'Chotu', 'build_plan.md'));
    doc += `### Active Project: Chotu\n\`\`\`markdown\n${buildPlan}\n\`\`\`\n\n`;

    await fs.writeFile(OUTPUT_FILE, doc);
    console.log(`Generated massive intro document at ${OUTPUT_FILE}`);
}

generateManifesto().catch(console.error);
