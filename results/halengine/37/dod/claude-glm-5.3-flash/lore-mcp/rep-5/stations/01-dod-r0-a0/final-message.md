Done. Branch `loop-bench/37` pushed (`3e89379`), up to date with `origin/main`, working tree clean.

## What this ticket owed and how I cut it

**Triage: `direct`** — the seam exists (`ToolRegistry.execute` is a real entry point) and the behaviour is absent, so the acceptance tests fail today on exactly the reported problem. Quoted in `.lore/dod.md` verbatim: *"ToolRegistry.execute looks a tool up, logs the input's key names, and calls the executor without ever checking the declared inputSchema."*

Deliverables (all in one commit):
- **`src/orchestration/tools/registry.acceptance.test.ts`** — 5 tests beside `registry.ts`
- **`src/orchestration/chatOrchestrator.acceptance.test.ts`** — 1 test: the end-to-end tool-loop claim (rejected call → rejection text as a `tool_result` → corrected retry → `processMessage` resolves)
- **`specs/hal-engine-tool-input-validation/spec.md`** — new spec carrying the full contract; all 6 tests cited, verified with the repo's own gates: `check-spec-anchor-names` (6/6 name the test they point at), `check-spec-links` (0 misplaced, 17 statements), `check-spec-status` (0 findings)
- **`.lore/dod.md`** — strategy, test list, implementation facets, one seam gap

## The red bar, actual output

```
● ToolRegistry input validation › rejects a call missing a required property before the executor runs
    expect(received).toHaveLength(expected)
    Expected length: 0
    Received length: 1
    Received array:  [{}]
● ToolRegistry input validation › names the failing path and constraint, never the value, in the result and the logs
    Expected length: 0
    Received length: 1
    Received array:  [{"location": 42}]
● ToolRegistry input validation › throws at registration when a static schema cannot compile, naming the tool
    Expected pattern: /broken_tool/
    Received function did not throw
● ToolRegistry input validation › validates a function-valued definition against the schema current at each call
    + Object { "location": "Paris" }        // second, unvalidated call
● ChatOrchestrator tool input validation › feeds a rejected tool call back to the model as a tool result and completes on the corrected retry
    + Object {},                            // the malformed call reached the executor
      Object { "location": "Paris" },

Test Suites: 2 failed, 2 total
Tests:       5 failed, 1 passed, 6 total
```

Every failure is the ticket's own claim: the malformed call reaches the executor and answers. The 1 pass is deliberate and flagged in the dod — `passes schema-valid input through to the executor unchanged, exactly once` is the `toEqual` guard against over-implementation (no defaults, coercion, or `additionalProperties: false`); it is green by characterization and must stay green through the change. Command run: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts` — I ran only these two files, plus Prettier on them.

## Findings for the next round (in the dod's facets, not silent)

- `.specify/spec.md:29` currently states the schema "is NOT enforced before the executor runs" — this ticket makes that sentence false; it must be rewritten, not just appended to.
- The weather example's warning comment lives inside `#region weather-tool` in `example/weather-tool.ts` and is transcribed into `docs/adding-a-tool.md` via a doc-block — the `check-doc-blocks` gate means any doc edit must flow through the example source, not the markdown.
- Seam gap: "static schema compiled once across ten `execute` calls" has no observable seam without instrumenting the validator module (a double — out of bounds here) or new public surface; the compile-count assertion is left to the implementation round's `registry.test.ts`, where the ticket places it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}