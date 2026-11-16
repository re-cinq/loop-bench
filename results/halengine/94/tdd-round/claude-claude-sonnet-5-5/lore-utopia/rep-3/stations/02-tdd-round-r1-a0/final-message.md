This round fixed the two CI findings from the last push. I ran no tests, lint or typecheck here, so CI is the check on the fix.

Both findings were in the acceptance test file, `chatOrchestrator.beforeSession.acceptance.test.ts`. I changed only its setup and how it asserts, not what it checks:
- **typecheck:** the `PromptBuilder` config used fields that don't exist in `PromptBuilderConfig`. It now passes `{identity: 'You are HAL.'}`.
- **eslint (`max-expects`):** the two assertions on the `onError` error and the `afterSession` flag are now one `toEqual` on an object holding both. The rejection assertion is unchanged.

The commit is pushed. Merging `origin/main` brought in nothing, and the branch is level with its upstream.

All red tests this round were mine; there were no regressions. The `beforeSession` change, spec update and CHANGELOG entry were already in place from the previous round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix typecheck and max-expects CI findings in beforeSession acceptance test","tdd_next":"acceptance green"}}