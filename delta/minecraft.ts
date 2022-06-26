import type { Response as Minecraft, User } from "../types/minecraft.d.ts";
import { Composer, Context, InlineKeyboard, InputFile } from "../deps.ts";

const composer = new Composer();

const listPlayers = (data: Minecraft): string => {
  let base = "";
  if (data.content.players.sample) {
    data.content.players.sample.map((u) => {
      base += `* ${u.name}\n`;
    });
  } else {
    return "";
  }
};

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
  `<b>📝 Message:</b> <code>${data.content.motd.clean}</code>` + `\n` + `\n` +
  listPlayers(data);

export const keyboard = () =>
  new InlineKeyboard()
    .text("Refresh", "mc").row()
    .url("Website", `https://uwussi.moe/minecraft`).url(
      "Repository",
      `https://github.com/uwussimo/minecraft`,
    );

export const errorKeyboard = () =>
  new InlineKeyboard()
    .text("Refresh", "mc");

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
              reply_markup: errorKeyboard(),
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
        reply_markup: errorKeyboard(),
      },
    );
  }
});

composer.callbackQuery(/^mc$/, async (ctx: Context): Promise<void> => {
  try {
    await fetch("https://uwussi.moe/api/minecraft").then(
      async (r: Response) => {
        const json: Minecraft = await r.json();

        if (json.status) {
          await ctx.editMessageCaption(
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
              reply_markup: errorKeyboard(),
            },
          );
        }
      },
    );
  } catch (_) {
    await ctx.editMessageCaption(
      {
        caption: "<b>Woah, seems like I'm facing some issues 😢.</b>" + "\n" +
          "I don't remember myself installing php, python or apache in my server 🧐",
        parse_mode: "HTML",
        reply_markup: errorKeyboard(),
      },
    );
  }
});

export default composer;
