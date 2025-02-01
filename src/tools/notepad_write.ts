import fs from "fs";
import { createTool } from "@mastra/core";
import { z } from "zod";
 

export const notepadWriteTool = createTool({
  id: "notepad-write",
  description: "Write text to the notepad if you need to remember something",
  inputSchema: z.object({
    text: z.string().describe("Text to write"),
  }),
  execute: async ({ context: { text } }) => {
    console.log("Writing to notepad:", text);
    fs.writeFileSync("notepad.txt", text);
    return "Text written to notepad";
  },
});