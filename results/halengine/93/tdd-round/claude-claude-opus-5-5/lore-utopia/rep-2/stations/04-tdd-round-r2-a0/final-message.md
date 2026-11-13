This round fixed the red build from the last push. No code changed: the only edit is to the spec file.

**Cause:** In `specs/hal-engine-config-hooks/spec.md`, lines 28 and 29 each had two separate `([validated by …])` groups in a row. The spec-links checker only accepts links in a statement's last parenthetical, so it flagged the first group on each line as misplaced. The eslint `require-spec-link` errors named the same two tests (lines 44 and 36), so they very likely came from those misplaced links too.

**Fix:** On each line I merged the two links into one trailing parenthetical, separated by a comma, which is how the other specs in the repo cite more than one test.

**Checks:**
- `node scripts/check-spec-links.mjs` now reports `misplaced: 0`.
- I did not run eslint in this pod (memory limit), so CI's next run is what confirms those two errors are gone.
- No tests ran here: this round wrote no test.

**Delivery:** I ran prettier on the spec, committed, and pushed. `origin/main` was already merged in, and the branch is level with its upstream.

**Red count:** both failures in the brief were mine (spec-link wiring for the usage tests); none were regressions.

**Still open in `.lore/dod.md`:** "Bump the MINOR version when the release is cut". That is release work, not code for this branch.

**Unrelated smells:** none seen.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI spec-links/eslint findings: merge usage-test links into each statement's trailing parenthetical","tdd_next":"acceptance green"}}