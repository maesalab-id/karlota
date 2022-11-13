import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { router } from "./Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ClientProvider } from "components/client";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ClientProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withNormalizeCSS>
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </ClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
