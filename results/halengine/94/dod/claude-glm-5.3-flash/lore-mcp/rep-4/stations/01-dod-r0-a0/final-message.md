Done. The branch `loop-bench/94` carries the acceptance contract for #94, committed and pushed (`2e21517`).

## What the ticket claimed (quoted verbatim in `.lore/dod.md`)

> "`beforeSession` is awaited before the `try` block opens ([chatOrchestrator.ts#L91](../../src/orchestration/chatOrchestrator.ts#L91)), so a throw there escapes before the `catch`/`finally` exist and skips both `onError` and `afterSession`."

**Triage: `direct`** — the seam exists. `createChatOrchestrator(..., {hooks})` is the real entry point and `hooks` is the supported install path, so a test can install a throwing `beforeSession` today and observe what fires.

## The acceptance test

`src/orchestration/chatOrchestrator.acceptance.test.ts` — **runs onError and afterSession when beforeSession throws and still rejects the caller**. One test, one expect, through `orchestrator.processMessage(session)` with every hook installed: the rejection must still carry the thrown error (criterion 1), `onError` must receive the same session object and the same error instance any other failure delivers (criterion 2), `afterSession` must fire after it (criterion 3), and the call order must show none of the later hooks ran, the provider was never called and no entry was added — which is exactly the assumption about "how much of the turn happened" the spec must state. Criterion 4 (non-throwing path unchanged) is left to the existing unedited tests, named in the DoD.

## The red bar, actual output

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator failure path › runs onError and afterSession when beforeSession throws and still rejects the caller

    - Expected  - 5
    + Received  + 3

      Object {
    -   "afterSessionGotSession": true,
    +   "afterSessionGotSession": false,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorGotSession": true,
    -   "onErrorGotThrownError": true,
    +   "onErrorGotSession": false,
    +   "onErrorGotThrownError": false,
        "outcome": "beforeSession failed",
        "providerCalls": 0,
        "sessionEntries": 1,
      }
```

It fails for the ticket's stated reason: the rejection already reaches the caller and the provider is never called, but `onError` and `afterSession` never fire.

## Also in the commit

- `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw line replaced by a **Failure path** guarantee citing the test (anchor on `it(` at `#L40`), including the decision the ticket asked to make explicit: `afterSession` runs even for a turn that never started, and here is what a hook may assume. The remaining two recorded flaws keep their section, whose lead now reads "these two properties".
- `.lore/dod.md` — strategy, facets, and what the next round owes: move the await inside the `try`, add the CHANGELOG `## [Unreleased]` entry (gated by `check-changelog.sh` exactly when the src/ change lands), and re-run `node scripts/repoint-spec-anchors.mjs` since the two remaining flaw bullets anchor to `chatOrchestrator.ts#L150`/`#L148`, which that move shifts.

Pushed; `git status` reports the branch up to date with `origin/loop-bench/94`, and `origin/main` is already an ancestor so no merge was needed. No production code was written, and nothing but the acceptance file was run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}