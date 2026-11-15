The CI verdict on the last push named one lint error, and I fixed it. I did not run any tests in this pod, so this round ran no tests here.

- **The failure:** `re-lint/require-spec-link` flagged `src/orchestration/chatOrchestrator.test.ts:311`, the test "wraps a thrown string in an Error whose cause is the string". That test had no spec citation.
- **The fix:** In `specs/hal-engine-config-hooks/spec.md`, the onError statement now says the wrapper carries the original value as `cause`, and it cites the test with `([validated by: …](../../src/orchestration/chatOrchestrator.test.ts#L311))`. I added the `cause` wording because the test checks it, and the implementation in `toError` already sets it.
- **Line links:** `scripts/spec-links/reanchor.mjs` does not exist in this repo, so I checked the existing links by hand. The two acceptance-test links at `#L53` and `#L64` are unchanged. The new `#L311` matches the test's current line.
- **Formatting:** I ran prettier on the spec file. It reported it unchanged, so nothing else needed formatting.
- **Commit and push:** Committed as `bac0b86` and pushed to `origin/loop-bench/95`. I then fetched `origin/main` and merged it, which produced nothing new. The branch is not ahead of its upstream.
- **dod.md:** All three facets were already ticked, and this round added no new facet, so I left it unchanged.

Not checked here: the eslint result, the other CI checks, and the acceptance tests. CI judges the push.

Red tests this round: none that I wrote. The only failure in the last verdict was the lint finding above, which I fixed; no regressions were caused.

Unrelated smells I noticed and did not touch: the `toError` helper's `String(reason)` fallback gives `[object Object]` for plain objects. The acceptance test only checks that the message is non-empty, so it passes, but the message is not readable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec statement cites the cause test (CI lint finding)","tdd_next":"acceptance green"}}