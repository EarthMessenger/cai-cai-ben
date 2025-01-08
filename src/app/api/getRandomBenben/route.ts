import { getRandomBenben } from "./details";

export const GET = async () => {
  return Response.json(await getRandomBenben());
}
