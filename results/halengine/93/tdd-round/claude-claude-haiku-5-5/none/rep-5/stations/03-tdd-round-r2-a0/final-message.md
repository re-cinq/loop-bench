The CI finding is fixed and pushed, but this round closed no facet. The one open facet is still `TurnUsage`.

**What I did**
- CI's only failure was an eslint `require-spec-link` error at `src/orchestration/chatOrchestrator.test.ts:559`. That test ("adds the usage of every round that reports it, not only the last") validated no spec statement.
- I added a `[validated by: …](../../src/orchestration/chatOrchestrator.test.ts#L559)` link to the usage bullet in `specs/hal-engine-config-hooks/spec.md`, alongside the existing acceptance-test link. It uses the same form as the other bullets in that spec.
- I ran prettier on the spec, and the diff is that one line. The repo has no `scripts/spec-links/reanchor.mjs`, so I checked the link by hand against line 559.
- Committed as `0a9d056` and pushed. `origin/loop-bench/93` matches HEAD. `origin/main` was already contained in the branch, so the merge was a no-op.

**What I did not do**
- No tests ran in this pod. The fix is a traceability link, not new behaviour, so there was no red-green round.
- I did not touch `.lore/dod.md`, because no facet was closed.
- Red tests this round: the one eslint finding, on a test from an earlier round. I did not treat it as a regression, because the test was already on the branch and only its spec link was missing.

**Still open**
- The facet "Name the total-usage type (e.g. `TurnUsage`) and use it for the hook argument" remains unticked. The previous round recorded it as blocked, because ts-jest does not fail on a missing type export. Whether CI's typecheck counts as its red is a call for the next round or a reviewer.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI lint fix: spec link for usage test)","tdd_next":"Name the total-usage type (TurnUsage) and use it for the hook argument"}}