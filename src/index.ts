import { Mastra } from "@mastra/core";
import { createTelegramBot } from "./bots/telegram";
import { dummyAgent } from "./agents/dummy_agent";

const mastra = new Mastra({
  agents: { dummyAgent }
});

// const agent = await mastra.getAgent("weatherAgent");
// const result = await agent.generate("What is the weather in London?");

const telegramBot = createTelegramBot(async (input: string) => {
  const agent = await mastra.getAgent("dummyAgent");
  const result = await agent.generate(input);
  return result.text;
});
telegramBot.start();
