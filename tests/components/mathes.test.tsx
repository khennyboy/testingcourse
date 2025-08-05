import { describe, it, expect, vi, beforeAll } from "vitest";

describe("matchMedia mock", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, 
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("should always return false for matchMedia().matches", () => {
    const query = "(min-width: 768px)";
    const mediaQueryList = window.matchMedia(query);

    expect(mediaQueryList.matches).toBe(false);
    expect(mediaQueryList.media).toBe(query);
  });
});
