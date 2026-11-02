Three red acceptance tests are committed and pushed to `loop-bench/95`. They fail because `onError` is never called for a non-`Error` rejection, which is the ticket's claim.

**Strategy: `direct`.** The seam exists: `createChatOrchestrator` takes `onError`, and a provider can reject with any value. The `instanceof Error` gate in the `catch` of `processMessageStream` is the missing behaviour.

**Files**
- `src/orchestration/chatOrchestrator.onError.acceptance.test.ts` (new): three tests, one per rejection kind the ticket names (a string, a plain object, `undefined`).
- `.lore/dod.md` (new): the ticket's claim quoted verbatim, the strategy, the three tests, and the facets.

**Red bar.** I ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. The final output:

```
FAIL src/orchestration/chatOrchestrator.onError.acceptance.test.ts
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
    Received array:  []
...
Tests:       3 failed, 3 total
```

All three fail at the `onError` call-count assertion, so the failure is the absent behaviour, not a broken import or fixture. Plain `npx jest` fails to load ESM here, so the run uses the `--experimental-vm-modules` flag from `package.json`'s `test` script.

**Not written as tests, on purpose**
- The "an `Error` reaches `onError` as the same instance" criterion already holds today. Writing it as a test would not be red, so the DoD leaves it as a facet that the existing `onError` tests must keep passing unedited.
- The spec line and CHANGELOG entry are implementation work, so they sit in the facets rather than the tests.
- The spec's recorded-flaw line has no `validated by` link, and nothing in the repo stamps a spec anchor onto a test. The implementation round should add the link when it replaces that line.

**Delivery.** I ran Prettier on both files, committed, and pushed. `git status` reports the branch in sync with `origin/loop-bench/95`. The merge with `origin/main` produced nothing new, since the branch already contains it. I did not run lint, typecheck, or the full suite.

**CI.** The tests run in this pod, so CI does not need to prove the red bar. CI still runs the full suite and lint on the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}