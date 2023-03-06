"use client";

import { Provider } from "jotai";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Provider>
        <Toaster position="bottom-left" />
        {children}
      </Provider>
    </ThemeProvider>
  );
}
