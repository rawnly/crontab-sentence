"use client";

import Button from "@components/base/button";
import { Input } from "@components/base/input";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Payload, Response } from "../api/generate/types";
import { expressionAtom } from "./state/expression-state";
import { PROMPTS } from "@/lib/costants";
import { useCallback } from "react";
import { randomElement } from "@lib/util";

function AskGPTForm() {
  const [expression, setExpression] = useAtom(expressionAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty },
  } = useForm<Payload>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  async function onSubmit(payload: Payload) {
    setExpression({ loading: true });

    const res = await fetch("./api/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const body = await res.json();
    const parsedBody = Response.safeParse(body);

    if (!parsedBody.success || !res.ok) {
      toast.error("Something went wrong.");
      setExpression({ loading: false });
      return;
    }

    const { expression } = parsedBody.data;
    setExpression({
      expression,
      loading: false,
    });
  }

  const getRandom = useCallback(() => {
    setValue("prompt", randomElement(PROMPTS).prompt);
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, console.error)}
      className="mt-10 flex items-start justify-center gap-4"
    >
      <div className="w-full flex items-start gap-1 justify-start flex-col">
        <Input
          {...register("prompt", { required: "true", minLength: 5 })}
          type="text"
          spellCheck={false}
          autoComplete="off"
          placeholder="Every 3 months on 18th at 4am"
        />
        <small className="small:text-slate-200/75 text-slate-500/75">
          Try a{" "}
          <button
            className="underline hover:opacity-80 active:opacity-50"
            type="button"
            onClick={getRandom}
          >
            random prompt
          </button>
        </small>
      </div>
      <Button
        loading={expression.loading || isSubmitting}
        disabled={isSubmitting || !isDirty}
        type="submit"
      >
        Generate
      </Button>
    </form>
  );
}

export default AskGPTForm;
