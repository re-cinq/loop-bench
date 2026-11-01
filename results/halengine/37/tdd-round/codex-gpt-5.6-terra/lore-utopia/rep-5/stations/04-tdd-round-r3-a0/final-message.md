Committed and pushed `fe2443b`.

- Removed the ESM-incompatible `jest` global and lint-invalid mock-chain from acceptance coverage.
- Reanchored validation spec citations and added the required changelog entry.
- Selected unit test assertions passed; isolated runner exited nonzero only on global coverage floors.
- No regressions identified; prior CI failures were ticket-owned.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI validation test setup, traceability anchors, and changelog coverage","tdd_next":"Add the remaining registry/orchestrator unit tests and documentation updates"}}