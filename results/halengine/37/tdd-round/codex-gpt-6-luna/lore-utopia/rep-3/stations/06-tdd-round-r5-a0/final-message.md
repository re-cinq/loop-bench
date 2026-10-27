Committed and pushed as `e6ffd58` (`Test passthrough of extra tool input`). The branch is up to date with `origin/main`, and the working tree is clean.

The new passthrough test passed. I also fixed the four ESLint findings listed in the round brief and updated the affected spec links. The behavior was already implemented, so the new test was green immediately: **0 red tests of mine**. The prior CI test job was reported as failed, but its excerpt omitted the failing test details and Lore could not retrieve the branch’s CI report; **regressions are undetermined**.

Next facet: the remaining registry and orchestrator tests, spec links, and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a registry unit test proving valid input with an undeclared property reaches the executor unchanged.","tdd_next":"Add the remaining unit tests and documentation updates"}}