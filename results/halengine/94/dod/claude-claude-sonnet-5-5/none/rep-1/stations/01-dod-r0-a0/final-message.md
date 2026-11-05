I added one acceptance test for #94. It fails now for the reason the ticket gives, and it is committed and pushed. The branch is up to date with `origin/main` and not ahead of its upstream. The test is in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.

The test calls `createChatOrchestrator(...).processMessage` with a `beforeSession` that throws. It expects the rejection to reach the caller unchanged and expects `onError(error)` and then `afterSession` to fire.

I ran it with `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. A bare `npx jest` without that option can't load the ESM test files. The failure:
```
    - "calls": Array [ ["onError", [Error: allocation failed]], ["afterSession"] ],
    + "calls": Array [],
      "rejection": [Error: allocation failed],
```
The rejection already reaches the caller. The hooks never fire.

- **Strategy:** `direct`. `.lore/dod.md` opens with the ticket's claim and lists the test, the facets and what is out of scope.
- **Not done:** I did not add a `([validated by …])` link to the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md`. The fix replaces that line, so the implementing round should link the new guarantee to this test. The repo's test listing has no spec-anchor field, so I added no spec stamp to the test.
- **Not covered by the test:** the spec wording on what `afterSession` can assume and the CHANGELOG entry. Both are in the DoD facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}