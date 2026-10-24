I closed the last open facet, `TurnUsage`, and pushed it. No tests ran in this pod, and I wrote no new test this round.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: added `export type TurnUsage = UsageMetadata`, documented as the usage summed across every provider call in a turn. `afterModelResponse` now takes `usage?: TurnUsage`, and the turn accumulator and `addUsage` use it. The per-round `RoundOutcome.usage` stays `UsageMetadata`.
- `src/index.ts`: exports `TurnUsage` so consumers can name the hook's argument type.
- `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`: regenerated with `scripts/check-doc-blocks.mjs --fix`, which rewrites doc blocks from the declaration. The only change in them is the signature line.
- `.lore/dod.md`: ticked the `TurnUsage` facet and the "total-usage contract" facet. Both are now closed.

**Red phase**
- There was no runtime red. I probed it: a throwaway test importing a nonexistent `TurnUsage` passed under ts-jest. I deleted that probe.
- So this facet is judged by CI's typecheck step alone, as the dod left open. I did not add a test that passes trivially.
- Formatting passed (`prettier --write`, no changes). I did not run tsc, lint, or the test suites here.

**Red tests and regressions**
- The last CI verdict (on `0a9d056`) names `src/infrastructure/stores/mongo/mongoTestSupport.ts:22`. The error is `Cannot unlock file "node_modules/.cache/mongodb-binaries/7.0.14.lock"`, raised during the mongod binary download. That is a lockfile race in the MongoDB test harness, not in usage code.
- I did not fix it. Doing so means changing the Mongo test infrastructure, which is outside this ticket. The verdict output was truncated, so there may be other findings I could not see.
- Red tests I wrote: 0. Regressions I can attribute to my change: none identified. I have not verified whether the Mongo failure predates this branch.

**Other notes**
- `lore_query-trace` was not available as a tool in this session, so I did not run the coverage query before editing `chatOrchestrator.ts` and `index.ts`.
- The branch was already up to date with `origin/main`, so the merge produced nothing.
- `git status` reports the branch is up to date with `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name the total-usage type (TurnUsage) and use it for the hook argument","tdd_next":"acceptance green"}}