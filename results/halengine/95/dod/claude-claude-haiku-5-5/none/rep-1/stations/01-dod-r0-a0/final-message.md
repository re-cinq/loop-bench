The red acceptance test is committed and pushed to `loop-bench/95`, and the branch is level with its upstream. It fails for the reason the ticket states.

**Strategy: `direct`.** `createChatOrchestrator` already takes `hooks.onError`, and a provider can reject with any value through `sendMessage`, so the test calls `processMessage` through the real entry point.

**Acceptance test** (`src/orchestration/chatOrchestratorOnError.acceptance.test.ts`): one `it.each` over three rejections (a string, a plain object, `undefined`). Each case asserts that `onError` is called once with an `Error` whose `cause` is the raw value and the session is the caller's, and that the caller still gets the original value back. I did not add a test for the "already an `Error` keeps its identity" criterion because it already passes today and an acceptance test has to fail. The existing tests in `chatOrchestrator.test.ts` cover it.

**Red bar** (`npm`-free, run as `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestratorOnError.acceptance.test.ts`):

```
FAIL src/orchestration/chatOrchestratorOnError.acceptance.test.ts
  ● onError for a rejection that is not an Error › calls onError once with an Error whose cause is a string, and still rejects the caller with the original value

    expect(received).toHaveLength(expected)

    Expected length: 1
    Received length: 0
    Received array:  []

      66 |       expect(seen).toHaveLength(1);

Tests: 3 failed, 3 total
```

The same failure appears for the plain-object and `undefined` cases. Each fails because `onError` never runs, which is the ticket's claim.

**Choices I made:**
- **Spec line not linked.** The "Measured semantics — out of scope" line in `specs/hal-engine-config-hooks/spec.md` is the flaw the ticket asks to replace. I did not add a `validated by` link to it, since that line describes the old behaviour. The implementation round owes the spec replacement and CHANGELOG entry (acceptance criterion 4).
- **Lint, typecheck and build not run here**, per the pod rules. Prettier was run on both files.
- **`.lore/dod.md`** has the ticket's central claim quoted verbatim, the `direct` strategy, one test, and facets for the implementation.
- **Merge with `origin/main`** produced nothing new; the branch already contained `684b294`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}