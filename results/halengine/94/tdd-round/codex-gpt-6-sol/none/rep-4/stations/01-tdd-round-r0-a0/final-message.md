Committed and pushed `382e41d`. The new test failed before the fix and passed after `beforeSession` moved inside `try`; the spec and changelog now describe cleanup after partial setup. I ran only that test file. The branch is up to date with `main` and its upstream.

Red tests: 1 written this round; 0 known regressions. CI has not judged this push yet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block and document the hook guarantee and consumer change","tdd_next":"acceptance green"}}