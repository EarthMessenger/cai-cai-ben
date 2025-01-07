"use server";

const { LUOGU_API, LUOGU_COM_CN } = process.env;
const randomChoice = <T>(a: Array<T>) => {
  return a[Math.floor(Math.random() * a.length)];
};

import { BenbenWithCompiledContent, LuoguBenbenApiSchema } from "../type";

import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkPrependUrl from "remark-prepend-url";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkPrependUrl, new URL(LUOGU_COM_CN || ""))
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

export const getRandomBenben = async (): Promise<BenbenWithCompiledContent> => {
  const randomPage = Math.floor(Math.random() * 1e4);
  const randomBenben = await fetch(`${LUOGU_API}/feed/list?page=${randomPage}`)
    .then((res) => res.json())
    .then((res) => LuoguBenbenApiSchema.parseAsync(res))
    .then((res) => randomChoice(res.feeds.result))
    .then(async (res) => ({
      ...res,
      compiledContent: (await processor.process(res.content)).toString(),
    }));

  return randomBenben;
};
