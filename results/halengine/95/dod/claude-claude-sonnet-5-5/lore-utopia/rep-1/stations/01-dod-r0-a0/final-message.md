Three acceptance tests are committed and pushed, and all three fail today. The branch is level with its upstream after merging `origin/main`. The tests are in `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`.

**Strategy: `direct`.** `processMessage` with a provider that rejects is already a working seam.

The tests cover the ticket's string, plain-object and `undefined` cases. Each one makes the provider reject with that value. It then checks three things:
- `onError` is called once.
- It receives an `Error` whose `cause` is the original value.
- The caller still gets the original rejection unchanged.

I ran only that file, with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. The result was `Tests: 3 failed, 3 total`. The string case failed like this:

```
-   "calls": 1,
+   "calls": 0,
    "caught": "plain string",
-   "cause": "plain string",
-   "isError": true,
+   "cause": undefined,
+   "isError": false,
```

This matches the ticket: `onError` never fires for a non-`Error` rejection, while the caller still gets it. The plain-object case fails the same way, with `calls: 0`. I did not print the `undefined` case's output, but it is among the three failures.

I left out a test for the already-an-`Error` case. It passes today, so it would not be red. The ticket says the existing tests cover it, and `.lore/dod.md` lists them as staying green.

I also made two edits beyond the test file:
- **`.lore/dod.md`:** it quotes the ticket's claim, names the strategy, and lists the tests and the facets still owed (the code fix, the spec line and the CHANGELOG).
- **`specs/hal-engine-config-hooks/spec.md`:** I added the new guarantee as a statement linked to the test. I left the old recorded-flaw line in place. Both lines are now in the spec, and the implementing round should delete the old one.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}