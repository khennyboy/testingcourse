import { render, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";
import React from 'react'; 
import { describe, expect, it } from "vitest";

describe("TagList", () => {
  it("should render tags", async () => {
    render(<TagList />);

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
