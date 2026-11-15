This round fixed the red build's findings and pushed, but it closed no facet. The no-`listFor` conflict (empty list vs `UNSUPPORTED` error) is still open.

**What changed (commit `36e60a5`, pushed to `loop-bench/144`):**
- **spec-names (80 findings):** ran `scripts/check-spec-anchor-names.mjs --fix`. It repointed stale `#Lnn` citations by test name across 7 spec files. The check now reports 0 findings.
- **eslint `require-spec-link` at `messageHandler.test.ts` 710, 726, 743, 760:** 710, 743 and 760 were already cited in the protocol spec, and the repoint put them on the right lines. 726 had no citation, so I added one under the §4.1 ordering statement.
- **eslint `no-duplicate-code` at 768/801:** the two `list_sessions` tests shared a 7-line connection setup. I moved it into a `connectionFor` helper in the same describe block.
- Prettier check passes on every changed file. `check:spec-links` and `check:spec-status` are clean.

**Not fixed:** CI's failure list in the brief was truncated, and `lore_get_ci_failures` returned 404 for `loop-bench/144`. Any eslint findings past the ones above are unknown. I could not run `lore-query-trace` against the branch's coverage, so I did not use it.

**Tests:** this round ran no tests. The `spec:names` and `check:spec-links` scripts ran, but they are not test runs. Red tests this round: none of mine. Regressions: none that I can see; CI has not yet judged this push.

**Dod checklist:** nothing ticked, since no facet closed. The `listFor` conflict facet is still unresolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI findings fixed: spec-names, eslint require-spec-link at 726, no-duplicate-code at 768/801)","tdd_next":"resolve no-listFor conflict: error (UNSUPPORTED) instead of empty session_list"}}