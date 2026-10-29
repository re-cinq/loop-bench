Committed and pushed `e3caf68`. The new test failed first, then passed after the registry began reporting every missing required field. I also addressed the previous CI type and lint findings, updated the documentation and spec links, and confirmed the branch is synced with its upstream.

Only `registry.test.ts` ran locally: 4 passed. The previous CI verdict had one acceptance test failure and no regressions; CI has not yet judged this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Report every missing required property in one rejection and repair prior CI findings","tdd_next":"Add remaining unit tests for valid input pass-through, static compile reuse, and unknown tool errors"}}