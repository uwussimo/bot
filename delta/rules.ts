import { Composer, Context, InlineKeyboard } from "../deps.ts";

const composer = new Composer();

export const message =
  `After getting many <b>feedbacks</b>, we created rules for our minecraft server. Please spare some time to avoid future IP bans!`;

export const keyboard = new InlineKeyboard()
  .url("Rules", "https://www.uwussi.moe/minecraft/rules");

composer.command("rules", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

export default composer;
