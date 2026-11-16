Branch is current. Here's a summary of what was committed and the actual failure output.

---

**Strategy: `direct`** — `ToolRegistry.execute` already exists as a callable seam; no production code needed to write the acceptance tests.

**3 acceptance tests committed** in two new files:

`src/orchestration/tools/registry.acceptance.test.ts`:
1. **`returns a ToolResponse naming the missing required field and never calls the executor`** — fails because `callCount: 1` (executor IS called) and `namesMissingField: false` (result is `'sunny'` from executor, not a validation error)
2. **`never includes the offending value in the returned ToolResponse`** — fails because `isValidationFailure: false` (executor runs and returns `'found'`; no validation happens)

`src/orchestration/chatOrchestrator.acceptance.test.ts`:
3. **`resolves processMessage when a corrected call follows a rejected one, with rejection text visible to the provider`** — fails because `rejectionMentionsLocation: false` (the round-2 tool result contains `"weather in undefined"` from the executor, not a validation rejection naming `location`)

All three fail because validation is **absent** — the registry calls the executor on any input, as the logs confirm (`"executing"` appears for every call). The `specs/hal-engine-tool-input-validation/spec.md` spec was created with citations for these tests, and `.lore/dod.md` records the strategy and facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}