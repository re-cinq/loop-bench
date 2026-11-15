Closed the `specs/hal-engine-config-hooks/spec.md` facet for ticket #94 (commit `62db66d` on `loop-bench/94`, pushed and up to date with `origin/main`):

- Added a config-level test in `src/config.test.ts` (`runs onError then afterSession when a config-installed beforeSession throws, leaving session entries untouched`) and formatted with Prettier.
- Moved the `beforeSession` failure guarantee in `specs/hal-engine-config-hooks/spec.md` from `## Measured semantics — out of scope` to `## Installing hooks through config`, documenting what `afterSession` can assume (no subsequent hooks, provider calls, tool execution, or entry additions occurred, and cleanup must tolerate partial initialization), and updated the out-of-scope intro count from three to two.
- Verified `npm test -- src/config.test.ts` (12/12 passed; 0 red tests of ours, 0 regressions), `npm run spec:names`, `npm run check:spec-links`, `node scripts/check-spec-status.mjs --coverage specs/hal-engine-config-hooks/spec.md`, and `node scripts/repoint-spec-anchors.mjs --check origin/main`.
- Ticked the spec facet in `.lore/dod.md`, leaving the CHANGELOG entry for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.","tdd_next":"Document in the CHANGELOG what changes for an existing consumer."}}