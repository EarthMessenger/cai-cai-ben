export const dynamic = "force-dynamic";

import GameInterface from "./GameInterface";
import { getRandomBenben } from "./getBenben";

export default async function Page() {
  const initialBenben = await getRandomBenben();

  return (
    <>
      <h2>猜猜犇</h2>
      <p>根据犇犇猜测作者名字颜色</p>
      <GameInterface initialBenben={initialBenben}></GameInterface>
    </>
  );

}
