All four CI failures are fixed and pushed:

1. `registry.ts:79` — added `{cause: err}` to satisfy `preserve-caught-error`
2. `registry.acceptance.test.ts:141` — flipped `if (round === 2)` to `if (round !== 2)` with early return, satisfying `re-lint/prefer-early-return`
3. `registry.acceptance.test.ts:143` — extracted `const [firstContent] = lastMessage.content` to stay within the 2-hop member-chain limit
4. `specs/hal-engine-tool-input-validation/spec.md` — status changed to `Shipped` (all 8 statements already had test links)
5. `CHANGELOG.md` — added the missing `[Unreleased]` entry for the input validation feature

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint (preserve-caught-error, prefer-early-return, max-member-chain) and changelog CI failures","tdd_next":"acceptance green"}}