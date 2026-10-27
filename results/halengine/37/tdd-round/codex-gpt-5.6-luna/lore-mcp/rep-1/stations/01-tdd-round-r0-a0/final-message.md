Implemented and pushed one red–green–refactor round.

- Added AJV dependency and bumped version to `0.4.0`.
- Added required-field validation and focused unit test.
- Updated spec traceability and `.lore/dod.md`.
- Test passed: `src/orchestration/tools/registry.test.ts`
- Commit pushed: `82e3274`
- Base merge: already up to date.
- Red tests: 1 yours, 0 regressions.
- CI status unavailable (branch not yet found by Lore).
- Unrelated: npm reported existing audit vulnerabilities; unchanged.

Next facet: dynamic schema resolution/caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"AJV dependency/version setup and static required-input rejection","tdd_next":"Cache and validate function-valued tool definitions per resolved schema"}}