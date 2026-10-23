The round is pushed and the branch is in sync with its upstream. It delivered the summing step, but the ticket is not done.

**What changed**
- `src/orchestration/orchestratorHelpers.ts`: new `sumUsage(total, next)`. It adds the three token fields when both rounds reported usage. If a round reported nothing, it returns the other side. It returns `undefined` only when neither reported.
- `src/orchestration/chatOrchestrator.ts`: `lastUsage = sumUsage(lastUsage, outcome.usage)` replaces the keep-the-last-round assignment. A turn with no tool calls still passes the same object it did before.
- `src/orchestration/orchestratorHelpers.test.ts`: one new test, `sumUsage` adds every token field of two rounds that both reported usage. It failed first (`sumUsage` not exported), then passed (5/5 in that file).
- `.lore/dod.md`: nothing ticked. I appended one unchecked facet for the `sumUsage` undefined-branch test, since that branch has no pinned test yet.

**Facets still open**
- The public type contract and the rename of `lastUsage`. It now means a total, but the name still says "last".
- The undefined-branch unit test (the new facet).
- Hooks spec and CHANGELOG.
- The Jest run needed `node --experimental-vm-modules`, as `npm test` uses. I ran only the helper test file.

**Tests**
- No round brief existed, so this is the first round and there was no CI verdict to fix.
- I did not run the acceptance file or `chatOrchestrator.test.ts`, per the rules. The no-tool guard should still hold by reading the code, but CI will confirm it.
- Red tests I wrote: 1, now green. Regressions: none known; CI has not yet run this push.
- The lore tools (`lore_*`, `lore-query-trace`) are not available in this session, so I could not run the `tests_covering` trace or read CI failures from the gateway. Dependent steps were skipped.
- I did not run the formatter's check, lint, typecheck, or build. Prettier was applied to the three changed source files, and it reported them unchanged.

**Unrelated smells noticed, not touched:** none beyond the `lastUsage` naming, which is in-scope for the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum each token field across reported rounds (both-defined case)","tdd_next":"cover sumUsage undefined branches with a unit test"}}