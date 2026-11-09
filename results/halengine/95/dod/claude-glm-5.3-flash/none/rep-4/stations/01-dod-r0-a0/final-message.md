Done. Branch `loop-bench/95` is pushed and in sync with both its upstream and `origin/main` (`Already up to date` — the branch base is current main).

## What I defined

**Triage: `direct`** — the seam already exists: `createChatOrchestrator`'s hook set. The acceptance tests drive a real provider generator that throws a non-`Error` through the orchestrator's own `catch` (`src/orchestration/chatOrchestrator.ts:150`) and observe `onError` and the caller's rejection. No mocks of the unit under test; the throwing provider is the repo's standard fixture pattern (`createErrorProvider`, generalised to a non-`Error` rejection).

Two tests in a new file `src/orchestration/chatOrchestrator.acceptance.test.ts`, mapped onto the ticket's criteria 1–2 (string; plain object + `undefined`). Each pins: `onError` called exactly once, the hook receiving an `Error` whose declared `cause` is the original value (identity-checked; for `undefined`, `'cause' in error` distinguishes a set cause from an absent one), the hook receiving the session, and the caller's rejection being the *original* value unchanged. Criterion 3 (an `Error` reaches the hook as the same instance) stays pinned by the existing tests remaining unedited, per the ticket — listed in `.lore/dod.md` facets, since a passing test cannot be a red bar.

## Red bar (quoted, from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`)

```
Tests:       2 failed, 2 total
● … calls onError once with an Error whose cause is the rejected string, and still rejects the caller with that string
    - Expected  - 5
    + Received  + 5
      Object {
        "callerRejectionIsTheString": true,
    -   "causeIsDeclared": true,
    -   "causeIsTheRejectedString": true,
    -   "onErrorCalls": 1,
    ...
● … wraps a rejection with a plain object and with undefined the same way, …
        "plainObject": Object {
          "callerRejectionIsOriginalValue": true,
    -     "causeIsDeclared": true,
    +     "onErrorCalls": 0,
```

The red is exactly the ticket's claim: `onErrorCalls: 0` for every non-`Error` rejection, while `callerRejectionIsOriginalValue: true` today — so the fix owes only the hook half, and the caller boundary genuinely must not change shape.

## Also committed

- `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw section ("out of scope, owned by no issue") is replaced by the new guarantee, cited to both tests (`check-spec-anchor-names`: 10 citations resolve, 0 findings; `repoint-spec-anchors`: 0 unresolved). I did not touch any `| Status |` row. This was required, not optional: `re-lint/require-spec-link` fails any uncited `it()`, so without the citation CI's build would go red for the wrong reason and mask the red bar.
- `.lore/dod.md` — verbatim claim, `direct` strategy, tests, facets (including the owed CHANGELOG `### Fixed` entry under `## [Unreleased]` for existing consumers: their failure counts can only go up).

**One caveat for the reviewer:** the existing suite does not robustly pin criterion 3 — `rejects.toThrow('boom')` is a substring match and the other test checks only `error.message` — so an implementation that wrapped `Error`s too could slip through it. The facet text states the instance requirement explicitly so the round doesn't learn this from review.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}