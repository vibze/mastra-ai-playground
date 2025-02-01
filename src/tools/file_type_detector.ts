import { createTool } from "@mastra/core";
import { z } from "zod";
import { fileTypeDetectorAgent } from "~/agents/file_type_detector_agent";

export const fileTypeDetectorTool = createTool({
  id: "file-type-detector",
  description: "Detects the type of a file based on its extension and content",
  inputSchema: z.object({
    fileURL: z.string().describe("URL to the file to analyze"),
  }),
  outputSchema: z.object({
    fileType: z.string()
  }),
  execute: async ({ context: { fileURL } }) => {
    console.log("Detecting file type for", fileURL);
    const result = await fileTypeDetectorAgent.generate([
      {
        role: "user",
        content: [
          { type: "text", text: "This is the file" },
          { type: "image", image: new URL(fileURL) }
        ],
      },
    ], {
      output: z.object({
        fileType: z.string()
      }),
    });

    console.log("File type detected", result.object);
    return { fileType: result.object.fileType, fileURL: fileURL };
  },
});
