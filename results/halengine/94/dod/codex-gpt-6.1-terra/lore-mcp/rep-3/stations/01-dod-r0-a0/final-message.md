Committed and pushed the **direct** acceptance test and definition of done. The test checks that a `beforeSession` error reaches the caller unchanged, invokes `onError` and `afterSession` in order with the expected arguments, and stops later turn hooks.

The targeted Jest run failed for the reported reason:

```text
FAIL src/orchestration/beforeSession.acceptance.test.ts
  ● beforeSession failure › reports and cleans up a failed beforeSession while preserving its rejection

    expect(received).toEqual(expected) // deep equality

    - Expected: ["onError", session, [Error: allocation failed]]
    - Expected: ["afterSession", session]

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The original rejection assertion passed before the hook assertion failed. The branch is up to date with `origin/main` and its upstream. The repository’s current test-list command does not expose a `spec` descriptor field; the test has the spec anchor comment and the spec links to the test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}