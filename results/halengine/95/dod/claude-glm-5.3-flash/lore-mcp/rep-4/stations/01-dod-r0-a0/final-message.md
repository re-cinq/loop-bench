Done. The branch is pushed and level with its upstream (`cc30b03`, base `684b294` = current `origin/main`, no drift).

## What I did

**Triage: `direct`** — the seam exists. `createChatOrchestrator` with a provider whose `sendMessage` generator throws a non-Error value, an `onError` hook installed, and the caller's rejection readable as a value. No doubles needed; the provider is a real `AIProvider` mirroring the existing test file's fixtures.

**One acceptance test** (`src/orchestration/chatOrchestrator.acceptance.test.ts`): for each of the three non-Error rejection shapes the ticket names — a string, a plain object, `undefined` — it requires `onError` to fire exactly once with an `Error` whose `cause` is the original value *by identity*, and the caller's rejection to be the original value *by identity*. It also validates the new spec statement in `specs/hal-engine-config-hooks/spec.md` (the recorded-flaw line and its "out of scope" section are replaced by the guarantee; the citation is anchored at the `it(` line, `#L43`, verified by `check-spec-anchor-names` and `check-spec-links`).

Acceptance criterion 3 (an `Error` reaches `onError` as the same instance) is pinned the way the ticket itself pins it — the existing orchestrator tests staying unedited and green; I ran them: **26 passed, none edited**.

## Red bar, quoted

```
● ChatOrchestrator onError for a rejection that is not an Error › calls onError once with an Error whose cause is the rejection value, and rejects the caller with that value unchanged, when the provider rejects with a string, a plain object, or undefined
  ● "plain object" → "onErrorCalls": Array []   (expected [{instanceOfError: true, causeIsOriginal: true}])
  ● "string" →      "onErrorCalls": Array []   (expected [{instanceOfError: true, causeIsOriginal: true}])
  ● "undefined" →   "onErrorCalls": Array []   (expected [{instanceOfError: true, causeIsOriginal: true}])
Tests:       1 failed, 1 total
```

It fails for exactly the ticket's claim: `onErrorCalls: []` — the gate bypasses `onError` entirely — while `callerReceivedOriginal: true` in all three cases, confirming the caller still sees the rejection. The DoD (`.lore/dod.md`) leaves the fix round two facets: wrap the non-Error rejection in the `catch` (keeping `throw error` verbatim) and the `CHANGELOG.md` Fixed entry, which `check-changelog` will demand once `src/` changes.

CI runs the file as part of `npm test` (`.github/workflows/ci.yml`, "Test" step over the Jest suite); the red bar is reproducible locally with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}