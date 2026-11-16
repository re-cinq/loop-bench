Pushed cleanly. Summary of this round's fixes:

- **typecheck**: Removed `{strict: false}` from `new Ajv()` (AJV v6 doesn't have that option)
- **eslint/preserve-caught-error**: Added `{cause: err}` to the `register`-time Error in `registry.ts:66`
- **eslint/prefer-early-return**: Flipped `if (round === 2)` to `if (round !== 2)` guard in the acceptance test provider stub
- **eslint/max-member-chain**: Extracted `lastMessage.content[0]` to `firstContent` variable
- **eslint/no-duplicate-code**: Replaced the duplicate `get_weather` test in `registry.test.ts` with a new test validating that extra properties pass through to the executor unchanged (a required ticket criterion not covered by acceptance tests)
- **changelog**: Added entry for the tool input validation feature

Regressions caused: 0 (all test changes were either fixing lint errors or replacing a duplicate test with a different valid test). New tests this round: 1 (extra-property passthrough in registry.test.ts).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: AJV strict option, preserve-caught-error, prefer-early-return, max-member-chain, duplicate-code, changelog","tdd_next":"add remaining unit tests (compile-once, dynamic schema, unknown-tool throw, wrong-type, spec links, docs updates)"}}