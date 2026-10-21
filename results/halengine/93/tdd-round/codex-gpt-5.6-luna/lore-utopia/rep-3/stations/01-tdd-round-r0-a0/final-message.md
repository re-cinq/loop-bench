Implemented and pushed commit `4ad25cf`.

- Aggregated usage across provider rounds with public `AggregatedUsageMetadata`.
- Added focused regression test; red then green.
- Updated spec, changelog, and DoD checklist.
- Acceptance suite, lint, typecheck, and build were not run.
- No regressions observed; Lore CI lookup was unavailable (403).
- Branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate usage across provider rounds","tdd_next":"preserve the unchanged no-tool regression guard"}}