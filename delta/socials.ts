import { Composer, Context, InlineKeyboard } from "../deps.ts";

const composer = new Composer();

export const message: string = `<b>Welcome to my assistant bot!</b> \n` +
  `\n` +
  `This bot helps me to maintain some issues. ` +
  `Also, this bot will serve for me as a shortcut and automation.`;

export const keyboard = new InlineKeyboard()
  .url("GitHub", "https://github.com/uwussimo")
  .url("Telegram", "https://t.me/uwublog")
  .url("Discord", "https://discord.gg/JkXFQpScFj")
  .url("Twitter", "https://twitter.com/uwussimo")
  .url("Keybase", "https://keybase.io/uwussimo");

composer.command("start", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

export default composer;
