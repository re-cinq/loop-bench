import { describe, expect, it } from "vitest";
import { agreementSummaryText, buildSetups, colourOf, extremesText, formatMinutes, formatMoney, knowledgeBaseText, modelPairAgreement, orderModels, pairsText, setupWords, squareOf, ticketAgreement, ticketColumns, ticketSentence, type GridRun } from "../../site/js/grid-model.js";

const run = (model: string, ticket: number, success: boolean, over: Partial<GridRun> = {}): GridRun => ({ task: "tdd-round", harness: "claude", model, knowledgeBase: "none", ticket, size: ticket === 144 ? "large" : "small", success, costUsd: 1, minutes: 10, correctness: 4, completeness: 4, closeness: 4, ...over });
const runsOf = (model: string, ticket: number, outcomes: boolean[], over: Partial<GridRun> = {}) => outcomes.map((success) => run(model, ticket, success, over));
const tickets = [{ ticket: 93, size: "small" }, { ticket: 144, size: "large" }];

describe("ticketColumns", () => {
  it("orders small before medium before large, then by number", () => {
    const runs = [run("a", 144, true), run("a", 37, true, { size: "medium" }), run("a", 95, true), run("a", 93, true)];
    expect(ticketColumns(runs)).toEqual([{ ticket: 93, size: "small" }, { ticket: 95, size: "small" }, { ticket: 37, size: "medium" }, { ticket: 144, size: "large" }]);
  });
});

describe("buildSetups", () => {
  it("counts runs and successes, takes the median of known costs and flags fewer than 5 runs", () => {
    const runs = [run("a", 93, true, { costUsd: 1 }), run("a", 93, false, { costUsd: 3 }), run("a", 93, true, { costUsd: null })];
    expect(buildSetups(runs)).toMatchObject([{ modelKey: "claude/a", runs: 3, successes: 2, cost: 2, costUnknownRuns: 1, few: true }]);
  });

  it("is not few with 5 runs", () => {
    expect(buildSetups(runsOf("a", 93, [true, true, true, true, false]))[0]).toMatchObject({ few: false, share: 0.8 });
  });
});

describe("squareOf", () => {
  const [setup] = buildSetups(runsOf("a", 93, [true, true, true, true, false], { costUsd: 0.4, minutes: 16 }));
  it.each([["works", "4/5", 0.8], ["price", "$0.40", 0.5], ["time", "16m", 0.31]])("labels %s as %s", (measure, text, goodness) => {
    const square = squareOf(measure as "works", setup!);
    expect(square?.text).toBe(text);
    expect(square?.goodness).toBeCloseTo(goodness, 1);
  });

  it("is null when every cost is unknown", () => {
    const [unknown] = buildSetups(runsOf("a", 93, [true], { costUsd: null }));
    expect(squareOf("price", unknown!)).toBeNull();
  });

  it("scores cheap as better than dear", () => {
    const [cheap] = buildSetups(runsOf("a", 93, [true], { costUsd: 0.01 }));
    const [dear] = buildSetups(runsOf("a", 93, [true], { costUsd: 9 }));
    expect([squareOf("price", cheap!)?.goodness, squareOf("price", dear!)?.goodness]).toEqual([1, 0]);
  });
});

describe("formatters", () => {
  it.each([[0.004, "<$0.01"], [0.4, "$0.40"], [12.6, "$13"]])("formats %s as %s", (value, text) => expect(formatMoney(value)).toBe(text));
  it.each([[0.5, "<1m"], [16.2, "16m"]])("formats %s minutes as %s", (value, text) => expect(formatMinutes(value)).toBe(text));
});

describe("colourOf", () => {
  it("is orange at 0 with white text and blue at 1 with white text", () => {
    expect([colourOf(0), colourOf(1)]).toEqual([{ background: "rgb(179, 71, 0)", text: "#ffffff" }, { background: "rgb(31, 95, 168)", text: "#ffffff" }]);
  });

  it("is pale at 0.5 with dark text", () => {
    expect(colourOf(0.5)).toEqual({ background: "rgb(247, 240, 225)", text: "#000000" });
  });
});

