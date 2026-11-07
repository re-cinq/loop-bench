The acceptance test is written, fails for the reason the ticket gives, and is pushed to `loop-bench/95`. The branch already contains `origin/main`, so the merge brought in nothing, and `git status` shows it is not ahead of its upstream.

**Strategy: `direct`.** The test calls `createChatOrchestrator` with a provider whose `sendMessage` throws something that isn't an `Error`. That runs the real `catch` without any mocks.

**Test** (`src/orchestration/onErrorNonError.acceptance.test.ts`): one `describe`, "onError for a rejection that is not an Error", with an `it.each` over a string, a plain object and `undefined`. Each case checks that `onError` runs once with an `Error` whose `cause` is the thrown value, and that `processMessage` rejects with that exact value, not a copy.

**Red bar:**
```
● onError for a rejection that is not an Error › calls onError once with an Error whose cause is a string, and the caller still receives the original rejection
    -   "cause": "provider exploded",
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "cause": undefined,
    +   "isError": false,
    +   "onErrorCalls": 0,
        "outcome": Object {
          "rejected": true,
          "value": "provider exploded",
...
Tests:       3 failed, 3 total
```
`onError` is never called (`onErrorCalls: 0`), but the caller still gets the rejection. That is the ticket's claim exactly. The plain-object and `undefined` cases fail the same way.

**Also in the commit:**
- **Spec:** `specs/hal-engine-config-hooks/spec.md` no longer has the "Measured semantics" section that recorded the flaw. In its place is a statement of the new guarantee, citing the test's `describe` title. I used the `describe` title because the repo's link checker can't read names from `it.each`. `scripts/check-spec-anchor-names.mjs` passes on that spec, and the test file's first line marks it as validating `spec.md#8`.
- **`.lore/dod.md`:** lists the existing `onError` tests in `chatOrchestrator.test.ts`, which must stay green without edits. They pin the ticket's requirement that a real `Error` reaches `onError` as the same object.

The ticket still needs the change to the `catch` in `chatOrchestrator.ts` and a CHANGELOG entry, both listed as steps in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}