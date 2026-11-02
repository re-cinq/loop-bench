The acceptance tests for #95 were already on the branch from an earlier round. I re-ran them, they fail for the reason the ticket states, and I corrected the DoD file. Everything is pushed and the branch is up to date with `origin/main`.

**Strategy: `direct`.** `createChatOrchestrator` and its `onError` hook are called through `processMessage` with a provider that rejects with the chosen value. No new seam is needed.

**Tests** (`src/orchestration/onErrorNonError.acceptance.test.ts`, two tests):
- A string rejection calls `onError` once with an `Error` whose `cause` is that string, and the caller still gets the string.
- A plain-object rejection and an `undefined` rejection each call `onError` once with an `Error` whose `cause` is the value, and the caller still gets the value.

**Red bar, run here:**
```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/onErrorNonError.acceptance.test.ts
...
- "cause": "upstream timed out",
- "isError": true,
- "onErrorCalls": 1,
+ "cause": undefined,
+ "isError": false,
+ "onErrorCalls": 0,
...
Tests:       2 failed, 2 total
```
The second test fails the same way: `onErrorCalls: 0` for both the plain object and the `undefined` case. The caller side already matches, so the failure comes from the `instanceof Error` gate at `src/orchestration/chatOrchestrator.ts:150`, which is the claim itself.

**Changes this round** (commit `b749b7f`, `.lore/dod.md` only):
- The central claim was paraphrased. It is now quoted verbatim from the ticket.
- I removed the extra `## Red bar` section so the file matches the required shape.
- Prettier reformatted the file. It now passes `prettier --check`.

**Left for the implementation round (facets, not tests):**
- The spec's only un-linked statement is the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md`. The guarantee it should link to does not exist yet, so I did not add a `validated by` link. That link belongs with the spec edit.
- The CHANGELOG entry and the "same instance" identity guard are facets as well. The identity guard is already green and is not a new test.

Not run here: the lint, typecheck and full-suite jobs. CI runs those.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}