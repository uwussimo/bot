import type { Data, User } from "../types/stackoverflow.d.ts";
import { Composer, Context, InlineKeyboard, InputFile } from "../deps.ts";

const composer = new Composer();
const payload = (id: number) =>
  `https://api.stackexchange.com/2.3/users/${id.toString()}?order=desc&sort=reputation&site=stackoverflow`;

export const message = (data: User): string =>
  `<b>Stackoverflow Stats!</b>` +
  `\n` +
  `\n` +
  `<b>🖊️ Works:</b> ${data.is_employee ? "Yup" : "Nah"}` +
  `\n` +
  `<b>➿ Reputation:</b> ${data.reputation} (+${data.reputation_change_month})` +
  `\n` +
  `<b>🦡 Badges:</b> 🥉 ${data.badge_counts.bronze} 🥈 ${data.badge_counts.silver} 🥇 ${data.badge_counts.gold}` +
  `\n` +
  `<b>➕ Joined:</b> <code>${
    (new Date(data.creation_date * 1000)).toUTCString()
  }</code>` +
  `\n` +
  `<b>📝 Last Change:</b> <code>${
    (new Date(data.last_modified_date * 1000)).toUTCString()
  }</code>` +
  `\n` +
  `<b>🟢 Last Online:</b> <code>${
    (new Date(data.last_modified_date * 1000)).toUTCString()
  }</code>`;

export const keyboard = (data: User) =>
  new InlineKeyboard()
    .url("👤 Profile", data.link);

composer.command("stacks", async (ctx: Context): Promise<void> => {
  try {
    await fetch(payload(17599905)).then(async (r: Response) => {
      const json: Data = await r.json();
      await ctx.replyWithPhoto(
        new InputFile({ url: json.items[0].profile_image }),
        {
          caption: message(json.items[0]),
          parse_mode: "HTML",
          reply_markup: keyboard(json.items[0]),
        },
      );
    });
  } catch (_) {
    await ctx.reply(
      "<b>Limit</b> for today has been reached! Please wait till <b>tomorrow</b> until our limits get resetted.",
      {
        parse_mode: "HTML",
      },
    );
  }
});

export default composer;
