Resolved all 6 CI `re-lint/declare-near-use` findings in `src/transport/ws/messageHandler.test.ts` and `src/transport/ws/validation.test.ts` while preserving every `#Lnn` spec anchor, verified both test files locally, formatted with Prettier, and pushed `44ee2e1` (up to date with `origin/main`).

- Red tests: 0 ours, 0 regressions (CI failed only on `eslint`).
- Unrelated smells noticed (untouched): the `[Unreleased]` changelog bullet from #143 still states "Nothing in the engine calls it yet" below the new #144 bullet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix all 6 CI re-lint/declare-near-use findings in messageHandler.test.ts and validation.test.ts","tdd_next":"acceptance green"}}