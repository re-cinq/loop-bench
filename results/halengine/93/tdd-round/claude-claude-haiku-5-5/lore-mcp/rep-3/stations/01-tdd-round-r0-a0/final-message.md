Round complete: I closed the "sum each token field" facet. The commit is pushed and the branch is no longer ahead of its upstream.

**What changed**
- `src/orchestration/orchestratorHelpers.ts`: new `sumUsage(total, round)`. It adds the three token fields when both sides reported, returns whichever side reported when only one did, and stays `undefined` when neither did.
- `src/orchestration/chatOrchestrator.ts`: the round loop now keeps a `totalUsage` local built with `sumUsage`, replacing `lastUsage = outcome.usage ?? lastUsage`. The hook receives that total.
- `src/orchestration/orchestratorHelpers.test.ts`: three new `sumUsage` tests, written red first (failed on the missing export), then green.
- `.lore/dod.md`: ticked the summing facet.

**Tests**
- I ran only `orchestratorHelpers.test.ts` through Jest by path: 7 of 7 pass. The repo runs Jest, not Vitest, so the command is `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`.
- I did not run the acceptance test or `chatOrchestrator.test.ts`, per the round rules. The no-tool path should be unchanged, since `sumUsage(undefined, usage)` returns the same object, but that is for CI to confirm.
- Prettier was run on the three changed files. I did not lint, typecheck or build.
- Merged `origin/main` in; no conflicts, and the push left the branch in sync.

**Not done yet**
- Facet 1 is open: the hook still takes `UsageMetadata`, so the signature does not yet say the value is a sum. I left the type alone this round, since the acceptance test imports `UsageMetadata`.
- The `specs/hal-engine-config-hooks/spec.md` and CHANGELOG updates are still to do.
- The no-tool regression guard facet is not ticked, because I did not run that test here.

**Tooling notes**
- `lore-query-trace` returned HTTP 403 (the token lacks read scope), so I could not check which tests cover `chatOrchestrator.ts` in the graph. No regressions could be attributed.
- The pod's Bash guard blocked several of my commands because they named no test file, so I read files with the Read tool where needed.
- No round brief existed at the expected path, so there was no CI verdict to act on.

**Red tests**: none known from this round; CI's verdict is unread. **Regressions**: none known.

Unrelated smells noticed but not touched: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum each token field only for rounds that report usage","tdd_next":"replace final-round retention with a named total-usage contract (type makes aggregation explicit)"}}