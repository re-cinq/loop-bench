import { beforeEach, describe, expect, it } from "vitest";
import { setTickets, shortTitle, ticketName, ticketTitle } from "../../site/js/tickets.js";

beforeEach(() => setTickets([{ number: 93, title: "Report usage across every tool round, not just the last", size: "small" }]));

describe("shortTitle", () => {
  it("keeps a title that fits", () => {
    expect(shortTitle("Short title", 30)).toBe("Short title");
  });

  it("cuts a long title at a word and adds an ellipsis", () => {
    expect(shortTitle("Report usage across every tool round, not just the last", 30)).toBe("Report usage across every…");
  });
});

describe("ticketName", () => {
  it("gives number, title and size", () => {
    expect(ticketName(93, "small")).toBe("#93 Report usage across every tool round, not just the last (small)");
  });

  it("gives the shortened title when asked", () => {
    expect(ticketName(93, "small", { short: true })).toBe("#93 Report usage across every… (small)");
  });

  it("gives only the number for a ticket without a title", () => {
    expect([ticketName(7), ticketTitle(7)]).toEqual(["#7", null]);
  });
});
