Pushed and confirmed: branch is even with its upstream, and `origin/main` is already an ancestor (0 commits of drift — no merge needed).

## Round summary

The round brief's CI verdict on `84ad63d` named two eslint failures; both are fixed:

1. **`require-spec-link`** on `chatOrchestratorUsage.acceptance.test.ts:67` — added the spec statement it validates to `specs/hal-engine-config-hooks/spec.md`, citing the test by its title at `#L67`, in the repo's established `([validated by: …](…#Lnn))` trailing-parenthetical form.
2. **`max-expects`** on `orchestratorHelpers.test.ts:29` — reduced the two `expect` calls to one object assertion. The test's title and start line are unchanged, so the existing citation at spec line 29 stays anchored.

One more fault I fixed because it would have been the next red build: CI's job aborted at the Lint step, so the Spec anchor check never ran — running it here showed the branch's own orchestrator edit had moved the `catch` out from under the spec's `chatOrchestrator.ts#L150` code anchor (now `#L154`). The repoint script skips a spec the branch edits, so I moved label and href by hand. All three link checks now pass locally (`spec:names` 591 citations, `check:spec-links` 0 misplaced, `repoint --check` 0 stale/rotten), and prettier is clean on both changed files.

**Tests:** I ran only the file I edited — `jest src/orchestration/orchestratorHelpers.test.ts`, 5/5 green. No acceptance tests, eslint, typecheck, or build ran here, per pod limits. **Red tests mine: 0; regressions: 0** — the verdict named lint errors only, no failing test.

**dod.md:** ticked the no-tool-guard facet (the guard file is byte-identical to main, and a single round sums to itself) and appended+ticked the citation-repair facet. The two "Done when these pass" boxes stay unticked — this push is the first commit where CI's Test step will execute the acceptance tests, since Lint had been aborting the job ahead of them.

Unrelated smell noticed, not acted on: `sumReportedUsage` (`orchestratorHelpers.ts:48`) calls `reduce` with no initial value, safe only because of the length guard immediately above it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"missing-rounds acceptance test cited in the hooks spec (require-spec-link), helpers test reduced to one expect (max-expects), catch anchor repointed to its post-edit line","tdd_next":"CI verdict on the acceptance tests' first Test-step run, then tick the done boxes or acceptance green"}}