The acceptance tests for #95 are red for the ticket's stated reason, and the branch is pushed. The work from an earlier round was already on the branch; I checked it and tidied `.lore/dod.md`.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` is the real seam, and a provider that rejects with the value under test reaches the `catch`.

**Acceptance tests** (`src/orchestration/chatOrchestrator.acceptance.test.ts`, one `it.each` with three rows):
- a string rejection calls `onError` once with an `Error` whose `cause` is that string, and the caller gets the original value
- a plain-object rejection, same guarantee
- an `undefined` rejection, same guarantee

**Red bar** (run here with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`):

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError for a rejection that is not an Error › calls onError once with an Error whose cause is a string, and rejects the caller with the original value

    expect(received).toHaveLength(expected)

    Expected length: 1
    Received length: 0
    Received array:  []

      56 |       expect(onErrorCalls).toHaveLength(1);
Tests:       3 failed, 3 total
```

The plain-object and `undefined` rows fail with the same `Expected length: 1 / Received length: 0`. The cause is the `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts`, which is the ticket's claim and nothing else.

**Changes this round:**
- Rewrote `.lore/dod.md` to the required layout. I removed an extra "Red bar" section, and folded the existing-tests note into the gate facet.
- Ran prettier on it, committed as `8de4feb`, merged `origin/main` (already up to date), and pushed. `git status` reports the branch in sync with `origin/loop-bench/95`.

**Not done here:** the spec traceability and CHANGELOG are facets for the implementing round, not tests. The "Measured semantics — out of scope" heading the dod names exists at `specs/hal-engine-config-hooks/spec.md:24`.

**Finding for the author:** the ticket's acceptance criteria also list `npm run build`, `typecheck`, `eslint` and `prettier:check`. CI runs those, and I did not run them here.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}