Completed one red-green-refactor round and pushed `f4012bc`. The new focused test failed before the fix and passed afterward. It confirms that a `beforeSession` error reaches the caller, then `onError` and `afterSession`, without starting the provider. The spec and changelog now describe cleanup after partial setup.

One red test was mine; no regressions were reported. I ran only the new test file. Acceptance tests and CI checks remain for CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Run onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}