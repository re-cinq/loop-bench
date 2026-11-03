The acceptance tests for #95 are committed and pushed, and they fail for the reason the ticket states.

**Strategy: `direct`.** `createChatOrchestrator` with `hooks.onError` and a provider that rejects with a chosen value can be driven today.

**State of the branch.** A previous round had already committed the test file and `.lore/dod.md` (`cd84d56`). I checked them against the ticket and kept them. In this round I changed one thing: the DoD listed the test under a `%s` template title, which the runner never emits as a test name. I replaced it with three entries, one per real title. That is commit `59730fe`, pushed to `origin/loop-bench/95`. The branch is 0 commits behind `origin/main` and has no merge to do.

**Red run.** Command run (needs the ESM flag, which the repo's Jest setup requires):

```
NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/chatOrchestrator.onError.acceptance.test.ts
```

Output (abridged):

```
FAIL src/orchestration/chatOrchestrator.onError.acceptance.test.ts
  ● onError for a rejection that is not an Error › calls onError once with an Error wrapping a string, and still rejects the caller with the original
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
    Received array:  []
  ● ... wrapping a plain object ...  (same: Expected length 1, Received length 0)
  ● ... wrapping undefined ...       (same: Expected length 1, Received length 0)
Tests:       3 failed, 3 total
```

The caller-side assertion (`expect(outcome).toEqual({rejectedWith: rejection})`) passes in all three cases. The failure is only that `onError` is never called, which is the ticket's claim.

**Test file.** `src/orchestration/chatOrchestrator.onError.acceptance.test.ts` holds three `it.each` cases. Each one checks that `onError` runs once with an `Error` whose `cause` is the rejected value, and that the caller still gets the original.

**Not covered by the tests (per the DoD facets):** the production change in the `catch` of `chatOrchestrator.ts`, the spec line in `specs/hal-engine-config-hooks/spec.md`, and the CHANGELOG entry. These are still owed.

**Not run here:** CI runs the full checklist from the ticket on every push, including the lint, typecheck and build steps.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}