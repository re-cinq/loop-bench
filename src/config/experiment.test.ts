import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { plannedLoops } from "../core/matrix.js";
import { loadExperiment } from "./experiment.js";

describe("experiments/halengine.yaml", () => {
  it("parses with 5 tickets, 15 model variants per station, 2 dod prompt variants and 5 replicates", () => {
    const config = loadExperiment(join(import.meta.dirname, "../../experiments/halengine.yaml"));

    expect(config.tickets.map((ticket) => ticket.number)).toEqual([93, 94, 95, 37, 89]);
    expect(config.variants.dod).toHaveLength(15);
    expect(config.replicates).toBe(5);
    expect(plannedLoops(config)).toHaveLength(5 * 2 * (1 + 15 + 16 + 16 + 2) * 5);
  });
});