describe("colourOf contrast", () => {
  const channel = (value: number) => { const unit = value / 255; return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4; };
  const luminance = (rgb: number[]) => 0.2126 * channel(rgb[0]!) + 0.7152 * channel(rgb[1]!) + 0.0722 * channel(rgb[2]!);
  const contrastAt = (goodness: number) => {
    const { background, text } = colourOf(goodness);
    const [back, front] = [luminance(background.match(/\d+/g)!.map(Number)), text === "#ffffff" ? 1 : 0];
    return (Math.max(back, front) + 0.05) / (Math.min(back, front) + 0.05);
  };

  it("keeps text at least 4.5 to 1 against the square at every step of the scale", () => {
    const steps = Array.from({ length: 101 }, (_, step) => step / 100);
    expect(Math.min(...steps.map(contrastAt))).toBeGreaterThanOrEqual(4.5);
  });
});

describe("orderModels", () => {
  const setups = buildSetups([...runsOf("flaky", 93, [true, false]), ...runsOf("steady", 93, [true, true]), ...runsOf("dear", 93, [true], { costUsd: 5 })]);
  it("puts the model that works most first", () => {
    expect(orderModels("works", setups).map((entry) => entry.model)).toEqual(["dear", "steady", "flaky"]);
  });

  it("puts the cheapest model first on price", () => {
    expect(orderModels("price", setups).map((entry) => entry.model)).toEqual(["flaky", "steady", "dear"]);
  });

  it("puts a model that skipped a ticket after every fully tested model however well it works", () => {
    const withSkipper = buildSetups([...runsOf("full", 93, [true, false]), ...runsOf("full", 144, [false, false]), ...runsOf("skip", 93, [true, true])]);
    expect(orderModels("works", withSkipper).map((entry) => [entry.model, entry.missing])).toEqual([["full", []], ["skip", [144]]]);
  });

  it("shows the same percentage as the model's ticket-averaged success rate", () => {
    const mixed = buildSetups([...runsOf("a", 93, [true, true, true, true, true, true, true, true]), ...runsOf("a", 144, [false]), ...runsOf("a", 93, [false], { knowledgeBase: "lore-mcp" })]);
    expect(orderModels("works", mixed)[0]?.average).toBeCloseTo((8 / 9 + 0) / 2);
  });

  it("ranks by the average over tickets, not over runs", () => {
    const mixed = buildSetups([...runsOf("a", 93, [true, true, true, true, true, true, true, true]), ...runsOf("a", 144, [false]), ...runsOf("b", 93, [true]), ...runsOf("b", 144, [true, true, false, false, false])]);
    const [best] = orderModels("works", mixed);
    expect(best).toMatchObject({ model: "b", average: 0.7 });
  });
});

describe("setupWords", () => {
  it("states runs, cost, time and reviewer score, and warns on few runs", () => {
    const [setup] = buildSetups(runsOf("a", 144, [true, false], { costUsd: 0.4, minutes: 16, knowledgeBase: "lore-mcp" }));
    expect(setupWords(setup!, { task: "tdd-round", measureKey: "works" })).toBe("a on ticket 144 (large) with the Lore knowledge base: 1 of 2 runs work (50%); usual cost $0.40; usual time about 16 minutes; AI reviewer score 4.0 of 5. Only 2 runs, so treat this as a hint.");
  });

  it("leaves the reviewer score out when writing the tests", () => {
    const [setup] = buildSetups(runsOf("a", 93, [true]));
    expect(setupWords(setup!, { task: "dod", measureKey: "works" })).not.toMatch(/reviewer/);
  });
});

describe("extremesText", () => {
  const names = ["m1", "m2", "m3", "m4", "m5", "m6", "m7"];
  const runs = names.flatMap((name, index) => [...runsOf(name, 93, Array.from({ length: 5 }, (_, i) => i < 5 - index)), ...runsOf(name, 144, [true])]);
  const skipper = runsOf("skip", 93, [true, true]);

  it("lists the three strongest and three weakest and names the model that skipped a ticket", () => {
    expect(extremesText({ measureKey: "works", setups: buildSetups([...runs, ...skipper]), tickets })).toEqual({
      strongest: ["m1 works in 100% of runs, with every ticket counting equally.", "m2 works in 90% of runs, with every ticket counting equally.", "m3 works in 80% of runs, with every ticket counting equally."],
      weakest: ["m7 works in 50% of runs, with every ticket counting equally.", "m6 works in 50% of runs, with every ticket counting equally.", "m5 works in 60% of runs, with every ticket counting equally."],
      skipped: ["skip was not run on the large ticket, so it is not ranked."],
    });
  });

  it("words the price extreme as a cost per run", () => {
    const { strongest } = extremesText({ measureKey: "price", setups: buildSetups([...runsOf("cheap", 93, [true], { costUsd: 0.4 }), ...runsOf("cheap", 144, [true], { costUsd: 0.4 })]), tickets });
    expect(strongest).toEqual(["cheap costs about $0.40 for a usual run."]);
  });
});

