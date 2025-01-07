export const luoguColors = [
  "Gray",
  "Blue",
  "Green",
  "Orange",
  "Red",
  "Purple",
  "Cheater",
] as const;

export type LuoguColors = typeof luoguColors[number];