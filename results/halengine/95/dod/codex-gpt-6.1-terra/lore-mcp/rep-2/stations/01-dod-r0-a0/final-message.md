Committed and pushed the **direct** acceptance test and definition of done. The branch is up to date with `origin/main` and its upstream.

The test uses a real lifecycle hook rejection to exercise the orchestrator’s shared catch path. It covers non-Error causes, Error identity, and preservation of the caller’s rejection.

Running `npm test -- --runInBand --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts` produced the expected red bar:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● reports every rejection to onError while preserving the caller rejection

    expect(received).toHaveLength(expected)

    Expected length: 1
    Received length: 0
    Received array:  []
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}