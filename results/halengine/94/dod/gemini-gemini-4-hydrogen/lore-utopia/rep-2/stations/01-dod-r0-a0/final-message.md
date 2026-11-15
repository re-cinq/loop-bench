Added the failing acceptance test and DoD for `re-cinq/HALEngine#94` using strategy `direct` (commit `6709b67` on `loop-bench/94`, up to date with `origin/main` and `origin/loop-bench/94`).

### Files
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — exercises `createChatOrchestrator(...).processMessage(session)` when `beforeSession` throws an `Error`, verifying rejection propagation, `onError(session, error)`, `afterSession(session)`, call order `['beforeSession', 'onError', 'afterSession']`, and no later hooks or provider calls.
- `specs/hal-engine-config-hooks/spec.md` — replaced the `beforeSession` measured-flaw bullet with the new guarantee linked to `chatOrchestrator.acceptance.test.ts#L10` (spec anchor, link placement, and status checks pass).
- `.lore/dod.md` — recorded the central claim, `direct` strategy, acceptance test, remaining implementation facets (moving `beforeSession` inside `try`, documenting `afterSession` turn-progress assumptions in the spec, adding the `CHANGELOG.md` entry, keeping existing non-throwing tests unedited), and out-of-scope items.

### Failure output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`)
```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure lifecycle › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 3

      Object {
    -   "afterSessionSameSession": true,
    +   "afterSessionSameSession": false,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorSameError": true,
    -   "onErrorSameSession": true,
    +   "onErrorSameError": false,
    +   "onErrorSameSession": false,
        "rejectedSameError": true,
      }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}