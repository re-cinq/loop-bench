I added one acceptance test file, `src/orchestration/chatOrchestratorOnError.acceptance.test.ts`, with three cases: a string, a plain object and `undefined`. All three fail today. The branch is pushed, `origin/main` was already merged in, and `git status` shows it isn't ahead of its upstream.

Strategy is `direct`. `createChatOrchestrator(...).processMessage` is the real entry point. Each case uses a provider that rejects with the value, then checks that `onError` fires once with an `Error` whose `cause` is that value and that the caller gets the original value back.

The test failed for the ticket's stated reason. Output for the string case (the other two fail the same way):

```
- Expected: "cause": "plain string failure", "isError": true, "onErrorCalls": 1
+ Received: "cause": undefined, "isError": false, "onErrorCalls": 0, "thrown": "plain string failure"
```

`onError` is never called, and the caller still gets the raw value, as the ticket says. I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath <file>`. A plain `npx jest` fails on ESM loading, so use that command.

`.lore/dod.md` quotes the ticket's claim and lists the test. It also names the unedited `chatOrchestrator.test.ts` as the guard that an `Error` reaches `onError` as the same instance.

I did not edit `specs/hal-engine-config-hooks/spec.md`. The only statement about this is the recorded-flaw line (line 28), which the fix will replace, so there was no existing statement to attach a validated-by link to. I put the replacement and the link in the DoD facets, along with the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}