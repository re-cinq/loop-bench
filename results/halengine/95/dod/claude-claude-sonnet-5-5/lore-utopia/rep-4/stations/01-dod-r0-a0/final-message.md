The red tests are committed and pushed. Strategy is `direct`: `processMessage` is a real entry point, and a provider that rejects with a non-Error already drives the `catch`.

**Red bar.** I ran the file with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. The plain `jest` command can't load the ESM test file, so the repo's `npm test` form is needed. I read the failure output for the string case and the first part of the plain-object case. I did not read the `undefined` case's output.

```
● onError for every rejection › calls onError once with an Error whose cause is a string, and rejects with the original
    - "calls": 1,        + "calls": 0,
      "caught": "boom",
    - "cause": "boom",   + "cause": undefined,
    - "isError": true,   + "isError": false,
```

The plain-object case fails the same way. The caller still receives the original rejection, but `onError` is never called. That matches the ticket's claim.

**The test.** It is one parameterised test over a string, a plain object and `undefined`, in `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. It expects `onError` called once with an `Error` whose `cause` is the raw value, and the caller rejected with that same value.

**Error passthrough.** I dropped my pass-through test for an `Error` rejection because it passes today. The existing tests already pin that criterion.

**Other files.**
- **`.lore/dod.md`:** quotes the ticket's claim, names the strategy, and lists the test, the facets and what is out of scope.
- **`specs/hal-engine-config-hooks/spec.md`:** I replaced the recorded-flaw line with the new guarantee and linked it to the test. This makes the spec state behaviour that isn't implemented yet, so the line should be reworded if the PR stalls.

**Branch state.** Merging `origin/main` changed nothing, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}