Done. The red bar is committed and pushed as `ca7b565` on `loop-bench/37`, up to date with its upstream, merging clean against `origin/main`.

## What I did

**Triage: `direct`** — the seam exists (`ToolRegistry.register`/`execute` are public methods; `ajv` resolves from `node_modules`), so the acceptance tests call the real entry point and fail on behaviour.

- **Spec first**: wrote `specs/hal-engine-tool-input-validation/spec.md` — the contract statements the ticket names, each carrying a trailing `([validated by: …](...#Lnn))` citation. Verified with the repo's own gates: `check-spec-anchor-names` (10 citations name the tests they point at), `check-spec-links` (0 misplaced), `check-spec-status --coverage` (0 unlinked testable statements → `Shipped` status is correct per AGENTS.md's coverage rule).
- **Two new test files**, 10 tests, one `expect` each (this repo's `re-lint/max-expects` enforces that):
  - `src/orchestration/tools/registry.acceptance.test.ts` — 9 tests: missing-required rejection (executor count 0), undeclared-key pass-through (`toEqual` pin), wrong-type rejection naming path+type with no value, enum rejection, value redaction in result **and** log lines (captured via the real `setLogger` seam), compile-once across ten executes (instrumenting `Ajv.prototype.compile`), register-time throw naming the tool, per-call schema for function-valued sources, and the `Unknown tool` throw pin.
  - `src/orchestration/chatOrchestrator.acceptance.test.ts` — the tool-loop test: a scripted provider drives a rejected call then a corrected retry through `processMessage`.
- `.lore/dod.md` records the verbatim ticket claim, strategy, test list, and the implementation round's facets (including `ajv` → `dependencies`, docs/README/`.specify` edits, changelog, MINOR bump — prose work that is theirs, not testable as acceptance tests).

**8 fail, 2 pass — and the 2 that pass are deliberate pins the ticket itself demands** (undeclared keys pass through unchanged; `Unknown tool` still throws); they guard the failure modes the ticket warns about (injected defaults/coercion). Quoted failures:

```
● ToolRegistry input validation › rejects a call missing a required property and leaves the executor uninvoked
  -   "executorCalls": 0,
  -   "result": StringMatching /required[\s\S]*location|location[\s\S]*required/,
  +   "executorCalls": 1,
  +   "result": "sunny, 18 degrees",

● ToolRegistry input validation › compiles a static schema once across ten execute calls
  -   "compilationsAtRegister": 1,
  -   "totalCompilations": 1,
  +   "compilationsAtRegister": 0,
  +   "totalCompilations": 0,

● ToolRegistry input validation › throws at register naming the tool when the schema cannot compile
  Received function did not throw

● Tool rejection in the orchestrator loop › returns a rejected tool call to the provider and resolves on the corrected retry
  +   "executorCalls": 2,
      "resultsSeenOnSecondRound": Array [
  -     StringMatching /required[\s\S]*location|location[\s\S]*required/,
  +     "sunny in Berlin",

Tests:       8 failed, 2 passed, 10 total
```

Every red fails because validation is absent — the executor ran when it must not, no rejection text exists — not because of an import or fixture problem.

Run command (named paths): `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts` — CI's Test step in `.github/workflows/ci.yml` runs the whole suite including these files on every push.

**Findings for the next pod**: `node_modules/ajv` today is v6 pulled transitively by jest — the ticket's `dependencies` addition is still owed, and my tests are written to typecheck against either major. The compile-once test instruments `Ajv.prototype.compile`, so the registry must route schema compilation through ajv's compile/validate path (noted in the DoD). Prettier was run over all four changed files; lint/typecheck were left to CI as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}