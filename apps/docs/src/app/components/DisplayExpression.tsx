"use client";

import clsx from "clsx";
import { useAtomValue } from "jotai";
import { expressionAtom } from "./state/expression-state";

function DisplayExpression() {
  const data = useAtomValue(expressionAtom);

  return (
    <h1
      className={clsx(
        "font-mono dark:text-white text-slate-900 font-bold text-5xl",
        {
          "animate-pulse": data.loading,
        }
      )}
    >
      {data.loading || !data.expression ? "* * * * *" : data.expression}
    </h1>
  );
}

export default DisplayExpression;
