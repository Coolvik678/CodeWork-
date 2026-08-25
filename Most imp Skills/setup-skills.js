const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'skills.md');
const destDir = path.join(__dirname, '.agents', 'skills');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

for (const file of files) {
    if (!file.endsWith('.md') || file === 'CATALOG.md') continue;

    const skillName = file.replace('.md', '');
    const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
    
    // Extract name and description
    const lines = content.split('\n');
    let name = skillName;
    let desc = '';
    
    const h1Index = lines.findIndex(l => l.startsWith('# '));
    if (h1Index !== -1) {
        name = lines[h1Index].replace('# ', '').trim();
        // find first paragraph after h1
        for (let i = h1Index + 1; i < lines.length; i++) {
            if (lines[i].trim() !== '' && !lines[i].startsWith('#')) {
                desc = lines[i].trim();
                break;
            }
        }
    }
    
    // Create new content with frontmatter
    const frontmatter = `---
name: ${name}
description: "${desc.replace(/"/g, '\\"')}"
---
`;
    
    const newContent = frontmatter + content;
    
    const skillDir = path.join(destDir, skillName);
    if (!fs.existsSync(skillDir)) {
        fs.mkdirSync(skillDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), newContent);
    console.log(`Migrated ${file} to .agents/skills/${skillName}/SKILL.md`);
}

console.log('Migration complete.');
