I wrote two acceptance tests for #94, and both fail today for the reason the ticket gives. They're committed and pushed, and the branch is level with its upstream.

The strategy is `direct`: `createChatOrchestrator(...).processMessage` already takes hooks, so the tests call the real entry point. I ran only `src/orchestration/beforeSessionFailure.acceptance.test.ts`, with `node --experimental-vm-modules node_modules/jest/bin/jest.js`. A bare `npx jest` fails on ESM loading.

- **onError test:** "reaches onError with (session, error) and still rejects the caller with that same error". The caller does get the original error, but `onError` is never called:
  ```
  Expected  - 16 / Received  + 1
    "outcome": [Error: no span available],
  - "seen": Array [ Array [ {session…}, [Error: no span available] ] ],
  + "seen": Array [],
  ```
- **afterSession test:** "still runs afterSession, once, with the session". It expected `[session]` and received `[]`, so `afterSession` never fires.

My first run of the file failed on a fixture error, because the `PromptBuilder` had no `identity`. I fixed that, so the red bars above are the behaviour being absent.

I added a spec statement to `specs/hal-engine-config-hooks/spec.md` linking both tests, and `.lore/dod.md` quotes the ticket's central claim. I left the recorded-flaw line in the spec for the implementer to replace.

The ticket also asks the implementer to decide what a hook can assume about how much of the turn ran. The tests pin only that `afterSession` fires, so they hold whichever answer is chosen. I merged `origin/main` and there was nothing to resolve.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}