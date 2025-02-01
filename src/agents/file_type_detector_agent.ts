import { Agent } from "@mastra/core";

const instructions = `You are a helpful assistant that analyzes files to determine their types.
Your responsibility is to examine files and tell which file type it is. Dont put any decorations 
around the file type. Just return the file type.

Possible file types are:
- Bank statement
- Invoice
- Receipt

If you could not determine the file type, you should return "not supported".`;

export const fileTypeDetectorAgent = new Agent({
  name: "File Type Detector",
  instructions: instructions,
  model: {
    provider: "OPEN_AI",
    name: "gpt-4o-mini",
  }
});
