"use client";

import AnimatedNumber from "@components/AnimatedNumber";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import React from "react";
import { expressionAtom } from "./state/expression-state";

function DisplayExpression() {
  const data = useAtomValue(expressionAtom);
  console.log(data);

  return (
    <h1
      className={clsx(
        "dark:text-white flex font-mono tabular-nums items-center gap-x-4 space-x-2 justify-center text-slate-900 font-bold text-5xl",
        {
          "animate-pulse": data.loading,
        }
      )}
    >
      {(data.loading || !data.expression) && "* * * * *"}

      {!data.loading &&
        data.expression &&
        data.expression
          .split(" ")
          .map((n, idx) =>
            n === "*" ? (
              <span key={idx}>*</span>
            ) : isNaN(parseInt(n)) ? (
              <span>{n}</span>
            ) : (
              <AnimatedNumber key={idx} value={parseInt(n)} />
            )
          )}
    </h1>
  );
}

export default DisplayExpression;
