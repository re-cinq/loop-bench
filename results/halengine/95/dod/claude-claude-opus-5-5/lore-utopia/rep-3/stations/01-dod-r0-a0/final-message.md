I wrote one acceptance test, ran it, and it fails for the reason the ticket gives. It's committed and pushed to `loop-bench/95`, which is already up to date with `origin/main`. The branch is not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator` takes the provider and the `onError` hook as arguments. A real provider that rejects with a value that isn't an `Error` goes through the real `catch`, with no mocks.

**Test:** `src/orchestration/onErrorNonError.acceptance.test.ts`. It runs three cases (a string, a plain object, and `undefined`). Each one expects `onError` to be called once with an `Error` whose `cause` is the original value, and expects the caller to still receive that original value unchanged.

**Red bar** (`npx jest --runTestsByPath src/orchestration/onErrorNonError.acceptance.test.ts`):
```
  ● onError for a rejection that is not an Error › calls onError once with an Error whose cause is undefined, and still rejects with the original value
      Object {
        "callerReceivedOriginal": true,
        "cause": undefined,
    -   "hasCause": true,
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "hasCause": false,
    +   "isError": false,
    +   "onErrorCalls": 0,
      }
Tests:       3 failed, 3 total
```
The string and plain-object cases fail the same way: `onError` is never called, but the caller still gets the original rejection. That is exactly the ticket's claim.

**Other parts of the ticket:**
- **An `Error` rejection reaches `onError` as the same instance:** the existing tests in `chatOrchestrator.test.ts` cover this as long as nobody edits them. The DoD names them.
- **Spec:** I added an "onError for every rejection" section to `specs/hal-engine-config-hooks/spec.md` that states the new guarantee and links to the test. The old "Measured semantics" section still describes the flaw, so the two currently contradict each other. Deleting the old section, the CHANGELOG entry and the one-line fix in the `catch` are listed as Facets in `.lore/dod.md` for the next round.
- **No spec-anchor tooling:** this repo has no `scripts/spec-links/reanchor.mjs` and no mechanism for stamping a spec anchor on a test. I put the spec anchor in a comment at the top of the test and set the `#L28` link by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}