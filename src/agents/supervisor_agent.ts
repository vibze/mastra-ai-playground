import { Agent } from "@mastra/core";
import { fileTypeDetectorTool } from "~/tools/file_type_detector";
import { invoiceReaderTool } from "~/tools/invoice_reader";
 
const instructions = `You are a helpful assistant that can processes accounting tasks.
If you get a file or an image, you should first use the fileTypeDetector tool to detect the type of the file.
Then, you should use the invoiceReader tool to read and process the invoice.

Respond with a human readable text without any markdown. Dont miss out any information returned by the tools.
Respond in russian.
`;

export const supervisorAgent = new Agent({
  name: "Supervisor Agent",
  instructions: instructions,
  model: {
    provider: "OPEN_AI",
    name: "gpt-4o",
  },
  tools: {
    fileTypeDetector: fileTypeDetectorTool,
    invoiceReader: invoiceReaderTool,
  },
});
