I wrote one acceptance test for #94. It fails today for the reason the ticket gives, and it is committed and pushed. The branch is level with its upstream, and merging `origin/main` changed nothing.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` accepts hooks and can be driven today, so no seam work is needed.

The test is in `src/orchestration/beforeSessionFailure.acceptance.test.ts`: "rejects with the original error and still runs onError and afterSession". It installs a `beforeSession` that throws, plus `onError` and `afterSession` recorders. It expects three things:
- The caller gets the same error back.
- `onError` fires with `(session, error)`.
- `afterSession` fires.

I ran it with `node scripts/lore-run-test.mjs`, because bare `npx jest` can't load ESM here. This is the failure:

```
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● beforeSession failure › rejects with the original error and still runs onError and afterSession
    - Expected  - 20
    + Received  +  2
      Object {
    -   "calls": Array [ "onError", "afterSession" ],
    -   "onErrorArgs": Array [ Array [ {session}, [Error: allocation failed] ] ],
    +   "calls": Array [],
    +   "onErrorArgs": Array [],
        "rejection": [Error: allocation failed],
      }
```

The rejection already reaches the caller unchanged. `onError` and `afterSession` never fire, which is the claim.

I also did two things outside the test file:
- **Spec link:** the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` now carries a `validated by` link to the test.
- **`.lore/dod.md`:** it quotes the ticket's claim and lists the facets still owed.

The facets owed are:
- Move the `beforeSession` call inside the `try`.
- Replace the flaw line in the spec with the new guarantee, including what a hook can assume about how much of the turn happened.
- Add the CHANGELOG entry.

No existing test is edited, so they keep pinning the non-throwing `beforeSession` path.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}