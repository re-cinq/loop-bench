One round is committed and pushed as `c311c64` (`Preserve rejection causes in onError`). The branch is up to date with its upstream; `origin/main` had no new commits.

The new cause-preservation test failed when `cause` was omitted and passed after the fix. I also extracted the error conversion helper, removed duplicated test setup, updated the stale spec links, and added the cause guarantee to the spec and DoD. No unrelated smells were acted on.

Red tests: 1 written, 0 regressions. I ran only `src/orchestration/onErrorCause.test.ts`; the full acceptance suite and other checks were not run here. CI will judge the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the original non-Error rejection in the onError cause","tdd_next":"acceptance green"}}