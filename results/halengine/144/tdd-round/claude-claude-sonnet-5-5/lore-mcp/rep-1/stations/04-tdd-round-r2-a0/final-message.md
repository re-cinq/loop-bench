This round fixed the stale spec citations behind CI's red verdict and pushed them. I ran no tests, because this was a documentation-only fix. CI has not yet judged the push.

- **Cause:** the previous round moved `delegatingTo` and `closeAll` out of `sessionResume.test.ts`. That shifted the line numbers of every test below them, so the `#Lnn` links in `specs/` pointed at the wrong lines.
- **Fix:** I re-anchored the links by test title in `specs/hal-engine-session-resume/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`. The repo has no `scripts/spec-links/reanchor.mjs`, so I used a throwaway script outside the repo.
- **Checks:** `npm run spec:names` and `npm run check:spec-links` pass locally (802 citations name their test, 0 misplaced), and prettier is clean on the two specs.
- **Not confirmed:** the eslint `require-spec-link` findings in the brief were truncated, and I could not read CI's log (the `lore_get_ci_failures` call returned "branch not found"). I assumed those findings come from the same stale links, so they may not all clear.
- **Branch state:** I added a `.lore/dod.md` facet, committed, and merged `origin/main` with no conflicts. The branch is pushed and not ahead of its upstream.
- **Failures:** none of the red tests were mine to write this round, and I found no regressions.
- **Still open:** the acceptance file's own `prefer-early-return` finding. Fixing it means editing an acceptance test, which I did not do, so it needs a decision.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"re-anchored spec #Lnn links for sessionResume.test.ts (CI require-spec-link/spec-names)","tdd_next":"re-check CI verdict; acceptance file prefer-early-return needs a decision"}}