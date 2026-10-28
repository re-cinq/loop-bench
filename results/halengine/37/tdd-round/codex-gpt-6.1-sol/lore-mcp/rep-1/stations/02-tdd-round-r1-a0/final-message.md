The new test passed immediately, so it did not establish the required red bar. Per the TDD contract, I stopped and removed it. The working tree is clean; nothing was committed or pushed.

Local red tests: 0 mine, 0 regressions observed. Prior CI failures remain unresolved; acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The proposed regression test passed locally; it did not reproduce CI's Ajv import failure, so no valid red phase was established."}}