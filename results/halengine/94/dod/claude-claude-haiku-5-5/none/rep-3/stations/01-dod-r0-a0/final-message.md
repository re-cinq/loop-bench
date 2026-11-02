The acceptance tests for #94 are committed and pushed to `loop-bench/94`, and both fail for the reason the ticket states.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage(session)` is the real entry point, and a throwing `beforeSession` can be installed through `hooks` today.

Tests, in `src/orchestration/chatOrchestrator.acceptance.test.ts`:
- **reaches onError with the same session and error, and the caller still gets the rejection.** It checks that `onError` receives the session and the thrown error, and that the caller still gets the rejection.
- **still runs afterSession, so a hook can release what beforeSession allocated.**

I did not write a separate test for "the rejection is unchanged". It already passes today, and the contract says every acceptance test must fail, so it is folded into the first test's outcome check.

Red bar, from running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
● ChatOrchestrator when beforeSession throws › reaches onError with the same session and error, and the caller still gets the rejection
    - "onErrorMessage": "allocation failed",
    - "onErrorSawSession": true,
    + "onErrorMessage": undefined,
    + "onErrorSawSession": false,
      "outcome": "allocation failed",

● ChatOrchestrator when beforeSession throws › still runs afterSession, so a hook can release what beforeSession allocated
    Expected: true
    Received: false

Tests:       2 failed, 2 total
```

Both failures are the missing behaviour, not a setup problem. The rejection (`outcome`) matches today's behaviour.

`.lore/dod.md` quotes the ticket's central claim, lists the two tests, and has facets for the code move, the spec decision and the CHANGELOG entry. The branch was already level with `origin/main`, so no merge was needed, and `git status` reports it is not ahead of its upstream.

Choices I made that you may want to change:
- **No spec link yet.** The ticket asks for a new spec statement recording the `afterSession` semantics. That statement does not exist yet, so nothing can link to these tests. The recorded-flaw line at `specs/hal-engine-config-hooks/spec.md:26` is still un-linked, and I left it alone. The implementation round should write the new statement and link the tests from it.
- **Not run:** the ticket's full checklist (`npm run build`, `typecheck`, `eslint`, the full test suite). I ran only the acceptance file, and ran prettier on it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}