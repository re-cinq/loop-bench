Committed and pushed (`9485e3e`), branch up to date with `origin/loop-bench/37` and a no-op merge from `origin/main`.

## What I did

**Triage: `direct`** — the seam exists today (`ToolRegistry.register`/`execute`, `createChatOrchestrator().processMessage`), so the acceptance tests call the real entry points and fail on the absent behaviour.

Three files, committed:
- **`src/orchestration/tools/toolInputValidation.acceptance.test.ts`** — 7 tests. **5 red** for the ticket's stated reason (no validation happens); **2 pins green by design** that the ticket itself mandates (verbatim pass-through with extra properties, and the unchanged `Unknown tool:` throw) — they guard the boundary the implementation must not cross.
- **`specs/hal-engine-tool-input-validation/spec.md`** — new spec (the ticket requires this exact path); 7 statements cite the tests, 2 left uncited on purpose (enum-only enforcement, compile-once across calls) so `Status: In Progress` stays honest and the next round cites them from `registry.test.ts`. Anchors hand-placed post-prettier; `node scripts/repoint-spec-anchors.mjs` reports 404 existing anchors up to date and correctly skips the new spec (absent from base).
- **`.lore/dod.md`** — claim verbatim, strategy, test list, and the remaining facets (validator in `dependencies`, `registry.test.ts` assignments, docs/README/`.specify`/CHANGELOG, MINOR bump, migration note in PR body).

## Red bar (quoted from the run)

`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/toolInputValidation.acceptance.test.ts` → `Tests: 5 failed, 2 passed, 7 total`

```
● ToolRegistry input validation › rejects a call missing a required property before the executor runs
    - Expected  - 2
    + Received  + 2
    -   "executorCalls": 0,
    -   "namesProperty": true,
    +   "executorCalls": 1,
    +   "namesProperty": false,
```
```
● ToolRegistry input validation › rejects a wrong-typed value, naming the path and the expected type but not the value
    -   "executorCalls": 0,
    -   "namesExpectedType": true,
    -   "namesPath": true,
    +   "executorCalls": 1,
    +   "namesExpectedType": false,
    +   "namesPath": false,
```
```
● ToolRegistry input validation › refuses at register time a tool whose schema cannot compile, naming the tool
    -   "namesTool": true,
    -   "threw": true,
    +   "namesTool": false,
    +   "threw": false,
```
```
● ToolRegistry input validation › validates a function-valued definition against the schema current at that call
    -   "executorCalls": 1,
    +   "executorCalls": 2,
    -   "secondRejectedNamingCode": true,
    +   "secondRejectedNamingCode": false,
```
```
● ToolRegistry input validation › feeds a rejected call back to the provider and completes on the corrected retry
    "executorCalls": Array [
    -     Object { "location": "Berlin" },
    +     Object {},
    ],
```

Every failure is the ticket's claim: the executor runs on malformed input, no rejection text exists, a broken schema registers silently, and the loop never sees a legible rejection.

**Findings (not test subjects, for the record):** the redaction guard in the wrong-type test passes today only because `registry.ts:82` logs `inputKeys`, not values — the moment an implementation logs validator params or input, it goes red; and the orchestrator's `throw` path (registry → `Promise.all` → `onError` → generic WebSocket error, no `stream_end`) is exactly what the ticket's tech notes describe, which the loop test pins at the real entry point.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}