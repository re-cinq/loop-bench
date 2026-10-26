Implemented and pushed commit `0a574a9`.

- Added focused dynamic-schema validation test.
- Repaired stale spec links and anchors.
- Test passed:
  `npm test -- --runInBand src/orchestration/tools/registry.test.ts -t "...current schema"`
- No acceptance tests, lint, typecheck, or full suite run.
- Branch is up to date with upstream.
- Red tests: 0 ours, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"dynamic function-valued schema validation coverage and spec-anchor repair","tdd_next":"remaining documentation, package/version, and acceptance facets"}}