import React from "react";
import css from "./LuoguNameColor.module.css"
import clsx from "clsx";
import { LuoguColors } from "@/luogu";

export const luoguColorsCss: Record<LuoguColors, string> = {
  Gray: css.gray,
  Blue: css.blue,
  Green: css.green,
  Orange: css.orange,
  Red: css.red,
  Purple: css.purple,
  Cheater: css.cheater,
}

export const LuoguNameColor = ({ color, children }: { color: LuoguColors, children: React.ReactNode }) => {
  return (
    <span className={clsx(luoguColorsCss[color], css.name)}>
      {children}
    </span>
  );
}