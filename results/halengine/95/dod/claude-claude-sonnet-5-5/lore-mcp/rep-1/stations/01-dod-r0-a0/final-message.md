I added one acceptance test file. It is red for the ticket's reason and is committed and pushed. The branch is level with its upstream and already up to date with `origin/main`.

**Strategy: `direct`.** `processMessage` already exercises the `catch`, so no new seam was needed.

**Test:** `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. It runs three cases (a string, a plain object and `undefined`) through `it.each`. In each, the provider rejects with the value, and the test expects:
- `onError` is called once with an `Error` whose `cause` is that value.
- The caller still receives the original rejection.

I ran it with `npm test -- src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. Plain `npx jest` fails on ESM, so I used the repo's `test` script. The string and plain-object cases both fail like this:
```
- "callCount": 1,   + "callCount": 0,
- "cause": "plain string failure",   + "cause": undefined,
- "isError": true,  + "isError": false,
  "caller": {"threw": true, "value": "plain string failure"}   (already correct)
```
That matches the ticket's claim: `onError` is bypassed while the caller still gets the rejection. I read only the string and plain-object failures; the output was cut off before the `undefined` case's result.

**Traceability:** I did not add a `validated by` link to the spec. The only matching statement is the recorded-flaw line, which the implementation is meant to replace, so I listed that replacement as a facet in `.lore/dod.md`. The "same `Error` instance" criterion is already covered by the existing `chatOrchestrator.test.ts`, which is not edited.

Neighbouring issue, not tested: `beforeSession` escaping the `try`, which the ticket puts out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}