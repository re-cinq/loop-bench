Moved `beforeSession` into the orchestrator’s error-handling block and documented the changed cleanup behavior. The focused test failed before the change and passed afterward. The round was committed and pushed; the branch is up to date with `origin/main` and its upstream.

The local red run had **1 test written this round and 0 observed regressions**. Lore could not provide a previous CI verdict because it reported the branch as not found. The test has a spec anchor comment and citation, but the repository’s test-list script does not expose a `spec` field.

The existing non-`Error` `onError` gate and tool-round usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"handle beforeSession failures and document cleanup behavior","tdd_next":"acceptance green"}}