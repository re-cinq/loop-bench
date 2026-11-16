Pushed and up to date. All five CI failures from the round brief are addressed:

- `re-lint/no-nondeterministic-tests` (line 12 `new Date()`) → replaced with fixed timestamp `'2026-01-01T00:00:00.000Z'`
- `re-lint/max-expects` (2 expects in `chatOrchestrator.nonError.test.ts`) → merged into one `toEqual` with an object
- `re-lint/require-spec-link` for `chatOrchestrator.nonError.test.ts#L28` → added `[validated by: wraps a thrown string…]` link in `specs/hal-engine-config-hooks/spec.md`
- `re-lint/require-spec-link` for acceptance tests at lines 53 and 64 → fixed by correcting line numbers in spec (`#L52→#L53`, `#L63→#L64`)
- `spec-names` anchor mismatch → same line-number corrections

No regressions introduced (0 of my writes touched `chatOrchestrator.ts`). No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all five CI lint/spec-name failures from round-brief","tdd_next":"acceptance green"}}