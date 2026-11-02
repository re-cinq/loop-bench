The acceptance tests for #95 were already written and pushed by an earlier round on this branch (`loop-bench/95`, commit `c5c2a61`). I checked that work against the contract and made no changes this round, so there is nothing new to commit.

**What I verified**

- **Test file:** `src/orchestration/chatOrchestrator.acceptance.test.ts` is a new file with the required `.acceptance.test.ts` suffix. It holds two tests, which is inside the "one to five" limit. It drives `createChatOrchestrator(...).processMessage` through the real entry point. The provider double is a local `rejectingProvider` function, the same pattern the existing `chatOrchestrator.test.ts` uses for its `createMockProvider`.
- **DoD:** `.lore/dod.md` quotes the ticket's central claim, names the strategy as `direct`, and lists the two tests. It also has the expected checkboxes and Out of scope section.
- **Formatting:** `npx prettier --check` passes on the test file.
- **Branch state:** the branch is one commit ahead of `origin/main`, zero behind, and up to date with its upstream. No merge is needed.

**Red bar, run this round**

Command: `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/chatOrchestrator.acceptance.test.ts`

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps a thrown string in an Error whose cause is that string, and still rejects the caller with it
    - Expected  - 3
    + Received  + 3
      Object {
    -   "cause": "provider exploded",
    -   "hookCalls": 1,
    -   "isError": true,
    +   "cause": undefined,
    +   "hookCalls": 0,
    +   "isError": false,
        "rejection": "provider exploded",
        "resolved": false,
      }
  ● ChatOrchestrator onError for non-Error rejections › calls onError once for a plain-object rejection and for an undefined rejection, each wrapped with the original as cause
    - Expected  - 8
    + Received  + 5
    -   "objectHookCalls": 1,
    -   "objectIsError": true,
    +   "objectHookCalls": 0,
    +   "objectIsError": false,
    -   "undefinedHookCalls": 1,
    -   "undefinedIsError": true,
    +   "undefinedHookCalls": 0,
    +   "undefinedIsError": false,
Tests:       2 failed, 2 total
```

Both failures are the ticket's stated defect: `onError` is never called (`hookCalls: 0`) because the `catch` at `src/orchestration/chatOrchestrator.ts:150` gates on `error instanceof Error`. The caller still receives the original rejection in both cases. These are not setup or import failures.

**Findings for the ticket's author**

- The ticket also asks for a spec edit and a CHANGELOG entry. Those are listed as facets in `dod.md`, and I did not touch them because this pod writes tests only.
- The ticket's criteria 4 and 5 (`npm run build`, `npm test`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check`) are CI's to run. I ran neither the full suite nor lint here.
- `spec.md` has no un-linked testable statement for the new guarantee yet, so no spec anchor is stamped on the tests. The new guarantee line is the spec facet, to be written alongside the fix.

Since this round's contribution is verification only, with the red tests already on the branch and pushed, I end on the success line for the existing commit:

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}