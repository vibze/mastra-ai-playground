import fs from "fs";
import { createTool } from "@mastra/core";
import { z } from "zod";
 

export const notepadReadTool = createTool({
  id: "notepad-read",
  description: "If you dont have access to some informtion. Read the notepad, maybe you will find something useful there",
  inputSchema: z.object({
    text: z.string().describe("Text to write"),
  }),
  execute: async () => {
    console.log("Reading from notepad");
    const content = fs.readFileSync("notepad.txt", "utf8");
    return content;
  },
});