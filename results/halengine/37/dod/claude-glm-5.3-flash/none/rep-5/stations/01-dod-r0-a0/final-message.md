Done. Branch `loop-bench/37` is pushed and even with `origin/main` (merge was a no-op, `git status` reports no ahead/behind).

## Triage: `direct`

The seam already exists — `ToolRegistry.register`/`execute` are real public entry points, and the tool-loop test drives the real `createChatOrchestrator().processMessage` with a scripted provider. `ajv` isn't in `dependencies` yet, so every red test fails because the check is absent, not because an import is missing (tests import only modules that exist today).

## What landed (commit `6a81a4d`)

- **`src/orchestration/tools/registry.acceptance.test.ts`** — 8 tests beside the registry. The issue asks the implementation for `registry.test.ts`, so the acceptance harness lives beside it rather than locking the next round out of its own file (same for the orchestrator test).
- **`src/orchestration/chatOrchestrator.acceptance.test.ts`** — 1 tool-loop test: rejected call → corrected retry → answer, `processMessage` resolves.
- **`specs/hal-engine-tool-input-validation/spec.md`** — the contract the tests validate, one `([validated by …])` per statement. Verified with the repo's own gates: `check-spec-anchor-names` (9 citations name the tests they point at), `check-spec-links` (0 misplaced across 12 statements), `check-spec-status` (1 statement deliberately uncited — "enforces required/types/enum only, no opt-out" — keeping `Status: In Progress` honest while red).
- **`.lore/dod.md`** — claim, strategy, 9-test DoD (2 pins already green, marked `[x]`), facets, out-of-scope.

## Red bar — run with

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath \
  src/orchestration/tools/registry.acceptance.test.ts \
  src/orchestration/chatOrchestrator.acceptance.test.ts
```

**Result: `Tests: 7 failed, 2 passed, 9 total`.** Each failure reads against the ticket's claim ("nothing validates what comes back from the model"):

- missing `location`: `"executorCalls": 1, "namesField": false, "namesRequired": false` — expected `0 / true / true`
- wrong type: `"namesPath": false, "namesType": false` — result was the executor's `'sent'`, no rejection exists
- uncompilable schema: `Expected pattern: /broken/ — Received function did not throw`
- function-valued schema: `"firstRejects": false, "secondRejects": false` — neither call rejected
- compile-once: `"executorCalls": 11, "stillRejected": false` — the relaxed schema re-governed validation
- orchestrator loop: `+ Object {}` in `executorInputs` and `"rejectionReachedProvider": false` — the executor ran on `{}` and the provider never saw a rejection

The 2 pins (extra properties pass through `toEqual`, exactly once; `Unknown tool: ghost` still throws) pass today and are marked `[x]` in the dod.

Two things I fixed on the way: the orchestrator test originally captured `params.messages` by reference — the orchestrator mutates that array across rounds, so round 2's *corrected* call leaked into the snapshot and made the rejection assertion vacuous; it now copies the array at round-2 start. And packaging criteria (ajv in `dependencies`, `npm run build && node -e "import('./dist/index.js')"` exiting 0) are not observable through a code entry point from here — they're recorded as dod facets for CI's build and smoke jobs, alongside the doc/README/.specify/CHANGELOG facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}