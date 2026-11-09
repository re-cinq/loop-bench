Round complete. Summary:

**What this round did** — closed the last `.lore/dod.md` facet: *Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.* The spec half was already done on this branch (the under-counting line now reads "receives the summed provider-call usage for the entire turn", cited to the acceptance test); this round added the `## [Unreleased] → Changed` CHANGELOG entry stating the behaviour change in what an existing consumer records (tool-heavy turns now report larger totals, typed `TurnUsage`, no-tool turns unchanged, MINOR bump), and ticked the facet. Committed as `61535fe`, pushed; `origin/main` hasn't moved since the merge base, so the branch is clean and up to date with its upstream — confirmed by `git status`.

**Tests** — this round ran no tests here: the deliverable is prose-only (CHANGELOG.md + .lore/dod.md, both outside the repo's formatter glob), a test over changelog text would pin repo prose rather than behaviour, and the existing bar — the two acceptance tests in `src/orchestration/chatOrchestratorUsage.acceptance.test.ts` and the unedited no-tool guard `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` — is CI's to judge on the push. No CI verdict existed for this branch before the push (`lore_get_ci_failures` returned "branch not found"), so there were no findings to repair and no regressions to attribute: 0 red tests mine, 0 regressions.

**Future improvements (named, not acted on)**
- `src/orchestration/chatOrchestrator.test.ts:29,42,90,399,563` plus the acceptance test's `scriptedProvider`: six ad-hoc inline round-scripting providers reimplement the same fixture — a refactor round could extract one scripted-provider helper.
- `specs/hal-engine-config-hooks/spec.md` names `TurnUsage` nowhere; the statement could cite the exported type by name once the type's own statement carries a test citation.

All four facets in `.lore/dod.md` are now ticked; the acceptance tests and CI's full gate decide whether the ticket is done.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"hooks spec and CHANGELOG record the aggregate-usage behaviour and its impact on existing consumers","tdd_next":"acceptance green"}}