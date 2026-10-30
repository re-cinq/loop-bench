Committed and pushed the round. The new test caught an ambiguous required-property path; rejection paths now escape `/` as `~1`. The focused test file passed after the refactor. I also fixed the lint error reported by the previous CI run. The branch is up to date and fully pushed.

Red tests this round: 1 new test, 0 regressions. Unit tests, spec links, and documentation remain for the next round. No unrelated smells were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Escape JSON Pointer separators in rejection paths and repair the reported lint error","tdd_next":"Remaining unit tests, spec links, and documentation updates"}}