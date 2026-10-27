Moved `beforeSession` inside the `try`, documented the failure behavior and consumer impact, and checked off all three DoD facets. The round’s test went red before the change and passed after formatting. Acceptance tests were not run locally; the branch is pushed and up to date with `origin/main`.

Red tests: 1 written by this round; 0 regressions reported. Lore had no prior CI record for the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try; document the guarantee and consumer impact","tdd_next":"acceptance green"}}