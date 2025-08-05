import { render, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";
import React from "react";
import { describe, expect, it } from "vitest";

describe("TagList", () => {
  it("should render tags", () => {
    render(<TagList />);
    screen.debug()
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
