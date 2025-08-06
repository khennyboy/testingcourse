import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it
} from "vitest";
import React from "react";
import routes from "../src/route";
import { db } from "./mocks/db";
import { mockAuthState } from "./setup";

describe("App routing", () => {
  const renderRoute = (path: string) => {
    const router = createMemoryRouter(routes, {
      initialEntries: [path],
    });

    render(<RouterProvider router={router} />);
  };

  beforeEach(() => {
    mockAuthState({
      isAuthenticated: true,
      isLoading: false,
      user: { name: "Mosh" },
    });
  });
  afterEach(() => {
    db.product.deleteMany({ where: {} });
  });
  
  it("renders the home page", () => {
    renderRoute("/");
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it("renders the playground page", () => {
    renderRoute("/playground");
    expect(screen.getByText(/playground/i)).toBeInTheDocument();
  });

  it("renders the product detail page with mock data", async () => {
    const product = db.product.create();
    renderRoute(`/products/${product.id}`);
    expect(
      await screen.findByRole("heading", { name: product.name })
    ).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
  });

  it("renders the new admin product page", () => {
    renderRoute("/admin/products/new");
    expect(screen.getByText(/new product/i)).toBeInTheDocument();
  });

  it("renders the 404 error page for unknown routes", () => {
    renderRoute("/not-found");
    expect(
      screen.getByText(/the requested page was not found/i)
    ).toBeInTheDocument();
  });
});
