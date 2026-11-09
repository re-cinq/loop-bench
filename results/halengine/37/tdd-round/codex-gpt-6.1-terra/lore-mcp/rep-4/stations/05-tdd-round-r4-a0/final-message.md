Committed and pushed the CI repairs in `3c5197d`. The branch is up to date with `origin/main` and its upstream.

The new focused test passed locally before and after the import change, so it did **not** reproduce CI’s module-resolution failure; CI must verify the repair. The previous CI verdict reported two failing test files, both added on this branch, and no identified pre-existing test regressions. No unrelated issues were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Address CI validator module resolution and dynamic privacy test lint findings","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}