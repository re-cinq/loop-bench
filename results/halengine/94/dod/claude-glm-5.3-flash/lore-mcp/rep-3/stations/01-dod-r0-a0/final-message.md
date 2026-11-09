Committed as `fd9ebcb`, pushed, and the branch is up to date with both its upstream and `origin/main` (the branch base *is* main's tip, so no merge was needed).

## Summary

**Ticket:** re-cinq/HALEngine#94 — run `onError` and `afterSession` when `beforeSession` throws.

**Triage: `direct`** — the seam already exists (`createChatOrchestrator` + installable `OrchestratorHooks`), so one acceptance test drives the real `processMessage` entry point with a throwing `beforeSession` and fails today on exactly the reported behaviour.

**Delivered:**
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — one new acceptance test: a throwing `beforeSession` must still reject the caller with that error, `onError` must fire with the session and that error, and `afterSession` must fire after it — while every other lifecycle hook stays silent (so a cleanup hook can tell "never allocated" from "allocated and finished", the question the ticket asks decided and recorded).
- `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw line is replaced by the new guarantee, citing the test (`chatOrchestrator.acceptance.test.ts#L32`); the "Measured semantics" intro drops to two items. `check-spec-links`, `check-spec-anchor-names` (589 citations verified), `check-spec-status` and `repoint-spec-anchors --check origin/main` all pass on the edit; `prettier --check` is clean.
- `.lore/dod.md` — claim quoted verbatim, strategy, test, and the fix round's remaining facets (the one-line source move; the CHANGELOG entry; existing tests staying unedited).

**Actual failure output (red bar):**

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure › runs onError then afterSession when it throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "beforeSession failed",
    -   "receivedErrorMessage": "beforeSession failed",
    -   "receivedSessionId": "s1",
    +   "receivedErrorMessage": undefined,
    +   "receivedSessionId": undefined,
      }
```

It fails for the ticket's stated reason: `outcome` proves the rejection already reaches the caller unchanged, and the missing `onError`/`afterSession` entries are precisely the claim. Run via `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts` — that file only.

**Finding for the record:** `scripts/check-doc-paths.mjs` exits 1 on this checkout, on three pre-existing base findings in files I did not touch (`.specify/spec.md:309`, `specs/hal-engine-npm-release/spec.md:148`) that name `dist/` artifacts no unbuilt pod has; CI's build precedes that gate.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}