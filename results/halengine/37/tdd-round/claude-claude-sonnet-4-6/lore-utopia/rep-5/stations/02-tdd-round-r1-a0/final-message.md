Pushed. All four CI failures addressed in this commit:

- **registry.ts:63** — added `{cause: err}` to fix `preserve-caught-error`
- **registry.acceptance.test.ts:141** — flipped `if (round === 2)` to `if (round !== 2)` with early-return guard, fixing `prefer-early-return`
- **registry.acceptance.test.ts:143** — extracted `firstContent` intermediate variable to break the 3-hop member chain, fixing `max-member-chain`
- **spec.md** — merged the two separate `([validated by…])` parentheticals into one trailing paren; this fixes both the `spec-links` check (misplaced link) and the `require-spec-link` ESLint error on the acceptance test at line 16
- **CHANGELOG.md** — added the missing entry for the validation feature

Unrelated smells noticed but not touched: several provider files at very low coverage (bedrock, anthropic, openai stubs) — these predate this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI ESLint/spec-links/changelog failures from previous round","tdd_next":"add remaining unit tests in chatOrchestrator.test.ts, link remaining spec statements, update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md"}}