import { setupServer, type SetupServer } from "msw/node";
import { testQueryClient } from "@/providers/test-query-client.provider";
import { handlers } from "./handlers";
import { afterAll, beforeAll, beforeEach } from "vitest";

export const setupMswServerForTests = (): SetupServer => {
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
    testQueryClient.clear();
  });

  afterAll(() => {
    server.close();
  });

  return server;
};
