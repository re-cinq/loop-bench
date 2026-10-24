Round done for facet 2 (summing usage across provider rounds). Commit `50aaeca` is pushed; `HEAD` matches `origin/loop-bench/93` and the branch is not ahead of upstream. `origin/main` was already merged in, so nothing further was needed.

**What changed**
- `src/orchestration/orchestratorHelpers.ts`: new `addUsage(total, usage)`. It sums the three token fields over rounds that report usage, skips rounds that don't, and returns `undefined` when nothing has reported. With no prior total it returns the round's own usage object, so a single-round turn reports exactly what it does today.
- `src/orchestration/chatOrchestrator.ts`: the `lastUsage = outcome.usage ?? lastUsage` overwrite is now `totalUsage = addUsage(totalUsage, outcome.usage)`, and the hook receives `totalUsage`.
- `src/orchestration/orchestratorHelpers.test.ts`: one new `addUsage` test. I saw it fail (the export was missing), then pass (5/5 in that file).
- `specs/hal-engine-config-hooks/spec.md`: the `chatOrchestrator.ts#L150` link moved to `#L151` after the import line shifted. There is no `reanchor.mjs` in this repo, so I fixed it by hand.
- `.lore/dod.md`: ticked the sum facet.

**Judgement calls**
- I kept the local variable's type as `UsageMetadata`. I did not rename the public type or change the hook signature; that is facet 1.
- I did not touch the CHANGELOG (facet 4) and did not re-check the no-tool regression guard (facet 3).

**Not verified here**
- The acceptance tests in `chatOrchestratorUsage.acceptance.test.ts` were not run, per the rules. From the code, both should now pass, but CI is the judge.
- `chatOrchestrator.test.ts` was not run either. Its "receives collected response text and usage" test should still pass, because single-round turns get the same object back.
- The repo runs Jest, not Vitest, so I used `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`.
- No typecheck, lint, or build was run, as instructed.

**Tooling gaps**
- The lore MCP server failed to connect (`CONNECTION_CLOSED`), so I could not run `lore-query-trace`, `lore_get_ci_failures`, or the context lookups. I used grep over `specs/` for the coverage question.
- There was no `round-brief.md`, so there is no CI verdict yet and no regression count. Of the red tests, I wrote one this round, and it is green locally. Known regressions: none.

**Observations, not acted on**
- `specs/hal-engine-config-hooks/spec.md:28` already states the summed behaviour and cites the acceptance test, so the spec was ahead of the code on this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}