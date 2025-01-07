"use server";

const { LUOGU_API } = process.env;
const randomChoice = <T>(a: Array<T>) => {
  return a[Math.floor(Math.random() * a.length)];
};

import { LuoguBenbenApiSchema } from "../type";

export const getRandomBenben = async () => {
  const randomPage = Math.floor(Math.random() * 1e4);
  const randomBenben = await fetch(`${LUOGU_API}/feed/list?page=${randomPage}`)
    .then((res) => res.json())
    .then((res) => LuoguBenbenApiSchema.parseAsync(res))
    .then((res) => randomChoice(res.feeds.result));

  return randomBenben;
};
