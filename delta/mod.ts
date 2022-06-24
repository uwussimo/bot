import { Bot } from "../deps.ts";
import start from "./start.ts";
import help from "./help.ts";
import stacks from "./stacks.ts";
import minecraft from "./minecraft.ts";

export default async (bot: Bot) => {
  await bot.use(start);
  await bot.use(help);
  await bot.use(stacks);
  await bot.use(minecraft);
};
