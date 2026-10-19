Branch is pushed and up to date. 

**What this round did:**
- Added `addUsage(a, b)` to `orchestratorHelpers.ts` — sums two `UsageMetadata` values, skipping undefined rounds, returning `undefined` when both are absent
- Changed `chatOrchestrator.ts` line 117 from `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = addUsage(lastUsage, outcome.usage)` — this is the core fix
- Added 3 unit tests for `addUsage` in `orchestratorHelpers.test.ts` (all green)
- Updated `specs/hal-engine-config-hooks/spec.md`: replaced the under-counting bullet with 3 new spec statements citing the acceptance tests
- Updated `specs/hal-engine-architecture/spec.md`: replaced the single "keeps the usage" bullet with 4 bullets covering the accumulation contract and citing the unit tests
- Added a CHANGELOG entry explaining the behavior change for consumers

**Smells noticed but not touched:** The `re-lint/no-vague-names` rule may flag `base`/`extra` in the test — both are clear in context and likely fine.

**Remaining open facet:** Facet 1 (type-level disambiguation — making the hook signature's `usage?: UsageMetadata` explicitly convey "it's a sum", e.g., via a renamed type or JSDoc). The acceptance tests don't exercise type naming, so CI may or may not flag this.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across rounds via addUsage helper","tdd_next":"add type-level disambiguation so the hook signature conveys sum semantics (facet 1), or acceptance green if CI passes"}}