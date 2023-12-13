"use client";

import * as React from "react";
import { WagmiConfig } from "wagmi";
import { NextUIProvider } from "@nextui-org/react";
import { config } from "./wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <NextUIProvider> {mounted && children}</NextUIProvider>
    </WagmiConfig>
  );
}
