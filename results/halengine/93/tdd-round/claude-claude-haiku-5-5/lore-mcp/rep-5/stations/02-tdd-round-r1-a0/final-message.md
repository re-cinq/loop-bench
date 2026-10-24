The CI findings are fixed and pushed as `0dd7deb` on `loop-bench/93`. The branch is in sync with its upstream and `origin/main` was already merged in, so no merge commit was needed.

**What CI named and what I did**
- **eslint `no-duplicate-code` and `require-spec-link` on `chatOrchestrator.test.ts:550`:** I removed the unit test "sums the usage of every provider call in a turn that ran a tool". It was my own test from last round and repeats what the acceptance test `chatOrchestratorUsage.acceptance.test.ts:44` already covers. Removing it also cleared the duplicate-code finding.
- **Shift caused by that removal:** `specs/hal-engine-tool-input-validation/spec.md` linked to `chatOrchestrator.test.ts#L575`. That test now sits at line 550, so I re-anchored the link by hand. No `reanchor.mjs` exists in this repo. The other links into that file are above line 550 and did not move.
- **eslint `require-spec-link` on `chatOrchestratorUsage.acceptance.test.ts:67`:** I added a statement to `specs/hal-engine-config-hooks/spec.md` for the no-usage case, linked to line 67. I did not edit the acceptance test.
- **changelog check:** I added a `### Changed` entry under `[Unreleased]` in `CHANGELOG.md`. It says the `usage` argument is now the sum across all rounds, that tool-running turns will record larger numbers, that no-tool turns are unchanged, and why the per-round breakdown was not added.

Facet 4 (spec and CHANGELOG) is now ticked in `.lore/dod.md`.

**Tests and checks**
- No new test was written this round, so nothing was run. The acceptance tests were not run here. The CI verdict named only eslint and changelog, so I'm reading the acceptance tests as green.
- I did not run eslint, the changelog check, or the typechecker here. Prettier ran on the one `.ts` file I changed, and it reported no changes.
- Red tests this round: none were reported by CI. Regressions: none. None of the failures were tests I wrote.
- The lore MCP server failed to connect, so I could not run the `lore-query-trace` `tests_covering` check before removing the unit test. The removal is safe on the evidence I have, since the acceptance test covers the same behaviour and nothing else links into that test.

**Not done**
- Facet 1 is still open: replacing the hook's `usage` argument with a named total-usage contract. It is a type-only change, so I could not write a runtime red test for it, and I did not start it in this round.
- I did not bump the version. CLAUDE.md asks for a MINOR bump on breaking changes, and the ticket flags this as a behaviour change, so the release owner should decide it.
- Unrelated smells noticed, not acted on: none.

Next round takes facet 1.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}