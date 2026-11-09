Done. Branch `loop-bench/95` is pushed and in sync with `origin/main` (already up to date — no drift to merge).

## Triage: `direct`

The seam already exists: `createChatOrchestrator` takes any `AIProvider`, and `onError` is installable through `options.hooks`. The tests call the real entry point (`processMessage`) with a real provider whose `sendMessage` generator throws the raw value — no doubles.

## What landed (commit `8648515`)

- **`src/orchestration/chatOrchestrator.acceptance.test.ts`** — three acceptance tests, one per rejection shape (string / plain object / `undefined`), each asserting the full criterion: `onError` called exactly once with an `Error` whose `cause` is the original value, and the caller still receiving the original rejection itself.
- **`specs/hal-engine-config-hooks/spec.md`** — the recorded-flaw section is replaced by the new guarantee (ticket criterion 4's spec half), cited from the acceptance tests; the Error-path guarantee cites the two existing tests that pin it unedited. All spec checkers green: `spec:names` 606 citations name their test, `repoint-spec-anchors --check origin/main` stale 0, `check:spec-links` misplaced 0, `check:spec-status` 0 findings (`Status: Shipped` still matches coverage).
- **`.lore/dod.md`** — DoD with the claim quoted verbatim, facets for the implementer (the `catch` fix, CHANGELOG entry under `Unreleased`/`Fixed`).

## Red bar — run with

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

`Tests: 3 failed, 3 total`, every one failing on exactly the ticket's stated reason — the gate dropping the rejection before `onError`, not a wiring problem. Quoting the actual output:

```
● … › calls onError once with an Error whose cause is the string, and still rejects the caller with the string
    - Expected  - 2
    + Received  + 2
      Object {
    -   "onErrorCalls": 1,
    +   "onErrorCalls": 0,
        "rejection": "the provider fell over",
    -   "wrappedTheString": true,
    +   "wrappedTheString": false,
```

```
● … › calls onError once with an Error whose cause is the same object, and still rejects the caller with the same object
    -   "causeIsTheSameObject": true,
    -   "onErrorCalls": 1,
    +   "causeIsTheSameObject": false,
    +   "onErrorCalls": 0,
```

```
● … › calls onError once with an Error when the rejection is undefined, and still rejects the caller with undefined
    -   "deliveredAnError": true,
    -   "onErrorCalls": 1,
    +   "deliveredAnError": false,
    +   "onErrorCalls": 0,
```

Note the `rejection` fields already match: the caller-receives-the-original half of each criterion holds today, so the red is purely the bypassed `onError` — the fix must not change the rejection boundary to go green. Criterion 3 (an `Error` reaches `onError` as the same instance) stays pinned by the existing `chatOrchestrator.test.ts`, which I verified green (`25 skipped, 1 passed`) for `called with session and error when stream fails` before any fix exists. CI's Verify job runs the full checklist, including `check-changelog.sh`, which gates the CHANGELOG facet owed to the implementer.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}