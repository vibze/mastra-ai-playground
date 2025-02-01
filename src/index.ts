import { Mastra } from "@mastra/core";
import { createTelegramBot } from "./bots/telegram";
import { supervisorAgent } from "./agents/supervisor_agent";

const mastra = new Mastra({
  agents: { supervisorAgent }
});

// const agent = await mastra.getAgent("weatherAgent");
// const result = await agent.generate("What is the weather in London?");

const telegramBot = createTelegramBot(async ({ text, image, file }) => {
  const agent = await mastra.getAgent("supervisorAgent");

  let generationInput: any = [];
  let prompt = text || "";

  if (image) {
    prompt = "File url: " + image.url;
  }

  if (file) {
    prompt = "File url: " + file.url;
  }

  generationInput.push({ type: "text", text: prompt });

  console.log("Generation input", generationInput);
  const result = await agent.generate([
    {
      role: "user",
      content: generationInput,
    },
  ]);
  return result.text;
});

telegramBot.start();
