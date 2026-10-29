Committed and pushed `896e3a1`. This round’s new test failed on an unescaped required-property path, then passed after the fix. I also repaired the CI-reported type, lint, and spec-link findings. The branch is up to date with `main` and its upstream.

Red tests: 1 written this round; 0 identified regressions. CI has not judged this push yet. The remaining unit tests and documentation are the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Escape required property names in reported JSON Pointer paths and repair CI findings","tdd_next":"Add remaining unit tests and update documentation and changelog"}}