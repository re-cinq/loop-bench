Committed and pushed the one-round fix. The new focused test failed before the change and passed after `beforeSession` moved inside the `try`. The spec and changelog now describe cleanup after a failed start. The branch is current with `main` and its upstream.

Red tests observed: 1 new test, 0 regressions. The Lore trace tool was unavailable in this pod; existing tests were inspected directly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Run onError and afterSession when beforeSession throws, with spec and changelog updated","tdd_next":"acceptance green"}}