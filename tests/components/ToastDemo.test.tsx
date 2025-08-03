import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import { Toaster } from "react-hot-toast";
import userEvent from "@testing-library/user-event";
import React from 'react'; 
import { describe, expect, it } from "vitest";

describe("ToastDemo", () => {
  it('should render a toast', async () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);

    const toast = await screen.findByText(/success/i);
    expect(toast).toBeInTheDocument();
  })
});
