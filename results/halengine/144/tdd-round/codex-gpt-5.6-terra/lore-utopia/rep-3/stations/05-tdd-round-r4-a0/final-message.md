Fixed all 10 CI-reported ESLint findings and hardened unknown-frame dispatch against inherited keys. Added a traced regression test; it failed first, then passed.

Ran only `src/transport/ws/validation.test.ts`: 5 passed. Acceptance tests were not run. Pushed `38c0b85`; branch is synchronized with upstream. Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Harden WebSocket frame dispatch and repair CI ESLint findings","tdd_next":"acceptance green"}}