"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { BenbenWithCompiledContent } from "../type";
import { getRandomBenben } from "./getBenben";
import { LuoguNameColor } from "@/components/LuoguNameColor";
import { LuoguColors, luoguColors } from "@/luogu";
import { Benben } from "@/components/Benben";

const usePrefetchedAction = <T,>(initialData: T | null, action: () => Promise<T>, candidateSize: number = 3): [T | null, () => void] => {
  const [candidate, setCandidate] = useState<T[]>(initialData !== null ? [initialData] : []);
  const [unsolved, setUnsolved] = useState(0);

  // I don't know why Next.js server actions cannot be parallelized.
  useEffect(() => {
    if (candidate.length + unsolved < candidateSize) {
      setUnsolved(unsolved => unsolved + 1);
      action()
        .then((res) => {
          setCandidate(candidate => candidate.concat([res]));
        })
        .finally(() => {
          setUnsolved(unsolved => unsolved - 1);
        });
    }
  }, [candidate, unsolved, candidateSize]);

  const data = candidate.length === 0 ? null : candidate[0];

  const update = () => {
    setCandidate(candidate => candidate.slice(1));
  };

  return [data, update];
};

const GameMain = ({ initialBenben, updateScore }: { initialBenben: BenbenWithCompiledContent, updateScore: (correct: boolean) => void }) => {
  const [answer, setAnswer] = useState<LuoguColors | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [benben, nextBenben] = usePrefetchedAction(initialBenben, getRandomBenben);

  if (benben === null) {
    return (
      <p>加載中……</p>
    );
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setConfirmed(true);
    updateScore(answer === benben.user.color);
  };

  return (
    <div>
      <Benben benben={benben} showDetails={confirmed} />
      <form onSubmit={handleSubmit}>
        {
          luoguColors.map((c) => (
            <div key={c}>
              <label>
                <input type="radio" name="answer" value={c} checked={answer === c || false} onChange={(e) => setAnswer(e.target.value as LuoguColors)}></input>
                <LuoguNameColor color={c}>{c}</LuoguNameColor>
              </label>
            </div>
          ))
        }
        <button type="submit" disabled={confirmed}>确认</button>
      </form>
      {
        (confirmed && answer !== null) &&
        <>
          <p>
            你的答案：<LuoguNameColor color={answer}>{answer}</LuoguNameColor>，正确答案：<LuoguNameColor color={benben.user.color}>{benben.user.color}</LuoguNameColor>。
          </p>
          <button onClick={() => {
            setConfirmed(false);
            nextBenben();
          }}>
            下一题
          </button>
        </>
      }
    </div>
  );
};

export default function GameInterface({ initialBenben }: { initialBenben: BenbenWithCompiledContent }) {
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const accuracy = score.total === 0 ? "0" : (score.correct / score.total * 100).toFixed(0);

  const updateScore = (correct: boolean) => {
    setScore({ correct: score.correct + +correct, total: score.total + 1 });
  };

  return (
    <>
      <GameMain initialBenben={initialBenben} updateScore={updateScore}></GameMain>
      <p>准确度：{accuracy}%</p>
    </>
  );
}
