Completed and pushed commit `1bcc1e8`.

- Added focused `undefined` rejection coverage.
- Preserved wrapping behavior and original rejection propagation.
- Refactored duplicate test setup fixing CI’s ESLint finding.
- Updated spec traceability.
- One authored test passed; no regressions observed.
- Acceptance tests, lint, typecheck, and build were not run per instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"onError receives an Error for undefined rejections while the original rejection propagates","tdd_next":"acceptance green"}}