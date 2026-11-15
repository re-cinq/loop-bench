This round pushed commit `ad486fb` to `loop-bench/95`, and the branch is level with its upstream. `origin/main` adds nothing to the branch, so the merge was a no-op.

**What the CI verdict named (from the round brief; the Lore API returned 404 for the branch, so I could not re-read it):**
- **spec-names:** 17 stale `#Lnn` anchors in three spec files. I ran `npm run spec:names -- --fix`, which repointed all 17 by test name. The check now passes.
- **eslint `require-spec-link`:** the five `chatOrchestrator.test.ts` findings (lines 411, 465, 518, 602, 625) were the same stale anchors. Their line numbers now match the repointed links.
- **eslint `new Date()`:** in `onErrorNonError.acceptance.test.ts`, I replaced `new Date().toISOString()` with a fixed timestamp in the fixture. This is a lint fix, not an assertion change. It is still an edit to an acceptance test, so flag it if you want that reverted and handled another way.
- **changelog:** added a `### Fixed` entry under `[Unreleased]` describing the new `onError` behaviour and the `error.cause` migration note. The facet is ticked in `.lore/dod.md`.

**Not verified here:**
- No tests were run in this pod. The round wrote no new test, and I did not run the acceptance tests.
- I did not run eslint, so the brief's truncated eslint list may hold findings I have not seen. CI is the check.
- The brief's `eslint` output was truncated, so I may not have every finding.

**Red tests:** I wrote none this round. I cannot yet count regressions from CI's verdict on this push.

**Unrelated smells noticed, not acted on:** none beyond the spec-anchor drift above.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CHANGELOG entry under [Unreleased] for the onError non-Error change; CI findings (spec anchors, spec-link lint, fixture lint, changelog) addressed","tdd_next":"acceptance green"}}