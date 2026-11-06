This round fixed a broken spec link and pushed it. No tests ran here, and none were written.

- **CI verdict:** the only failure was `eslint: timed out after 10 minutes`, with no file or line. `ci.yml` sets no step timeout, so this looks like the run hit a time limit rather than eslint flagging anything. I didn't run eslint here because the pod's memory is too small for it. The new push starts a fresh CI run, which will give the real verdict.
- **Fix:** two lines added to `chatOrchestrator.ts` earlier on this branch shifted its line numbers. That left the `onError` link in `specs/hal-engine-config-hooks/spec.md` pointing at `#L151` (the `catch` line) instead of `#L152` (the `instanceof Error` check it describes). I fixed both the link text and its target, ran prettier on the spec, and added a ticked facet for it in `.lore/dod.md`.
- **Delivery:** committed and pushed. The branch already contained `origin/main`, so the merge changed nothing, and `git status` shows it in sync with its upstream.
- **Red tests:** 0 mine and 0 regressions. No red test is named in CI's verdict.
- **Unrelated issue, left alone:** the repo has no `scripts/spec-links/reanchor.mjs`, so `#Lnn` links like this one are only kept current by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Re-anchor spec onError citation to chatOrchestrator.ts#L152 after line shift","tdd_next":"acceptance green"}}