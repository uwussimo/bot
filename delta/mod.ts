import start from "./start.ts";
import help from "./help.ts";
import stacks from "./stacks.ts";
import { Bot } from "../deps.ts";

export default async (bot: Bot) => {
  await bot.use(start);
  await bot.use(help);
  await bot.use(stacks);
};
