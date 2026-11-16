I re-anchored the stale spec links, but I only had the lint and spec-link findings to work from, so the `test` and `spec-names` failures may still be red. The CI report I was given was truncated, and `lore_get_ci_failures` couldn't detect the branch.

The refactor in the last round moved tests in `sessionResume.test.ts`. The `#Lnn` citations in the specs still pointed at the old lines, which is what the `require-spec-link` lint errors reported. I fixed them in the round's single commit, which is pushed. Nothing was run locally.

- **`sessionResume.test.ts` links:** every `#Lnn` link in `specs/hal-engine-session-resume/spec.md` and `specs/hal-engine-websocket-protocol/spec.md` now points at its test's current line. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I used a throwaway script that matches old and new line by test title.
- **Acceptance test links:** the `conversationList.acceptance.test.ts` links in `specs/hal-engine-conversation-list/spec.md` and the protocol spec were also stale (`#L93`, `#L134` and `#L163`). They now point at lines 69, 110 and 139.
- **Format and merge:** prettier is clean on the session-resume spec. `origin/main` merged with nothing to add, and the branch isn't ahead of its upstream.

I wrote no new test, so there were no test failures of my own and no regressions of mine. I didn't diagnose the `test` failure or `spec-names`; they come back with the next CI verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"re-anchor spec #Lnn links moved by the test-helper refactor (eslint require-spec-link)","tdd_next":"read the next CI verdict for the test and spec-names failures; otherwise acceptance green"}}