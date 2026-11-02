This round repaired the CI findings from the last push. It did not run a red-green-refactor cycle, because the branch already had all facets ticked and the only open work was the red verdict.

**What CI reported:** `eslint` (three `require-spec-link` errors on `chatOrchestrator.test.ts` at L444, L563 and L658) and `spec-names` (15 stale `#Lnn` anchors). All of them come from the same cause: tests inserted above these ones moved their declarations, and the spec citations still pointed at the old lines.

**What I did:**
- Ran `npm run spec:names -- --fix`, which repointed 15 citations by test name. The fix touched `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md` and `specs/hal-engine-tool-input-validation/spec.md`.
- Re-ran `npm run spec:names`: 605 citations name the test they point at, and it exits 0.
- Confirmed that lines 444, 563 and 658 of `chatOrchestrator.test.ts` are now the declarations the spec cites. The eslint rule was not run here, because the ticket's lint step is known to OOM in this pod. Its three findings should clear with the anchors fixed.
- Ticked a new facet in `.lore/dod.md` for the anchor repair.
- Committed as `0920c2e`, merged `origin/main` (already up to date, no new commits), and pushed. `git status` reports the branch is not ahead of its upstream.

**Not run here:** No tests, lint, typecheck or formatter ran in this pod. The spec-link script is Markdown-only, so prettier does not apply to the changed files. CI will judge the push.

**Test accounting:** I wrote no new tests this round. Of the red findings in the last CI run, none was a failing test: they were spec-link and anchor-name findings, so no regressions are involved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repointed stale validated-by anchors named by CI (eslint require-spec-link L444/L563/L658 and spec-names)","tdd_next":"acceptance green"}}