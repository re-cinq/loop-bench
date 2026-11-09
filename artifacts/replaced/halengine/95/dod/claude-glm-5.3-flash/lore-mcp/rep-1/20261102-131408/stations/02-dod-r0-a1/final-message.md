Everything is verified. Final state of the branch `loop-bench/95` (pushed, up to date with upstream, based on current `origin/main` tip `684b294` — no merge needed):

**Triage: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point, a provider whose `sendMessage` throws a non-`Error` drives a turn straight into the `catch` with its `instanceof Error` gate (`src/orchestration/chatOrchestrator.ts:150`).

**Delivered** (commit `f5b59e3`, plus `2a9f138` formatting the dod):
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — new file beside the code, 3 tests: string rejection wraps into `onError` with `cause` (red), plain-object/`undefined` rejections likewise (red), and an `Error` rejection reaches `onError` and the caller as the same instance (deliberately green guard against an always-wrap fix).
- `specs/hal-engine-config-hooks/spec.md` — recorded-flaw section replaced by the new guarantee, each statement carrying a `([validated by ...])` anchor; `check-spec-anchor-names` (604 citations) and `check-spec-links` (0 misplaced) pass.
- `.lore/dod.md` — ticket claim quoted verbatim, strategy, tests, facets (CHANGELOG entry left to the implementing round, as it can only be written with the fix).

**Red bar, run and read against the ticket's claim.** Note the repo's `npm test` script wraps jest in `node --experimental-vm-modules`; plain `npx jest` can't even load the ESM suites here. With the repo's invocation:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts

● calls onError once when the provider rejects with a string, wrapping it as the cause
    - Expected  - 3
    + Received  + 3
        "callerReceived": "provider socket closed mid-stream",
    -   "onErrorCalls": 1,
    +   "onErrorCalls": 0,
    +   "reportedCause": undefined,
    +   "reportedIsError": false,

● calls onError for a plain object and an undefined rejection too, wrapping either as the cause
        "object":    { "onErrorCalls": 0, "reportedCauseIsOriginal": false, "reportedIsError": false },
        "undefined": { "onErrorCalls": 0, "reportedCauseIsOriginal": true,  "reportedIsError": false },

Tests:       2 failed, 1 passed, 3 total
```

Both failures are exactly the reported bypass — `onError` never fires while `callerReceived` still holds the original rejection. The guard test passes on the base today, as the dod records. `src/orchestration/chatOrchestrator.test.ts` is unedited vs main and 26/26 green, and prettier is clean on the changed source and spec files.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}