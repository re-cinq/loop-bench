Branch is up to date. The round is complete.

**What changed**: Added `accumulateUsage` to `orchestratorHelpers.ts`, tested it with 4 unit tests in `orchestratorHelpers.test.ts`, and wired it into `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = accumulateUsage(lastUsage, outcome.usage)`.

**Smells noticed but not touched**: The `specs/hal-engine-config-hooks/spec.md` line 28 still records the old under-counting behavior — that's facet 3 ("Update spec..."). The CHANGELOG entry (facet 4) and the type-signature clarification (facet 2) are also untouched — those are next rounds' work.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across all rounds in the tool loop","tdd_next":"Update OrchestratorHooks.afterModelResponse type signature to clarify usage is summed/accumulated"}}