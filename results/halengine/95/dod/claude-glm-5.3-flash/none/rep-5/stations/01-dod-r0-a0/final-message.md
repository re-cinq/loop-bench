Done. Triage: **`direct`** — the seam exists (`createChatOrchestrator().processMessage` with a rejecting provider reaches the `catch` at `src/orchestration/chatOrchestrator.ts:150` through the real caller path), so the acceptance tests fail on behaviour today.

**What I wrote** (commit `bf7b792`, pushed to `loop-bench/95`, up to date with `origin/main`):

- `src/orchestration/chatOrchestrator.onError.acceptance.test.ts` — 4 tests. Three red `it.each` cases (string, plain object, `undefined`): each drives a provider whose `sendMessage` generator throws that value through `processMessage`, and asserts `onError` fired exactly once with an `Error` whose `cause` is the original value, while the caller still receives the original rejection. One green pin: a rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper (ticket criterion 3, guarding the fix against over-wrapping).
- `.lore/dod.md` — the ticket's central claim quoted verbatim, the `direct` strategy, and facets for the fix round including the exact spec-line replacement text (with the `([validated by: …](…#L45))` citation, per AGENTS.md § Spec Test Links) and the CHANGELOG entry owed. No production code written.

**The red bar, from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.onError.acceptance.test.ts`** (the only file I ran; `repoint-spec-anchors.mjs` reports 610 up to date, 0 unresolved; prettier: unchanged):

```
● … wraps a rejection that is a string in an Error for onError, keeping the original as cause, and still rejects the caller with it
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
    Received array:  []
```

The same failure shape for the plain-object and `undefined` cases: `onError` receives nothing — the exact bypass the ticket reports — so all three fail for the ticket's stated reason, not a missing fixture. Result: `3 failed, 1 passed` (the pass is the deliberate already-`Error` identity pin). Criterion 4 (spec + CHANGELOG) is not source-text-testable; it's a facet in `.lore/dod.md` owed by the fixing round, with the paste-ready citation.

Finding on the way, not a substitute subject: the `consultPolicy` catch logs non-`Error` throws only as a `typeof` string and `saveSession` stringifies them — consistent with the ticket, which claims only the `catch` gate; noted under Out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}