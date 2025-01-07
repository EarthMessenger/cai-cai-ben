import { BenbenWithCompiledContent } from "@/type";
import css from "./Benben.module.css"

import clsx from "clsx";
import { LuoguNameColor } from "./LuoguNameColor";

export const Benben = ({ benben, showDetails }: { benben: BenbenWithCompiledContent, showDetails: boolean }) => {
  const benbenTime = new Date(benben.time * 1000);

  return (
    <div className={css.feedContainer}>
      <img src={benben.user.avatar} className={clsx(!showDetails && css.blur, css.avatar)} />
      <div className={css.feedMain}>
        <div>
          {
            showDetails ? (
              <LuoguNameColor color={benben.user.color}>{benben.user.name}</LuoguNameColor>
            ) : (
              <span className={css.blur}>{benben.user.name}</span>
            )
          }
          <time className={css.feedTime} dateTime={benbenTime.toISOString()}>{benbenTime.toLocaleString()}</time>
        </div>

        <div dangerouslySetInnerHTML={{ __html: benben.compiledContent }}></div>
      </div>
    </div>
  );
};
