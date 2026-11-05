I fixed all four eslint findings from the red build and pushed. The branch is not ahead of its upstream, and merging `origin/main` produced nothing. I did not run eslint, the typechecker or the acceptance tests here.

- **`validation.ts:93` and `:95` (`camelcase`):** the validator table is now a `Map` built from `['user_message', …]`, `['ping', …]` and `['list_sessions', …]` entries, and the lookup is `validators.get(message.type)`. Quoted keys didn't work because prettier strips the quotes again.
- **`validation.test.ts:48` (`no-flag-params`):** the `Array(8).fill(false)` equality became `toHaveLength(8)` plus `not.toContain(true)`.
- **`wsTestSupport.ts:121` (`max-member-chain`):** a small `connectedSockets(hal)` helper now reads the client set and returns its size.

`validation.test.ts` passes, 5 tests. The reanchor script isn't in this repo. The test I edited is the last one in its file, so no `#Lnn` spec links sit below it to shift.

The eslint step also reported "timed out after 10 minutes" in the CI output. I can't tell from here whether that was the job as a whole or just the findings, so the next CI run will show it.

Red tests this round: none of mine, no regressions. The three acceptance tests are for CI to judge. This was a lint repair, so there is no new facet in `.lore/dod.md`, which I left unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: eslint camelcase, no-flag-params and max-member-chain findings","tdd_next":"acceptance green"}}