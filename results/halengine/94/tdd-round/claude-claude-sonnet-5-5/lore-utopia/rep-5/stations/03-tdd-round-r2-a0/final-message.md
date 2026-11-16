This round only repointed the spec citation that `spec-names` flagged. It fixes the one finding in the brief. I ran no tests, and the acceptance test wasn't touched.

- **Fix:** `npm run spec:names -- --fix` moved the `beforeSession` citation in `specs/hal-engine-config-hooks/spec.md` from `#L40` to `#L32`, where the test now sits. I ran prettier on the spec and pushed.
- **Branch state:** `origin/main` had nothing new to merge, and the branch is not ahead of its upstream.
- **Red tests:** none were mine and none were regressions, since I wrote no test this round.
- **Unrelated smells:** none noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repoint spec citation for beforeSession test to #L32 (spec-names fix)","tdd_next":"acceptance green"}}