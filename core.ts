import {
  blue,
  Bot,
  Composer,
  Context,
  serve,
  webhookCallback,
} from "./deps.ts";
import "./config.ts";
import env from "./config.ts";
import delta from "./delta/mod.ts";

export const bot = new Bot(env["TOKEN"] || "");
export const handle = webhookCallback(bot, "std/http");

const initializer = async () => {
  await console.log(blue("[INFO]"), `bot is starting on ${env["HOST"]}`);
  await delta(bot);
};

const webhook = async () => {
  await console.log(blue("[INFO]"), `bot is starting on ${env["HOST"]}`);
  await serve(async (req) => {
    if (req.method == "POST") {
      try {
        return await handle(req);
      } catch (err) {
        console.error(err);
        return new Response();
      }
    }

    return Response.redirect("https://t.me/xinuxuz", 302);
  });
};

const polling = async () => {
  await bot.start();
};

export const launch = async () => {
  switch (env["HOST"]) {
    case "WEBHOOK":
      await initializer();
      await webhook();
      break;
    case "POLLING":
      await initializer();
      await polling();
      break;
    default:
      throw new Error("Deploy method not validated!");
  }
};

await launch();
