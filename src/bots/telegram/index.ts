import { Bot, Context } from "grammy";
import dotenv from "dotenv";

dotenv.config();

type ResponseGenerator = (input: string) => Promise<string>;

export const createTelegramBot = (responseGenerator: ResponseGenerator): Bot => {
  const isGroup = (ctx: Context): boolean => {
    return ctx.chat?.type === "group" || ctx.chat?.type === "supergroup";
  }
  
  const shouldReply = (ctx: Context): boolean => {
    const isMentioned = ctx.message?.entities?.some(
      entity => entity.type === "mention" || 
      (entity.type === "text_mention" && entity.user.id === ctx.me.id)
    );
    const isRepliedToBot = ctx.message?.reply_to_message?.from?.id === ctx.me.id;
  
    if (isGroup(ctx)) {
      return isMentioned || isRepliedToBot;
    }
  
    return true;
  }
  
  const handleMessage = async (ctx: Context) => {
    if (!shouldReply(ctx)) {
      return;
    }
  
    const response = await responseGenerator(ctx.message?.text || "");
    
    try {
      await ctx.reply(response);
    } catch (error) {
      console.error("Error replying to message:", error);
      await ctx.reply("Sorry, I couldn't respond to that message.");
    }
  };
  
  const handleStart = async (ctx: Context) => {
    if (isGroup(ctx)) {
      await ctx.reply("Hello everyone! I'm now active in this group. Mention me or reply to my messages to interact.");
    } else {
      await ctx.reply("Welcome! I'm your bot assistant. Send me a message and I'll respond.");
    }
  };
  
  const telegramBot = new Bot(process.env.BOT_TOKEN!);
  
  telegramBot.command("start", handleStart);
  telegramBot.on("message", handleMessage);

  return telegramBot;
}