"use client";

import { FormEventHandler, useState } from "react";
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
  const [benben, setBenben] = useState(initialBenben);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [answer, setAnswer] = useState("");

  const accuracy = score.total === 0 ? "0" : (score.correct / score.total * 100).toFixed(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const currentAnswer = data.get("answer") as string;
    setAnswer(currentAnswer);
    setScore({correct: score.correct + (currentAnswer === benben.user.color ? 1 : 0), total: score.total + 1});
  };

  const nextBenben = async () => {
    setAnswer("");
    setBenben(await getRandomBenben());
  };

  return (
    <>
      <p>{benben.content}</p>
      <p>猜測作者名字顏色</p>
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
        <button type="submit">確認</button>
      </form>

      {answer !== "" && 
        <>
        <p>
          你的答案：{answer}，正確答案：{benben.user.color}。
        </p>
        <button onClick={nextBenben}>下一題</button>
        </>
      }

      <p>準確度：{accuracy}%</p>
    </>
  );
}
