---
name: NotebookLM Best Practices
description: A collection of rules and best practices for leveraging the NotebookLM MCP to extract, structure, and synthesize data from documents.
---

# NotebookLM Data Extraction Rules

When prompted to use NotebookLM to extract or synthesize data, the agent MUST strictly adhere to the following workflow and principles to produce the best structured data:

## 1. Initial Document Context & Grounding
- **Always Verify Sources:** Before generating any response, use NotebookLM's document search/retrieval tools (if available via MCP) to pull direct excerpts from the provided source material.
- **No Hallucinations:** You must rely entirely on the provided documents or the NotebookLM context. Do not invent external data unless explicitly asked to blend it.

## 2. Structured Data Output Format
Whenever the user asks for "particular data" or "particular information," ensure the output is highly structured. Avoid large walls of text. 
Use the following formats where applicable:

### A. Comparisons and Features (Tables)
When extracting comparisons, pros/cons, or multiple entities with shared features, always output a Markdown Table.
*Example:*
| Feature | Document A Status | Document B Status |
|---------|-------------------|-------------------|
| Cost    | $10               | $15               |

### B. Hierarchical Data (Bullet Points & JSON)
When the user needs structured extraction (like parsing a transcript, an invoice, or a report), break it down using nested bullet points or valid JSON structures (if requested) for easier machine or human readability.

### C. Source Citation
Always cite the source document or the specific section of the text where the data was found. NotebookLM's core strength is grounded citations. 
*Example:* "According to [Document Name, Page 4]..."

## 3. The Extraction Workflow
When you receive a prompt to analyze a new file or transcript:
1. **Read & Index:** Scrutinize the text context provided.
2. **Identify Entities:** Look for the core subjects, metrics, dates, and actionable items.
3. **Structure & Format:** Map the identified entities into the required structured format (Markdown, JSON, or CSV).
4. **Review:** Ensure no data point was missed or misrepresented from the source.

## 4. Audio & Transcript Synthesis (NanoBanana / Audio features)
If parsing transcripts (similar to video workflows):
- Extract the timestamps and align them with the key topics.
- Summarize the core actionable insights at the top of the structured data response.
