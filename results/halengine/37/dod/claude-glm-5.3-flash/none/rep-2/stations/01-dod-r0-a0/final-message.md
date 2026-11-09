Done. Branch pushed and in sync with its upstream; `origin/main` has nothing the branch lacks (0 behind, no merge needed).

## What I did

**Triage: `direct`** — the seam already exists (`ToolRegistry.register`/`execute`, `createChatOrchestrator().processMessage`). Six tests are red today for exactly the ticket's stated reason; two are pins of behaviour the ticket itself declares unchanged/invariant.

**New files** (commit `70bb08d`, pushed to `loop-bench/37`):
- `src/orchestration/tools/registry.acceptance.test.ts` — 8 tests, one `expect` each (repo's `max-expects` rule), no mocks: real registry, real orchestrator, stub `AIProvider` per the existing test idiom, log capture via the package's own `setLogger` seam.
- `specs/hal-engine-tool-input-validation/spec.md` — the contract statements, each carrying the inline `([validated by: …](…#Lnn))` citation (10 citations, all verified by the repo's own `check-spec-anchor-names` / `check-spec-links` / `check-spec-status`, all green). Status `In Progress` — derived from partial citation coverage; no existing spec's Status was touched.
- `.lore/dod.md` — claim quoted verbatim, strategy, test list, facets owed (ajv in `dependencies`, docs, changelog, MINOR bump), out-of-scope list.

## The red bar (actual output, run: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`)

```
● ToolRegistry input validation (acceptance) › rejects input missing a required property, names the requirement, and never calls the executor

    - Expected  - 3
    + Received  + 3
      Object {
    -   "executorCalls": 0,
    -   "namesProperty": StringContaining "location",
    -   "namesRequirement": StringContaining "required",
    +   "executorCalls": 1,
    +   "namesProperty": "18C and partly cloudy",
    +   "namesRequirement": "18C and partly cloudy",
      }
```
That is the ticket's claim verbatim in numbers: the executor runs on a malformed call and answers with a forecast. Same shape for the other five:
- *wrong-typed field*: executor called, message names neither `location` nor `string`
- *register-time compile*: `Expected substring: "weather_with_broken_schema" / Received function did not throw`
- *function-valued per-call schema*: `executorCalls: 2` (second call ran against the stale contract), no `bookingReference` in the result
- *compile once at register*: `"compiledAtRegister": false` (schema never consumed at all)
- *tool loop*: `"rejectionVisibleOnRetryRound": false` — the provider never sees rejection text; today a malformed call just executes

Green by construction, per the ticket's own wording: *pass-through unchanged, exactly once* and *still throws Unknown tool* — invariants validation must not break.

One note for review: the compile-once test probes a counting getter on the schema object — there is no black-box way to count validator compiles, and the ticket demands that test; it is recorded in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}