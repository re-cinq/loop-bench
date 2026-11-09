Landed. The branch is pushed and sits directly on `origin/main` (`dd5308e`) — no drift, nothing to merge.

## What the ticket needed

Triage: **`direct`** — the seam exists and is callable today. `createChatOrchestrator(...).processMessage(session)` is the real entry point, and `src/orchestration/chatOrchestrator.ts:91` awaits `beforeSession` above the `try` on line 93, so a throw there never reaches the `catch`/`finally`. The spec (`specs/hal-engine-config-hooks/spec.md`) records this exact flaw in its "Measured semantics — out of scope" section; this ticket owns it.

## Tests — `src/orchestration/chatOrchestrator.acceptance.test.ts` (new file)

Three tests, one per behavioural acceptance criterion, through the real orchestrator with a real `PromptBuilder` and a provider standing in the pluggable `AIProvider` seam (no doubles of the code under test):

1. **still rejects the caller with the same error** — criterion 1; green *by design*, pinning what must not change while the call moves into the `try`.
2. **reaches onError with the session and error any other orchestrator failure carries** — criterion 2; red.
3. **runs afterSession after onError, handing back the session exactly as beforeSession was handed it** — criterion 3; red, and pinning the answer to the question the ticket says to decide: `afterSession` runs, and the hook can assume nothing about how much of the turn happened (same session object, entries untouched, zero provider calls).

Ran with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
● a beforeSession that throws › reaches onError with the session and error any other orchestrator failure carries
    - Expected  - 2
    + Received  + 2
      Object {
        "outcome": "before session failed",
    -   "sameError": true,
    -   "sameSession": true,
    +   "sameError": false,
    +   "sameSession": false,

● a beforeSession that throws › runs afterSession after onError, handing back the session exactly as beforeSession was handed it
    - Expected  - 12
    + Received  + 3
    -   "callOrder": Array [ "onError", "afterSession" ],
    -   "entries": Array [ … ],
    +   "callOrder": Array [],
    +   "entries": undefined,
    +   "sameSession": false,
Tests:       2 failed, 1 passed, 3 total
```

Both reds fail for exactly the quoted claim — "Neither `onError` nor `afterSession` runs" — while `outcome` already carries `before session failed`, confirming the rejection path is unchanged today.

## Also in the commit

- `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw line replaced by a new "A throw from beforeSession" section stating the guarantee and citing the three tests (anchors hand-verified onto their `it(` lines; `reanchor.mjs` doesn't exist here, and `repoint-spec-anchors.mjs` skips whole any spec whose anchor set differs from base). The two remaining out-of-scope bullets and the `| Status |` row are untouched.
- `.lore/dod.md` — claim, strategy, test list, facets for the next round (the one-line code move, the consciously-confirm `finally` semantics, the CHANGELOG entry).

**Findings for the next round:** (1) the `finally` will newly run `commitStreamingEntries` + `saveSession` on a failed `beforeSession` — no-ops for an untouched session, but part of the guarantee; (2) CLAUDE.md already claims "`afterSession` always fires, including on error" — today's code contradicts it on this path, and the fix makes the doc true; (3) the CHANGELOG entry is owed with the code change.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}