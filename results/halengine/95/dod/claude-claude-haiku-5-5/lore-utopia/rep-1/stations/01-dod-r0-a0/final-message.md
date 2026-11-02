The acceptance tests are committed and pushed to `loop-bench/95`, and they fail for the reason the ticket states.

**Strategy: `direct`.** `createChatOrchestrator` is called with a provider that rejects with a non-`Error` value, so the real `catch` in `processMessageStream` is exercised with no new seam.

**Test file:** `src/orchestration/chatOrchestrator.acceptance.test.ts`. It is one `it.each` with three cases: a string, a plain object, and `undefined`. Each asserts that the caller still gets the original value (the `outcome` check passes today), that `onError` is called once, and that the argument is an `Error` whose `cause` is the original value. The `Error` identity case is already pinned by `chatOrchestrator.test.ts`, so I did not duplicate it.

**Red output** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts --coverage=false`):

```
  ● onError for a rejection that is not an Error › calls onError once with an Error whose cause is a string, and still rejects the caller unchanged

    expect(received).toHaveLength(expected)

    Expected length: 1
    Received length: 0
    Received array:  []

    > 64 |       expect(onErrorArgs).toHaveLength(1);
```

The plain-object and `undefined` cases fail identically, and the suite reports `Tests: 3 failed, 3 total`.

**Files and commit**
- `.lore/dod.md` quotes the ticket's central claim, names the `direct` strategy, lists the three tests, and lists the facets. The spec line replacement and CHANGELOG entry are listed as implementation facets, not tests.
- The branch is pushed and up to date with its upstream. `origin/main` needed no merge.

**Choices to check**
- I used `// eslint-disable-next-line @typescript-eslint/only-throw-error` on the test's `throw value`, since throwing a non-`Error` is the point of the test. I did not run ESLint here, so CI is the first check on that directive.
- Jest runs the file under ts-jest, which type-checks each file as it loads. I did not run `tsc` or the linter.

**Not done here (for the implementation round):** the `catch` gate change, the spec line 28 replacement, and the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}