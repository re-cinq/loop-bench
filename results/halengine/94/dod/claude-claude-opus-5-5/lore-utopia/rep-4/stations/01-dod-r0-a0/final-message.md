I wrote two acceptance tests for #94 and both fail for the reason the ticket gives: when `beforeSession` throws, neither `onError` nor `afterSession` runs. They are committed and pushed to `loop-bench/94`. Merging `origin/main` brought nothing new, and the branch is level with its upstream.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage(session)` is the entry point. A real provider and real hooks drive it, with no mocks.

**Tests** (`src/orchestration/beforeSessionFailure.acceptance.test.ts`):
1. **rejects with the beforeSession error and hands onError that same session and error** — the caller still gets the same error, and `onError` receives the turn's session and that error object.
2. **runs onError then afterSession, and no turn hook, when beforeSession throws** — the hooks fire exactly `beforeSession → onError → afterSession`, and none of the other turn hooks run.

The run (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`) gave:
```
    -   "onErrorError": [Error: allocation failed],
    -   "onErrorSession": Object { ... "sessionId": "s1", ... },
    +   "onErrorError": undefined,
    +   "onErrorSession": undefined,
        "rejection": [Error: allocation failed],
...
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "allocation failed",
Tests:       2 failed, 2 total
```
The rejection already matches what the ticket wants, so the only thing failing is that the two hooks never fire.

**The ticket's open question:** I decided that `afterSession` does run after a failed `beforeSession`. To keep "never allocated" distinguishable from "allocated and finished", the spec now says the hook can assume nothing after `beforeSession` ran.

**Also committed:**
- **Spec:** a new section, "Failure in beforeSession", in `specs/hal-engine-config-hooks/spec.md`, with one statement per test, each citing its test by name and `#L27`/`#L56`. I did not change the spec's `Status` row.
- **`.lore/dod.md`:** the plan for the next round. Move the call inside the `try`, delete the old flaw line under "Measured semantics", add a CHANGELOG `Fixed` entry, and leave the existing hook tests unedited.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}