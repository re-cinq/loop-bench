The deliverable for this ticket is already committed and pushed on `loop-bench/37` (commit `d1942b1`, one commit ahead of `origin/main`, branch in sync with its upstream) — this run verified it end to end rather than redoing it.

**What's in place**

- **`.lore/dod.md`** — strategy `direct`: the seam exists (`ToolRegistry.execute`/`register` are public), quoting the ticket's central claim verbatim, ten checkboxes, facets, out-of-scope, and notes for the next pod.
- **`specs/hal-engine-tool-input-validation/spec.md`** — the ticket's statements written before the tests, each carrying an inline `([validated by ...])` link.
- **`src/orchestration/tools/registry.acceptance.test.ts`** (9 tests) and **`src/orchestration/chatOrchestrator.acceptance.test.ts`** (1 test) — new files beside the code, no production code touched. `src/orchestration/tools/registry.ts` is unchanged: no validation, no `ajv`.

**The red bar, actually run** — `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts` → **Tests: 9 failed, 1 passed, 10 total**. Every red test fails because the behaviour is absent, not an import or fixture problem — the executor runs and answers where a rejection was required:

```
● ToolRegistry input validation › answers a missing required property with a rejection naming it and never calls the executor
    Expected pattern: /location/
    Received string:  "executor ran"
      39 |     const rejected = await registry.execute('weather', {});
    > 41 |     expect(rejected.result).toMatch(/location/);
```

```
● ToolRegistry input validation › throws at register time for an uncompilable schema, naming the tool
    Expected pattern: /broken-tool/
    Received function did not throw
```

```
● ToolRegistry input validation › serves ten execute calls from the schema compiled at register without reading the schema again
    Expected: > 0   Received:   0        // schema never read at register
```

```
● tool input validation in the orchestrator loop › carries a rejected tool call back to the model as a tool result and resolves on the corrected retry
    Expected pattern: /location/
    Received string:  "sunny in Lisbon, 21C"
```

The one green test is the ticket's pinned unchanged behaviour (`execute` still throws `Unknown tool: no-such-tool`). Every test's failure maps to the ticket's own acceptance criteria; none redefines it. Repo checkers confirm the commit is CI-sane: `check-spec-links.mjs` → `misplaced: 0 across 0 specs (1391 statements scanned)`, `check-spec-anchor-names.mjs` → 404 citations name their tests; prettier passes on the changed `.ts` files (markdown is outside the repo's `prettier:check` scope — committed specs fail the ad-hoc check too). No merge work needed: `origin/main` is at `HEAD~1`.

One finding for the implementation round, already noted in the dod: the ticket names `src/orchestration/tools/registry.test.ts` as its own round's test file — the pod contract puts acceptance tests in `.acceptance.test.ts` files, so that named file is still the implementation round's to write alongside the fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}