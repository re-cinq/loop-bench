Implemented `list_sessions` handling in [messageHandler.ts](/var/tmp/loop-bench/runs/c58a6ee30674/workspace/target/src/transport/ws/messageHandler.ts), passed the session store through from the server, and fixed the reported test-code lint findings.

`npm run test:coverage` passed: 69 suites and 696 tests. I did not run ESLint, as instructed. Commit `013dc56` is pushed, and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented WebSocket session list replies and resolved the reported test-code lint findings"}}