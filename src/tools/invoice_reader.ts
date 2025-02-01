import { createTool } from "@mastra/core";
import { z } from "zod";
import { invoiceReaderAgent } from "~/agents/invoice_reader_agent";

export const invoiceReaderTool = createTool({
  id: "invoice-reader",
  description: "Reads and processes invoices",
  inputSchema: z.object({
    fileURL: z.string().describe("URL to the file to analyze"),
  }),
  outputSchema: z.object({
    invoiceNumber: z.string(),
    invoiceDate: z.string(),
    invoiceAmount: z.number(),
    invoiceCurrency: z.string(),
    invoiceDueDate: z.string()
  }),
  execute: async ({ context: { fileURL } }) => {
    console.log("Reading invoice from", fileURL);
    const result = await invoiceReaderAgent.generate([
      {
        role: "user",
        content: [
          { type: "text", text: "This is the invoice" },
          { type: "image", image: new URL(fileURL) }
        ],
      },
    ], {
      output: z.object({
        invoice: z.object({
          invoiceNumber: z.string(),
          invoiceDate: z.string(),
          invoiceAmount: z.number(),
          invoiceCurrency: z.string(),
          invoiceDueDate: z.string(),
        }),
      }),
    });

    console.log("Invoice reader result", result.object);
    return result.object;
  },
});
