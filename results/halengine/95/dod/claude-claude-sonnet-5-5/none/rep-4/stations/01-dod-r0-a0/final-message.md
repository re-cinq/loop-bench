I committed and pushed one acceptance test for #95, and it fails today for the reason the ticket gives. The branch merges cleanly with `origin/main` and is not ahead of its upstream. I added no production code.

**Strategy: `direct`.** `processMessage` on `createChatOrchestrator` is a real entry point, so the test calls it with a provider that rejects with a non-Error value.

**Test:** `src/orchestration/chatOrchestrator.nonErrorRejection.acceptance.test.ts` is a table of three cases: a string, a plain object and `undefined`. Each case asserts that:
- `onError` is called exactly once;
- it receives an `Error` whose `cause` is the raw rejection;
- the caller still gets the original rejection unchanged.

Run with `NODE_OPTIONS=--experimental-vm-modules npx jest <file>`, the red bar was:

```
● ... calls onError once with an Error caused by a string, and the caller gets the original
    -   "calls": 1,
    +   "calls": 0,
        "caught": { "thrown": "plain string failure" },
    -   "cause": "plain string failure",
    -   "isError": true,
    +   "cause": "no Error received",
    +   "isError": false,
```

The object case failed the same way (`calls: 0`). I only read the first 70 lines of the output, so I did not see the `undefined` case's result.

**`.lore/dod.md`:** it quotes the ticket's claim, names the strategy, and lists the existing `chatOrchestrator.test.ts` as must-stay-unedited. That file covers the criterion that an `Error` reaches `onError` as the same instance.

**Spec link:** I did not add a `validated by` link to `specs/hal-engine-config-hooks/spec.md`. The line there records the old flaw, so linking a test that asserts the opposite would be wrong. The facet list in the DoD asks the implementer to replace that line with the new guarantee and link the test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}