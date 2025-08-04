import { render, screen } from "@testing-library/react";
import { MemoryRouter, useRoutes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import routes from "../src/route";
import React from "react";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

vi.mock("../src/hooks/useProduct", () => ({
  __esModule: true,
  default: (id: number) => ({
    data: { name: "Test Product", price: 99.99 },
    isLoading: false,
    error: null,
  }),
}));

describe("App routing", () => {
  it("renders the home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    // screen.debug()
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it("renders the playground page", () => {
    render(
      <MemoryRouter initialEntries={["/playground"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/playground/i)).toBeInTheDocument();
  });

  it("renders the product detail page with mock data", () => {
    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /test product/i })
    ).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("renders the new admin product page", () => {
    render(
      <MemoryRouter initialEntries={["/admin/products/new"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/new product/i)).toBeInTheDocument();
  });

  it("renders the 404 error page for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    screen.debug()
    expect(
      screen.getByText(/the requested page was not found/i)
    ).toBeInTheDocument();
  });
});
