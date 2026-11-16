Added the red acceptance test, spec traceability link, and `.lore/dod.md` for Ticket #94 (`Strategy: direct`), and pushed commit `0a79b4f` to `origin/loop-bench/94` (up to date with `origin/main`).

Files changed:
- `src/orchestration/beforeSessionThrows.acceptance.test.ts` — exercises `createChatOrchestrator(...).processMessage(session)` when `beforeSession` throws, asserting that the rejection reaches the caller with the same error, `onError` fires with `(session, error)` followed by `afterSession(session)`, and no downstream hooks or provider calls run.
- `specs/hal-engine-config-hooks/spec.md` — added the guarantee statement under `Installing hooks through config` linked to `src/orchestration/beforeSessionThrows.acceptance.test.ts#L10` (`npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, and `npm run prettier:check` all passed).
- `.lore/dod.md` — recorded the verbatim claim, `direct` strategy, acceptance test, remaining implementation facets (moving `beforeSession` inside `try`, removing the obsolete flaw line in `specs/hal-engine-config-hooks/spec.md`, updating `CHANGELOG.md`, running `npm run verify`), and out-of-scope items.

Failure output from `npm test -- src/orchestration/beforeSessionThrows.acceptance.test.ts`:
```text
FAIL src/orchestration/beforeSessionThrows.acceptance.test.ts
  ● beforeSession failure lifecycle › runs onError then afterSession when beforeSession throws, without running the turn, and rejects with the same error

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 5

      Object {
    -   "afterSessionCount": 1,
    -   "afterSessionSessionMatches": true,
    +   "afterSessionCount": 0,
    +   "afterSessionSessionMatches": false,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorCount": 1,
    -   "onErrorErrorMatches": true,
    -   "onErrorSessionMatches": true,
    +   "onErrorCount": 0,
    +   "onErrorErrorMatches": false,
    +   "onErrorSessionMatches": false,
        "providerCalls": 0,
        "rejectedWithSameError": true,
      }

      at Object.<anonymous> (src/orchestration/beforeSessionThrows.acceptance.test.ts:71:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}