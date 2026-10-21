Implemented and pushed one red-green-refactor round.

- Added `TotalUsageMetadata` and aggregate usage across provider rounds.
- Added one focused tool-round test; red first, then green.
- Preserved the existing no-tool regression test.
- Updated spec traceability and `.lore/dod.md`.
- CI/build/lint/typecheck not run per instructions.
- Red tests: 1 yours, 0 regressions.
- Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate usage contract across provider rounds","tdd_next":"sum reported rounds while preserving undefined when no usage is reported"}}