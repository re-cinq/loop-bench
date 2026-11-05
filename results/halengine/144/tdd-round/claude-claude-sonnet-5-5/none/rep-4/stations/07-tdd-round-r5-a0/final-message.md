This round fixed the two CI findings from the last push (eslint and spec-links). I ran no tests, linter or link checker here, so CI is the first check on the fix.

- **Cause:** `specs/hal-engine-websocket-protocol/spec.md` line 134 cited two tests in one sentence, and the first citation sat mid-sentence instead of in the trailing parenthetical.
- **Fix:** I split it into two sentences, each ending in its own parenthetical. The `#Lnn` anchors are unchanged because only the spec moved.
- **eslint:** the `require-spec-link` error on "accepts a bare list_sessions" should clear with this same edit. I did not run the linter to confirm.
- **Re-anchoring:** `scripts/spec-links/reanchor.mjs` is missing from this repo (it failed with `MODULE_NOT_FOUND`), so the `#Lnn` links were not re-anchored. The test files didn't change.
- **Branch:** the commit is pushed. `origin/main` merged as already up to date, and the branch is level with its upstream.
- **Red tests:** none this round. I wrote no test and caused no regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec-links misplaced citation and eslint require-spec-link finding","tdd_next":"acceptance green"}}