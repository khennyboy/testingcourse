import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "@auth0/auth0-spa-js";
import { HttpResponse, delay, http } from "msw";
import { vi } from "vitest";
import { server } from "./mocks/server";

export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
};

export const simulateError = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.error()));
};
