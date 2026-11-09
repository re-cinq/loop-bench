The round is complete. Summary:

**What this round owed:** The previous round's helper dedupe (`8d4dde3`) moved the test *runs with the session untouched when beforeSession throws* from `chatOrchestrator.test.ts` line 145 to line 118, leaving the spec citation stale. The round brief named the two resulting CI failures — `eslint` (`require-spec-link`: the test at 118:5 had no citation whose `#Lnn` fell inside its span) and `spec-names` (citation named the test but pointed at the old line).

**What I did:**
- Read the rule source (`require-spec-link.mjs`) to confirm the fix shape: a test is linked when a citation's line falls inside the test's span — so repointing the spec-side citation to #L118 clears both findings at once.
- Ran the brief's prescribed repair, `npm run spec:names -- --fix`: one citation repointed in `specs/hal-engine-config-hooks/spec.md:25` (#L145 → #L118).
- Verified locally: `spec:names` passes (589 citations, 0 findings) and `check:spec-links` passes (0 misplaced across 1639 statements). The repo's prettier scope is `{src,scripts,smoke}/**/*.ts` only, so nothing to format for a markdown-only change. I did not run eslint itself, per the delivery rules — CI judges the push.
- Committed as `de4c1fb`, pushed, and merged `origin/main` (already up to date). `git status` confirms the branch is not ahead of its upstream.

**Test accounting:** 0 red tests mine (I wrote no test this round — all three facets were already ticked; the only owed work was this traceability repair), 0 regressions (the failures were lint/traceability findings, not test failures). No tests ran in this pod.

**Unrelated smells noticed, not acted on:** the repo has both `scripts/repoint-spec-anchors.mjs` and the plugin's `cli/reanchor.mjs` alongside `check-spec-anchor-names.mjs --fix` — three overlapping repair paths for the same drift; worth consolidating someday, its own ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"stale spec anchor repointed — eslint require-spec-link and spec-names CI findings cleared","tdd_next":"acceptance green"}}