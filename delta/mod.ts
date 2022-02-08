import start from "./start.ts";
import help from "./help.ts";
import { Bot } from "../deps.ts";

export default async (bot: Bot) => {
  await bot.use(start);
  await bot.use(help);
};
