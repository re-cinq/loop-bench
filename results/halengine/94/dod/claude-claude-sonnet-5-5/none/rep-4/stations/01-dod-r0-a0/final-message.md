I wrote two acceptance tests for #94. Both fail on the current code, and I've committed and pushed them. The branch is level with its upstream and `origin/main` merged cleanly.

The tests are in `src/orchestration/beforeSessionFailure.acceptance.test.ts`. Both call `createChatOrchestrator(...).processMessage` with a `beforeSession` hook that throws:

- **`onError` test:** the call still rejects with the original error, and `onError` fires once with `(session, error)`.
- **`afterSession` test:** `afterSession` fires once with the session.

I ran only that file with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/beforeSessionFailure.acceptance.test.ts`. Both tests fail because the hooks never run:

```
● a beforeSession hook that throws › rejects to the caller with the original error and fires onError with (session, error)
    - "onError": Array [ ["onError", [session, Error: allocation failed]] ]
    + "onError": Array [],
      "outcome": [Error: allocation failed],
● a beforeSession hook that throws › still fires afterSession with the session
    (expected one afterSession call with the session; received an empty array)
```

The `outcome` line shows the rejection already reaches the caller unchanged, so that part of the ticket holds today and the test passes on it. I wrote no test for the "non-throwing `beforeSession` behaves as today" criterion, because the existing tests already pin it.

I wrote `.lore/dod.md` with strategy `direct` and the ticket's central claim quoted. It also lists the facets for the implementing round: move the call inside the `try`, replace the recorded-flaw line in the spec with the new guarantee, and add a CHANGELOG entry.

There is no `scripts/spec-links/reanchor.mjs` in this repo, and `.lore/test-commands.yml` has no field for a spec anchor. I therefore put a spec reference in a comment at the top of the test file, and I added no `validated by` link to the spec. Linking the tests from `specs/hal-engine-config-hooks/spec.md` is left to the implementing round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}