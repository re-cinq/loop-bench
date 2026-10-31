Committed and pushed `cfbde4e`.

- Added `undefined` rejection coverage; focused test passed.
- Fixed CI’s nondeterministic `new Date()` fixture.
- Updated spec traceability and DoD.
- Red tests: 0; regressions: 0. The new test started green because the prior round had already implemented the wrapper.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cover an undefined rejection reaching onError as an Error whose cause preserves the original value, while the caller receives undefined unchanged","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}