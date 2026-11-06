This round fixed the one CI finding, the `spec-names` check. The citation for "compiles a static tool schema once across ten execute calls" pointed at `#L50`, but the test is at `#L49`.

I ran `npm run spec:names:fix`, which repointed that one citation in `specs/hal-engine-tool-input-validation/spec.md`. A rerun of `npm run spec:names` reports all 402 citations match their tests. Prettier is clean on the file.

The fix is committed and pushed. `origin/main` was already merged in, and the branch is not ahead of its upstream.

I wrote no new test and ran no tests here. No red tests were mine to fix, and none were regressions. All four facets in `.lore/dod.md` were already ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repointed spec citation for the ten-execute-calls test to #L49 (spec-names CI finding)","tdd_next":"acceptance green"}}