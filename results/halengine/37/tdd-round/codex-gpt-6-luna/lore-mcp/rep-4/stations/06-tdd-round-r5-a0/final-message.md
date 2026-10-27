Fixed Ajv’s quoted handling of special required-property names so errors use JSON Pointer paths, and simplified the executor call-count assertions to address CI’s lint findings. Updated the DoD checklist.

The focused registry test passed: **6 tests**. Commit `07b2873` was pushed; `origin/main` was already merged, and the branch is even with upstream. CI reported **0 red tests of mine and 2 regression failures** (the pointer-path tests); both are fixed.

Next facet: add the remaining registry and orchestrator behavior tests and complete the specification and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix quoted special-property JSON Pointer paths and the reported test lint violations","tdd_next":"Add the remaining registry and orchestrator behavior tests and complete the specification and documentation updates"}}