import type { Response as Minecraft } from "../types/minecraft.d.ts";
import { Composer, Context, InlineKeyboard, InputFile } from "../deps.ts";

const composer = new Composer();

export const message = (data: Minecraft): string =>
  `<b>Stackoverflow Stats!</b>` +
  `\n` +
  `\n` +
  `<b>🚨️ Online:</b> ${data.status ? "Yup" : "Nah"}` +
  `\n` +
  `<b>👥 Players:</b> <code>${data.content.players.max}/${data.content.players.max}</code>` +
  `\n` +
  `<b>🦡 Address:</b> owo.uwussi.moe:25565` +
  `\n` +
  `<b>➿ Software:</b> Vanilla ${data.content.version.name} => ${data.content.version.protocol}` +
  `\n` +
  `<b>📝 Message:</b> <code>${data.content.motd.clean}</code>`;

export const keyboard = () =>
  new InlineKeyboard()
    .url("Website", `https://uwussi.moe/minecraft`).url(
      "Repository",
      `https://github.com/uwussimo/minecraft`,
    );

composer.command("mc", async (ctx: Context): Promise<void> => {
  try {
    await fetch("https://uwussi.moe/api/minecraft").then(
      async (r: Response) => {
        const json: Minecraft = await r.json();

        if (json.status) {
          await ctx.replyWithPhoto(
            new InputFile({ url: json.content.favicon }),
            {
              caption: message(json),
              parse_mode: "HTML",
              reply_markup: keyboard(),
            },
          );
        } else {
          await ctx.reply(
            "<b>Woah, seems like server went offline 😢.</b>",
            {
              parse_mode: "HTML",
            },
          );
        }
      },
    );
  } catch (_) {
    await ctx.reply(
      "<b>Woah, seems like I'm facing some issues 😢.</b>" + "\n" +
        "I don't remember myself installing php, python or apache in my server 🧐",
      {
        parse_mode: "HTML",
      },
    );
  }
});

export default composer;
