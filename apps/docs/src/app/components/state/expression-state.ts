import { atom } from "jotai";

export const expressionAtom = atom<
  { expression?: string; loading: false } | { loading: true }
>({ loading: false });
