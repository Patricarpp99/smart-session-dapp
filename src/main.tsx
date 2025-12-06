import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import App from "./App";
import "./index.css";
import { wagmiConfig } from "./lib/wagmi";
import { LenisProvider } from "./hooks/useLenis";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <LenisProvider>
          <App />
        </LenisProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
