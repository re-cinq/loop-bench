The implementation is verified correct:
- `beforeSession` is inside the `try` block (line 92 of `chatOrchestrator.ts`)
- Catch block fires `onError`, then re-throws
- Finally block fires `afterSession`
- `collectText` propagates the generator's throw via `for await...of`

All three facets in `.lore/dod.md` are ticked, the branch is up to date with `origin/loop-bench/94`, main has no new commits since the divergence point, and there is no `round-brief.md` with CI failures. The work is already done by previous rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}