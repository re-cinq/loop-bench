This round closed the last open facet: ADR-002 now records that tool input is validated at the registry. I pushed it, and the branch is up to date with `origin/main` and not ahead of its upstream.

The CI failure in the brief was one red test, the enum rejection in `registry.test.ts`. It was already fixed by the previous commit, `00db75c`, which derives the rejection path from `dataPath` when `instancePath` is absent. I ran `registry.test.ts` here and all 5 tests pass. That red test was one I wrote, and there were no regressions.

I ran no acceptance tests, per the instructions. The ADR-002 change is documentation only, so I wrote no new test. I ran prettier over the two files I changed and nothing else from CI's checklist.

The ADR line says validation uses Ajv, not Zod, and the ADR's existing "proposed" text still names Zod. I left that wording alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ADR-002 note on registry input validation (enum-path CI failure already fixed in 00db75c)","tdd_next":"acceptance green"}}