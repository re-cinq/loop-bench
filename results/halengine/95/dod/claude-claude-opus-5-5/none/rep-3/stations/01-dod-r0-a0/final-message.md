The ticket now has an acceptance test that fails for the reason it reports. It's committed and pushed on `loop-bench/95`, the branch was already up to date with `origin/main`, and `git status` shows nothing unpushed.

**Strategy: `direct`.** The test calls the orchestrator through `createChatOrchestrator(...).processMessage`, with a provider that rejects with a raw value. No mocks were needed.

**New test file:** `src/orchestration/chatOrchestrator.acceptance.test.ts`. It runs one parametrized test three times: with a string, a plain object and `undefined`. Each run checks that:
- `onError` fires exactly once;
- it receives an `Error` whose own `cause` is the raw value;
- the caller still gets the identical original value back.

Running `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/chatOrchestrator.acceptance.test.ts`: all three fail because `onError` never fires (`seen` stays empty), while the caller does get the rejection.
```
    -   "seen": Array [
    -     Object {
    -       "cause": "provider said no",
    -       "hasCause": true,
    -       "isError": true,
    -     },
    -   ],
    +   "seen": Array [],
...
    -       "cause": Object { "code": "E_UPSTREAM", "detail": "quota" },
    ...
    +   "seen": Array [],
...
    -       "cause": undefined,
    -       "hasCause": true,
    ...
    +   "seen": Array [],
Tests:       3 failed, 3 total
```
For `undefined`, the test also requires that `cause` is actually set on the error. Otherwise a wrapper that never set `cause` would also read as `undefined` and pass.

The ticket wants an `Error` rejection to keep reaching `onError` as the same object. The existing tests in `src/orchestration/chatOrchestrator.test.ts` cover that and must stay unedited. They pass today (5 passed, filtered by name to the `onError` tests).

**What I didn't do:**
- **Spec link:** I didn't add a "validated by" link to `specs/hal-engine-config-hooks/spec.md`. The only statement there records the flaw itself. The ticket asks for that line to be replaced with the new guarantee, so the implementation round should write it and link it to this test.
- **Spec anchor:** I didn't stamp one on the test either. This repo's test listing (`scripts/lore-list-tests.mjs`) has no way to carry one.
- **CHANGELOG:** that entry is also left to the implementation round.

Both are listed as tasks in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}