Moved `beforeSession` inside the `try`, added a focused test, and updated the spec and DoD. The changelog remains for the next round. Commit `024ebd5` is pushed, the branch is clean and up to date with `origin/main`.

The test I wrote failed before the change and passed after it. That is **1 red test of mine; 0 regressions reported**. The CI lookup returned 404 for the branch, so no CI verdict was available. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"move beforeSession into try and document cleanup guarantee","tdd_next":"document existing-consumer impact in CHANGELOG"}}