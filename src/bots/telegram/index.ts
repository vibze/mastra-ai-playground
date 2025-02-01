import { Bot, Context } from "grammy";
import dotenv from "dotenv";
import { PhotoSize } from "grammy/types";

dotenv.config();

type ImagePayload = {
  url: string | URL;
}

type FilePayload = {
  url: string | URL;
  mimeType: string;
}

type ResponseGeneratorInput = { 
  text: string;
  file?: FilePayload;
  image?: ImagePayload;
}

type ResponseGenerator = (input: ResponseGeneratorInput) => Promise<string>;

export const createTelegramBot = (responseGenerator: ResponseGenerator): Bot => {
  const isGroup = (ctx: Context): boolean => {
    return ctx.chat?.type === "group" || ctx.chat?.type === "supergroup";
  }

  const resolveFileURL = async (ctx: Context, fileId: string): Promise<string> => {
    const file = await ctx.api.getFile(fileId);
    return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
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
  
    let input: ResponseGeneratorInput = {
      text: ctx.message?.text || "",
    };

    if (ctx.message?.photo) {
      input.image = {
        url: await resolveFileURL(ctx, ctx.message.photo[ctx.message.photo.length - 1].file_id),
      };
    }

    if (ctx.message?.document) {
      input.file = {
        url: await resolveFileURL(ctx, ctx.message.document.file_id),
        mimeType: ctx.message.document.mime_type || "application/octet-stream",
      };
    }

    const response = await responseGenerator(input);
    
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