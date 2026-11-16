Added the red acceptance test and Definition of Done for `re-cinq/HALEngine#94` on branch `loop-bench/94` (commit `a95ef07`, pushed to `origin/loop-bench/94` and up to date with `origin/main`):

- `src/orchestration/chatOrchestrator.acceptance.test.ts` — exercises `createChatOrchestrator(...).processMessage(session)` when `beforeSession` throws, verifying that the rejection reaches the caller while `onError(session, error)` and `afterSession(session)` fire in order without running subsequent turn hooks or calling the provider.
- `specs/hal-engine-config-hooks/spec.md` — linked the new statement to `src/orchestration/chatOrchestrator.acceptance.test.ts#L10` (verified with `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, and `npm run prettier:check`).
- `.lore/dod.md` — recorded strategy `direct`, the acceptance test, implementation facets (moving `beforeSession` inside `try`, updating the measured-semantics note in `specs/hal-engine-config-hooks/spec.md`, and adding the `CHANGELOG.md` entry), and out-of-scope items.

Failure output from `npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession failure lifecycle (acceptance) › runs onError then afterSession when beforeSession throws and still rejects

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
        "outcome": [Error: beforeSession boom],
        "providerCalls": 0,
      }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}