describe("ticket agreement", () => {
  const setups = buildSetups([...runsOf("a", 93, [true, true]), ...runsOf("b", 93, [false, false]), ...runsOf("c", 93, [true, false]), ...runsOf("a", 144, [true]), ...runsOf("b", 144, [true])]);
  const agreements = ticketAgreement({ setups, tickets });

  it("counts models that always, never or sometimes work per ticket", () => {
    expect(agreements).toEqual([{ ticket: 93, size: "small", models: 3, always: 1, never: 1, mixed: 1 }, { ticket: 144, size: "large", models: 2, always: 2, never: 0, mixed: 0 }]);
  });

  it("writes the per ticket sentence", () => {
    expect(agreements.map(ticketSentence)).toEqual(["Ticket 93 (small): 1 of 3 models work in every run, 1 never do, 1 work in some runs and not in others.", "Ticket 144 (large): 2 of 2 models work in every run, 0 never do."]);
  });

  it("names the tickets every model handles and the tickets that split the models", () => {
    expect(agreementSummaryText(agreements)).toEqual([
      "Every model works in every run on ticket 144 (large).",
      "Every ticket has at least one model that works in every run.",
      "The models split on ticket 93 (small): some always work, some never do.",
    ]);
  });

  it("says no model works reliably on a ticket nobody always solves", () => {
    const hard = ticketAgreement({ setups: buildSetups(runsOf("a", 93, [false, true])), tickets: [tickets[0]!] });
    expect(agreementSummaryText(hard)[1]).toBe("No model works in every run on ticket 93 (small).");
  });
});

describe("modelPairAgreement", () => {
  const sixTickets = [1, 2, 3, 4, 5, 6];
  const outcomesOf = (model: string, pattern: boolean[]) => sixTickets.flatMap((ticket, index) => runsOf(model, ticket, [pattern[index]!], { size: "small" }));
  const setups = buildSetups([
    ...outcomesOf("x", [true, true, true, false, false, false]),
    ...outcomesOf("y", [true, true, true, false, false, true]),
    ...outcomesOf("z", [false, false, false, true, true, true]),
  ]);

  it("measures the share of shared setups with the same result", () => {
    expect(modelPairAgreement(setups)).toEqual([
      { first: "x", second: "y", shared: 6, same: 5, share: 5 / 6 },
      { first: "x", second: "z", shared: 6, same: 0, share: 0 },
      { first: "y", second: "z", shared: 6, same: 1, share: 1 / 6 },
    ]);
  });

  it("ignores pairs with fewer than 6 shared setups", () => {
    expect(modelPairAgreement(buildSetups([...runsOf("x", 1, [true]), ...runsOf("y", 1, [true])]))).toEqual([]);
  });

  it("lists the most alike and most different pairs in words", () => {
    expect(pairsText(modelPairAgreement(setups))).toMatchObject({
      alike: ["x and y reach the same result in 5 of 6 setups (83%).", "y and z reach the same result in 1 of 6 setups (17%).", "x and z reach the same result in 0 of 6 setups (0%)."],
      different: ["x and z reach the same result in 0 of 6 setups (0%).", "y and z reach the same result in 1 of 6 setups (17%).", "x and y reach the same result in 5 of 6 setups (83%)."],
    });
  });
});

describe("knowledgeBaseText", () => {
  const withKb = (knowledgeBase: string, outcomes: boolean[]) => runsOf("a", 93, outcomes, { knowledgeBase });

  it("compares the three knowledge bases on setups that ran with all three", () => {
    const setups = buildSetups([...withKb("none", [true, false]), ...withKb("lore-mcp", [true, true]), ...withKb("lore-utopia", [false, false])]);
    expect(knowledgeBaseText({ measureKey: "works", setups })).toEqual([
      "Across 1 setup (a model on a ticket) that ran with all three, the share of runs that work averages 50% with no knowledge base, 100% with Lore and 0% with Utopia.",
      "Lore did better than none in 1, worse in 0 and about the same in 0; Utopia did better than none in 0, worse in 1 and about the same in 0. Lore rests on fewer than 5 runs in 1 of those 1, so read it as a hint.",
    ]);
  });

  it("says they cannot be compared when no setup has all three", () => {
    expect(knowledgeBaseText({ measureKey: "works", setups: buildSetups(withKb("none", [true])) })).toEqual(["No model ran the same ticket with all three knowledge bases, so they cannot be compared yet."]);
  });
});
