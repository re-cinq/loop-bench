Resolved all three CI `eslint` findings reported on `31e345b` and pushed `6a8603c` to `origin/loop-bench/144` (synced with `origin/main`):
- `src/transport/ws/sessionList.test.ts`: moved `expectedRow` immediately before `expect` (keeping all local declarations within 5 statements of first use for `re-lint/declare-near-use`) and asserted `bare` directly instead of `bare[0].sessions.length` (`re-lint/max-member-chain`), preserving `#L27`.
- `src/transport/ws/validation.test.ts`: mapped rejected validation outcomes to `'rejected'` so `Array.fill('rejected')` passes a string rather than a boolean literal (`re-lint/no-flag-params`), preserving `#L18` and `#L24`.
- Red tests: 0 red tests were ours and 0 were regressions (both touched unit test files ran and passed locally).
- Unrelated smell noticed (not acted on): the earlier `#143` bullet under `## [Unreleased]` in `CHANGELOG.md` still states "Nothing in the engine calls it yet".

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve CI eslint findings in sessionList.test.ts and validation.test.ts","tdd_next":"acceptance green"}}