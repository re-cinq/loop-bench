This round added and pushed an enum-rejection test, but I couldn't read CI's verdict, so I don't know what was red.

`lore_get_ci_failures` returns a 404 for this branch, and the failure text in the brief is only a truncated coverage table. My best guess is a jest coverage-floor miss on `src/orchestration/tools/`. `registry.ts:66`, the `enum` error describer, wasn't exercised by the tests I wrote earlier. Whether the acceptance tests cover it I can't tell, because I'm not allowed to run them. The test I added is the smallest change that closes that gap.

- **What I ran:** `registry.test.ts` (5 tests) and `chatOrchestrator.test.ts` (23 tests) both pass locally. I did not run the full suite or the acceptance file.
- **What I added:** a test in `registry.test.ts` that rejects a value outside a declared `enum`, and asserts the executor isn't called and the offending value isn't in the message. `specs/hal-engine-tool-input-validation/spec.md` has a new statement linking to it at `#L77`.
- **Branch state:** committed and pushed. Merging `origin/main` brought in nothing, and the branch isn't ahead of its upstream.
- **Reanchoring:** `scripts/spec-links/reanchor.mjs` doesn't exist in this repo. I appended the test at the end of the file, so no existing `#Lnn` link shifted.
- **Red tests:** none locally, so no regressions and none of my own. CI's red `test` job is unexplained.
- **Next:** re-read CI's verdict on this push. If the coverage floor is still red, the failing group's number will be in the log.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"enum rejection test (covers enum error describer in registry.ts)","tdd_next":"re-check CI test verdict on this push (lore API 404 on branch this round)"}}