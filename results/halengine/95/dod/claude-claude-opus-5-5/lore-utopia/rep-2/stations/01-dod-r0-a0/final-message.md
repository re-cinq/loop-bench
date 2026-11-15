I wrote one acceptance test for #95. It fails today for the reason the ticket gives, and it is committed and pushed. Merging `origin/main` brought in nothing new, and `git status` shows the branch level with its upstream.

**Strategy: `direct`.** Calling `createChatOrchestrator(...).processMessage` with a provider that rejects with an arbitrary value reaches the `catch` and its `instanceof Error` gate, so no mocks were needed.

**Test** (`src/orchestration/onErrorNonError.acceptance.test.ts`): `calls onError once with an Error whose cause is %s, and the caller still receives the original rejection`. It runs once each for a string, a plain object and `undefined`. Each run checks two things:
- `onError` is called exactly once, with an `Error` whose `cause` is the original value.
- `processMessage` still rejects with that same original value.

Output from `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/onErrorNonError.acceptance.test.ts`:

```
● onError for a rejection that is not an Error (...) › calls onError once with an Error whose cause is a string, and the caller still receives the original rejection
      Object {
        "callerReceivedOriginal": true,
        "callerRejected": true,
    -   "causeIsOriginal": true,
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "causeIsOriginal": false,
    +   "isError": false,
    +   "onErrorCalls": 0,
      }
(same for "a plain object" and "undefined")
Tests:       3 failed, 3 total
```

This is the ticket's claim: the caller already gets the original rejection, but `onError` is never called.

**Other changes in the commit:**
- **Spec:** in `specs/hal-engine-config-hooks/spec.md` I replaced the recorded-flaw section with a new "Error reporting" guarantee, linked to the test at line 32. `scripts/check-spec-links.mjs` reports no misplaced links.
- **DoD file:** `.lore/dod.md` records the strategy and the remaining steps: the fix in `chatOrchestrator.ts` and a CHANGELOG `Fixed` entry.

**Things to know:**
- **Already-`Error` case:** there is no new test for an `Error` rejection reaching `onError` as the same object, because that passes today. The ticket leaves it to the existing tests, which should stay unedited. They only check the error's `message`, not that it is the same object, so a fix that wrapped every error and kept the message would still pass them.
- **Spec anchor:** this repo has no way to stamp a `specs/<path>#<ordinal>` anchor into the test list. I named the spec path and section in the test's comment and `describe` title instead.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}