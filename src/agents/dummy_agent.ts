import { Agent } from "@mastra/core";
import { notepadWriteTool } from "~/tools/notepad_write";
import { notepadReadTool } from "~/tools/notepad_read";
 
export const dummyAgent = new Agent({
  name: "My Agent",
  instructions: "You are a helpful assistant.",
  model: {
    provider: "OPEN_AI",
    name: "gpt-4o-mini",
  },
  tools: {
    notepadWrite: notepadWriteTool,
    notepadRead: notepadReadTool,
  },
});
