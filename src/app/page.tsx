export const dynamic = "force-dynamic";

import GameInterface from "./GameInterface";
import { getRandomBenben } from "./getBenben";
import css from "./style.module.css"

export default async function Page() {
  const initialBenben = await getRandomBenben();
  return (
    <div className={css.main}>
      <h1>猜猜犇</h1>
      <p>根据犇犇猜测作者名字颜色。</p>
      <p>灵感来源：<a href="https://codeforces.com/blog/entry/137983">Guess the true rating of these users!</a>。</p>
      <GameInterface initialBenben={initialBenben}></GameInterface>
    </div>
  );
}
