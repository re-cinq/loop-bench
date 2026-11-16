All 7 CI failures resolved and pushed. The round addressed:

- **`preserve-caught-error`** (registry.ts:61): added `{cause: err}` to the thrown Error
- **`prefer-early-return` + `no-nested-if`** (registry.ts:102,108): extracted `resolveValidator()` private helper using early returns, eliminating the else branch and nested if entirely
- **`max-expects`** (registry.test.ts:5): merged 3 `expect` calls into one `toEqual` assertion
- **`prefer-early-return`** (acceptance test:141): flipped `if (round === 2)` to `if (round !== 2)` guard clause
- **`max-member-chain`** (acceptance test:143): extracted `lastMessage.content[0]` into `toolContent` local variable
- **spec-links misplaced** (spec.md:12): swapped the two validated-by links so the acceptance test link is the trailing parenthetical
- **changelog missing**: added entry under `## [Unreleased]`

0 regressions caused (1 test written, 0 red tests mine).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all eslint/spec-links/changelog CI failures from previous round","tdd_next":"complete remaining registry unit tests (extra-property passthrough, wrong-typed rejection, compile-once, function-source per-call) and doc updates"}}