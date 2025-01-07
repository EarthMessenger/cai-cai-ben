"use client";

import { FormEventHandler, startTransition, useActionState, useState } from "react";
import { BenbenSchema } from "./type";
import { getRandomBenben } from "./getBenben";
import { z } from "zod";

const allColor = [
  "Gray",
  "Blue",
  "Green",
  "Orange",
  "Red",
  "Cheater",
];

export default function GameInterface({ initialBenben }: { initialBenben: z.infer<typeof BenbenSchema>; }) {
  // const [benben, setBenben] = useState(initialBenben);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [answer, setAnswer] = useState("");
  const [benben, nextBenbenAction, isPendingBenben] = useActionState(async () => {
    return await getRandomBenben();
  }, initialBenben);

  const accuracy = score.total === 0 ? "0" : (score.correct / score.total * 100).toFixed(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const currentAnswer = data.get("answer") as string;
    setAnswer(currentAnswer);
    setScore({ correct: score.correct + (currentAnswer === benben.user.color ? 1 : 0), total: score.total + 1 });
  };

  return (
    <>
      <div>
        {
          isPendingBenben ? <p>加载中……</p> : (
            <>
              <p>{benben.content}</p>
              <form onSubmit={handleSubmit}>
                {
                  allColor.map((c) => (
                    <div key={c}>
                      <label>
                        <input type='radio' name="answer" value={c} disabled={answer !== ""}></input>
                        {c}
                      </label>
                    </div>
                  ))
                }
                <button type="submit">确认</button>
              </form>
            </>
          )
        }
      </div>

      {answer !== "" &&
        <>
          <p>
            你的答案：{answer}，正确答案：{benben.user.color}。
          </p>
          <button onClick={() => {
            setAnswer("");
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
