// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

// Wagmi + Query Client
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "./lib/wagmi";

// Create Query Client
const queryClient = new QueryClient();

// Mount App
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
