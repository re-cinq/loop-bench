I fixed the eslint error and the spec-names findings from CI's verdict and pushed. I couldn't see why the `test` check failed, so that one is still open.

- **eslint:** `chatOrchestrator.test.ts:441` read `executor.mock.calls.length`, three hops deep. I hoisted `executor.mock.calls` into a local, so the expect now reads `.length` off it.
- **spec-names:** `check-spec-anchor-names` reported 7 stale `#Lnn` citations in `specs/hal-engine-architecture/spec.md`. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I ran `check-spec-anchor-names.mjs --fix`, which repointed all 7. The check is now clean.
- **test:** the log tail CI gave me was truncated to coverage output, and `lore_get_ci_failures` returned "branch not found" (404) for `loop-bench/37`. I couldn't see which test failed. The two test files this branch touches pass locally: `chatOrchestrator.test.ts` 23/23 and `registry.test.ts` 5/5. I didn't run the acceptance tests, per the brief. The next round should start from CI's verdict on this push.

The merge with `origin/main` was already up to date, and the branch is not ahead of its upstream. Of the findings this round, none were regressions, and all were mine. I noticed no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI findings: eslint member-chain in orchestrator test, repoint 7 stale spec anchors","tdd_next":"read CI verdict on the 'test' check (log was truncated); acceptance green if clean"}}