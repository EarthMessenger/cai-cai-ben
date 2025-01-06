export const dynamic = "force-dynamic";

import GameInterface from "./GameInterface";
import { getRandomBenben } from "./getBenben";

export default async function Page() {
  const initialBenben = await getRandomBenben();

  return (
    <GameInterface initialBenben={initialBenben}></GameInterface>
  );

}
