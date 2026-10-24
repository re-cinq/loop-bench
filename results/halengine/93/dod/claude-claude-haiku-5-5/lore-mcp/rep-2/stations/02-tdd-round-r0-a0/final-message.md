Branch is pushed and up to date.

**Round summary:**

- **Facet closed:** Accumulate usage across every provider call in `processMessageStream` — `accumulateUsage(accumulated, round)` added to `orchestratorHelpers.ts`, imported and called in `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage`.
- **Tests written:** 1 unit test (`adds token counts from two reported usages`) in `orchestratorHelpers.test.ts`. All 5 helper tests green; all 24 chatOrchestrator tests green (no regressions — `keeps the usage an earlier round reported when a later round reports none` passes because `accumulateUsage(x, undefined) === x`).
- **Future improvement noted (out of scope):** The spec bullet in `specs/hal-engine-config-hooks/spec.md` still reads "most recent round's usage, not a sum" — that is facet 3 to update. The type rename (facet 2) and CHANGELOG entry (facet 4) are also still open.

**Next facet:** Make the type say it is a sum — rename the hook's third parameter type so a reader knows it is a total without opening the orchestrator.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all provider calls per turn (accumulateUsage helper + orchestrator wiring)","tdd_next":"rename the afterModelResponse usage parameter type to signal it is a turn total, not a per-round value"}}