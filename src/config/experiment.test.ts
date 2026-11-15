import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { plannedLoops } from "../core/matrix.js";
import { loadExperiment } from "./experiment.js";

describe("experiments/halengine.yaml", () => {
  it("parses with 5 tickets of small, medium and large complexity, 19 to 20 model variants per station, 2 dod prompt variants and 5 replicates", () => {
    const config = loadExperiment(join(import.meta.dirname, "../../experiments/halengine.yaml"));

    expect(config.tickets.map((ticket) => [ticket.number, ticket.complexity])).toEqual([[93, "small"], [94, "small"], [95, "small"], [37, "medium"], [144, "large"]]);
    expect(config.variants.dod).toHaveLength(19);
    expect(config.replicates).toBe(5);
    expect(plannedLoops(config)).toHaveLength(5 * 3 * (1 + 19 + 20 + 20 + 2) * 5);
  });
});
