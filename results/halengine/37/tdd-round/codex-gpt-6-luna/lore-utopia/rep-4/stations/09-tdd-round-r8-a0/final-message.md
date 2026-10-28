Added a static schema compile-once test covering ten executions and consolidated the nested-path checks, addressing the reported lint findings. The test initially failed because Jest wasn’t imported; it passed after the import was added. I ran only that test.

Updated the spec links and DoD checklist. Commit `8c909d9` is pushed, and the branch is clean and synced with its upstream. CI reported **0 test failures and 3 lint findings** on the previous push; those lint findings were addressed.

The next facet is function-valued schema resolution coverage, tool-loop recovery coverage, and the remaining documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Assert a static tool schema compiles once across ten executions","tdd_next":"Add remaining unit tests and documentation updates"}}