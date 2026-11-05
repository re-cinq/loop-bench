I committed and pushed one acceptance test for #94. It fails today for the reason the ticket gives, and the branch is up to date with `origin/main`.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` already takes hooks, so the test calls it with a throwing `beforeSession`.

**Test:** `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. A throwing `beforeSession` should reject to the caller unchanged. It should then call `onError(session, error)`, then `afterSession(session)`.

I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`. Plain `npx jest` can't load the ESM test files here. The result:

```
FAIL src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts
  ● beforeSession that throws (HALEngine#94) › rejects to the caller, calls onError with the thrown error and the session, then calls afterSession
    - Expected  - 31
    + Received  +  1
      Object {
    -   "calls": Array [ ["onError", {session}, [Error: allocation failed]], ["afterSession", {session}] ],
```

The output was cut at 40 lines, so the received side isn't shown. The diff shows 1 line received against 31 expected, which fits an empty `calls` array: neither hook ran. The rejection itself passes today, so the red is the missing `onError` and `afterSession` calls.

I did not add a `validated by` link to the spec. The only matching statement is the recorded-flaw line, and the implementing round replaces it, so it should link the test then. `.lore/dod.md` lists the remaining work: the `try` move, the spec rewrite saying what a hook can assume about how much of the turn happened, and the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}