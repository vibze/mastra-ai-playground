import { Agent } from "@mastra/core";

const instructions = `You are a helpful assistant that analyzes files to read and process invoices.
Your responsibility is to examine files and extract information from them.

Information should be returned in the following format:
{
  "invoiceNumber": "1234567890",
  "invoiceDate": "2024-01-01",
  "invoiceAmount": 1000,
  "invoiceCurrency": "USD",
  "invoiceDueDate": "2024-01-31"
}

If you could not extract the information, you should return "unknown".`;

export const invoiceReaderAgent = new Agent({
  name: "Invoice Reader",
  instructions: instructions,
  model: {
    provider: "OPEN_AI",
    name: "gpt-4o",
  }
});