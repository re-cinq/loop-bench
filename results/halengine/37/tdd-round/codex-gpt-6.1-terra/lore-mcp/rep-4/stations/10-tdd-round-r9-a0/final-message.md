Committed and pushed the additional-property path fix. Rejections now name the escaped JSON Pointer path without including the property value.

The new test failed before the fix and passed afterward. CI’s previous typecheck timed out without reporting a file-level finding; it was not rerun locally. Red tests observed: **1 mine, 0 regressions**. The branch is current with `origin/main` and its upstream.

The remaining unit tests and documentation updates are still open. No unrelated smells were investigated.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Report escaped paths for explicitly disallowed properties","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}