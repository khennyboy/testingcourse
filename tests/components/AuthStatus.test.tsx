import { render, screen } from "@testing-library/react";
import AuthStatus from "../../src/components/AuthStatus";
import { describe, expect, it } from "vitest";
import React from "react";
import { mockAuthState } from "../setup";

describe("AuthStatus", () => {
  it("renders the loading message", () => {
    mockAuthState({
      isLoading: true,
      isAuthenticated: false,
      user: undefined,
    });

    render(<AuthStatus />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders login button if not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });

    render(<AuthStatus />);
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("renders user name and logout if authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: { name: "Mosh" },
    });

    render(<AuthStatus />);
    expect(screen.getByText(/mosh/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });
});
