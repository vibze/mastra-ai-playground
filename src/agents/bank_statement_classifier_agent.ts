import { Agent } from "@mastra/core";
import { notepadWriteTool } from "~/tools/notepad_write";
import { notepadReadTool } from "~/tools/notepad_read";
 
const instructions = `You are a helpful assistants that helps to classify bank statements.
Your responsibility is to take a bank statement file and determine the following:
1. Is it empty or not?
2. If it is not empty, what is the date of the statement?
3. If it is not empty, what is the number of items?
4. If it is not empty, what is the currency?
5. If it is not empty, what is the account number?
6. If it is not empty, what is the bank name?
7. If it is not empty, what is the banks BIC?
`;

export const bankStatementClassifierAgent = new Agent({
  name: "Bank Statement Classifier",
  instructions: instructions,
  model: {
    provider: "OPEN_AI",
    name: "gpt-4o-mini",
  },
  tools: {
    notepadWrite: notepadWriteTool,
    notepadRead: notepadReadTool,
  },
});
Agent, notepadWriteTool, notepadReadTool, 