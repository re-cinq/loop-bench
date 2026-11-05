Blocked by a CI/local dependency mismatch: CI rejects Ajv’s named export, but installed Ajv 8.20.0 provides it and the new test passed immediately. I removed that test and its citation; no changes were committed.

Local red tests: 0. CI names at least 2 existing-suite regressions; its truncated report prevents an exact count. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI reports a missing Ajv named export, but local Ajv provides it; the new test passed immediately, so no red-first repair was established."}}