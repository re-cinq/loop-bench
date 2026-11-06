I finished this round: a non-`Error` rejection now reaches `onError`, and the commit is pushed. The branch is level with `origin/loop-bench/95` and already up to date with `origin/main`.

**Red:** I added one test to `src/orchestration/chatOrchestrator.test.ts`: `wraps a thrown string in an Error whose cause is that string`. It failed for the expected reason: `onError` never received an `Error` and its `cause` was `undefined`, because of the `instanceof Error` gate.

**Green:** `src/orchestration/chatOrchestrator.ts` now always calls `onError` with `asError(error)`. An `Error` passes through as it is. Anything else is wrapped in a new `Error` whose `cause` is the original value. A string becomes the message; anything else gets its JSON form, or `String()` if that fails. That fallback matters because `JSON.stringify` throws on a circular object, and an exception inside the `catch` would replace the caller's rejection. The `throw error` is unchanged, so the caller still gets the original value.

**Tests:** I ran only `chatOrchestrator.test.ts`, and all 27 tests passed, including the three existing `Error`-instance tests. I didn't edit those tests; I only widened the `createErrorProvider` helper's parameter from `Error` to `unknown`. I didn't run the acceptance tests, the full suite, lint or the typechecker; CI judges those on this push. Of the red tests, one was mine and was red only before the fix; I saw no regressions.

**Traceability:**
- I added a validated-by link for the new test to the `onError` statement in `specs/hal-engine-config-hooks/spec.md` and noted the `cause` there.
- The new test shifted the line numbers below it, and there is no reanchor script, so I re-anchored every `chatOrchestrator.test.ts` link by test title. Fifteen links moved, in the architecture, config-hooks and tool-input-validation specs.
- That spec's Status is already Shipped.
- I stamped no spec anchor on the test: this repo's `tests.list` has no way to carry one.

**dod.md:** I ticked the code-change facet and the facet confirming the existing `Error` tests stay green. Three are still open: the CHANGELOG entry, plus two I added from the ticket — pinning an `undefined` rejection, and pinning that an `Error` reaches `onError` as the same instance rather than a wrapper.

**Unrelated issues I noticed and left alone:**
- `specs/hal-engine-architecture/spec.md` already failed Prettier before my change. CI's `prettier:check` only covers `.ts` files, so it doesn't catch this.
- `onErrorNonError.acceptance.test.ts` and `chatOrchestrator.test.ts` each build their own copy of the throwing provider.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce a non-Error rejection to an Error (cause preserved) so onError always fires","tdd_next":"CHANGELOG.md entry under [Unreleased] for the onError behaviour change"}}