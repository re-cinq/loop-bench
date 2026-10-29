Committed and pushed `da5933b`. I fixed all four lint findings reported by CI, added the undefined rejection test, updated its spec link, and ticked that facet in `.lore/dod.md`. The focused Jest file passed (3 tests). The new test was green immediately because the previous round’s implementation already handled `undefined`; I did not manufacture a failing behavior.

The branch is clean, pushed, and up to date with `origin/main`. The previous verdict reported no red tests of mine and no test regressions; its four failures were lint findings. CI has not yet judged this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin undefined rejection cause and caller value","tdd_next":"confirm existing Error-instance tests remain green"}}
