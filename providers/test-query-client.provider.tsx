"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig,
} from "@tanstack/react-query";
import { ReactNode } from "react";

export const testQueryClient = new QueryClient();

export const TestQueryClientProvider = ({
  children,
  config,
  client,
}: {
  children: ReactNode;
  config?: QueryClientConfig;
  client?: QueryClient;
}) => {
  const queryClient =
    client || (config ? new QueryClient(config) : testQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
