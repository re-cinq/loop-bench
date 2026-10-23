The CI finding is fixed and pushed, but I stopped before the open facet because I could not write a red test for it here.

**CI finding (fixed):** `spec-names` reported that `specs/hal-engine-config-hooks/spec.md` cited "stays undefined while no round has reported usage" at `orchestratorHelpers.test.ts#L42`, but the test sits at L41. I ran the step's own `npm run spec:names -- --fix`, which repointed that one citation, formatted the file, and confirmed the check passes (593 citations). Committed as `b1973d4` (`docs(specs): repoint usage citation to its test's current line`) and pushed. The branch is not ahead of its upstream. `origin/main` was already merged, so there was nothing to merge.

**Open facet (not done):** "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit." The hook's `usage` parameter is still typed as the plain `UsageMetadata`, so the signature does not yet say it is a sum. That is ticket acceptance criterion 4, and it is still unmet.

I did not make the type change because:
- The facet is type-only. No runtime assertion can go red on a rename, and the repo has no type-test convention.
- The only way I can see to red-test it is a compile-time `@ts-expect-error` test under ts-jest. That typechecks in this pod, which the round rules forbid.
- A type change with no red test would skip the tdd-loop's red phase.

To unblock, someone needs to pick one of these:
1. Accept a type-only alias (for example `TurnUsage`) as a refactor with the existing green bar and no new test, and say so in the commit.
2. Approve a compile-time type test that CI runs and this pod does not.

**Tests:** I ran no tests this round. I wrote none, so my red count is 0. The only CI verdict I was given named `spec-names`, so I see no regressions. `.lore/dod.md` is unchanged: the open facet stays unticked.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Open facet 'replace final-round retention with a named total-usage contract' is type-only; no runtime test can red it here and a ts-jest type test would typecheck in this pod, so it needs a decision: accept a type-only refactor with no red test, or approve a CI-run type test."}}