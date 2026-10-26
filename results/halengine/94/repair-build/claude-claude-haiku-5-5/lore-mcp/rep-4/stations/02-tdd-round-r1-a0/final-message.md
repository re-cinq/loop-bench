The branch is up to date. The fix was straightforward: the `spec-names` CI check found that the spec anchor for "runs onError and afterSession when beforeSession throws" pointed to `#L40` but the test had moved to `#L32`. Running `npm run spec:names -- --fix` repointed it automatically.

0 regressions; 0 tests written this round (the fix was a stale line number, not a code change).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix stale spec anchor line reference","tdd_next":"acceptance green"}}