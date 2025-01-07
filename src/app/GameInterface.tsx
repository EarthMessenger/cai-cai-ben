"use client";

import { FormEventHandler, startTransition, useActionState, useState } from "react";
import { BenbenWithCompiledContent } from "../type";
import { getRandomBenben } from "./getBenben";
import { LuoguNameColor } from "@/components/LuoguNameColor";
import { LuoguColors, luoguColors } from "@/luogu";
import { Benben } from "@/components/Benben";

export default function GameInterface({ initialBenben }: { initialBenben: BenbenWithCompiledContent; }) {
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [answer, setAnswer] = useState<LuoguColors | null>(null);
  const [benben, nextBenbenAction, isPendingBenben] = useActionState(async () => {
    return await getRandomBenben();
  }, initialBenben);

  const accuracy = score.total === 0 ? "0" : (score.correct / score.total * 100).toFixed(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const currentAnswer = data.get("answer") as LuoguColors;
    setAnswer(currentAnswer);
    setScore({ correct: score.correct + (currentAnswer === benben.user.color ? 1 : 0), total: score.total + 1 });
  };

  return (
    <>
      <div>
        {
          isPendingBenben ? <p>加载中……</p> : (
            <>
              <Benben benben={benben} showDetails={answer !== null}></Benben>
              <form onSubmit={handleSubmit}>
                {
                  luoguColors.map((c) => (
                    <div key={c}>
                      <label>
                        <input type='radio' name="answer" value={c}></input>
                        <LuoguNameColor color={c}>{c}</LuoguNameColor>
                      </label>
                    </div>
                  ))
                }
                <button type="submit" disabled={answer !== null}>确认</button>
              </form>
            </>
          )
        }
      </div>

      {answer !== null &&
        <>
          <p>
            你的答案：<LuoguNameColor color={answer}>{answer}</LuoguNameColor>，正确答案：<LuoguNameColor color={benben.user.color}>{benben.user.color}</LuoguNameColor>。
          </p>
          <button onClick={() => {
            setAnswer(null);
            startTransition(() => {
              nextBenbenAction()
            });
          }}>下一题</button>
        </>
      }

      <p>准确度：{accuracy}%</p>
    </>
  );
}
