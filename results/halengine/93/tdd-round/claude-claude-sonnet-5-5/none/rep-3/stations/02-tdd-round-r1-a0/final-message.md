This round fixed the two CI failures from the last push. I couldn't run the regression test here: jest failed to load in this pod with an ESM require error, so CI will judge it.

- **Test failure:** `addUsage` in `src/orchestration/chatOrchestrator.ts` returned `undefined` whenever a round reported no usage. That wiped the total from earlier rounds, which is why `keeps the usage an earlier round reported when a later round reports none` failed. It now returns the running total unchanged for such a round.
- **ESLint failure:** the acceptance test `counts reported rounds while leaving a turn with no reported usage undefined` had no spec link. I added a statement in `specs/hal-engine-config-hooks/spec.md` with a validated-by link to it (`#L67`). The acceptance test itself is untouched.

Prettier was run on the changed files. The branch is pushed, and merging `origin/main` brought in nothing new. Red tests this round: one, the regression in the existing test file, which my earlier commit caused. Everything in `.lore/dod.md` was already ticked, so I added no new facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"keep summed usage when a later round reports none, and link the spec statement for the second acceptance test","tdd_next":"acceptance green"}}