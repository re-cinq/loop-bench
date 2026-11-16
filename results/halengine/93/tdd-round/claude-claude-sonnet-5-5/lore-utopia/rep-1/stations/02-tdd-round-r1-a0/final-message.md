I fixed the one CI finding. The `eslint` job failed because the second acceptance test had no spec link. I added a statement for it in `specs/hal-engine-config-hooks/spec.md`. The statement says a round with no usage doesn't poison the total, and a turn where nothing reported passes `undefined`. It links to `chatOrchestratorUsage.acceptance.test.ts#L67`.

This round changed only the spec, so I wrote no new test and ran no tests or lint here; CI judges the push. Prettier left the spec unchanged. The branch is pushed and not ahead of its upstream. `origin/main` was already merged.

All red items were mine, and there were no regressions. I didn't tick any `.lore/dod.md` facets, because they were already ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec link for unreported-usage acceptance test (eslint require-spec-link)","tdd_next":"acceptance green"}}