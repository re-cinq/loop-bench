Round complete. Pushed `86ece2b` to `loop-bench/37`; branch is up to date with its upstream and already contains `origin/main` (no drift, no conflict).

**What this round did**

*Repaired every finding in the round brief's CI verdict (the owed work):*
- typecheck: the `ajv` default import was not constructable under NodeNext → `import {Ajv} from 'ajv'` (the class is also a named export at runtime); verified `tsc --noEmit` exits 0
- typecheck: the register-time throw now carries `{cause: error}` (`preserve-caught-error`)
- eslint: rewrote `registry.test.ts` so it no longer duplicates the acceptance fixture; flipped the `if (round === 2)` guard in the acceptance test (`prefer-early-return`); flattened `lastMessage.content[0]?.content` (`max-member-chain`) — assertions untouched, same computed values

*Closed facet 4:*
- `registry.test.ts`: pass-through (extra key, `toEqual`, once), register-throw, ten-call compile-reuse, function-source freshness, `Unknown tool` pin
- `chatOrchestrator.test.ts`: schema-rejected call → `tool_result` → corrected retry, `processMessage` resolves with the rejection text visible to the provider
- Every statement in `specs/hal-engine-tool-input-validation/spec.md` now cites a test; status → `Shipped` (spec-status gate confirms 0 findings)
- `example/weather-tool.ts` executor no longer cast-and-defaults; regenerated the doc block; updated `docs/adding-a-tool.md`, README, `.specify/spec.md`, ADR-002. `.lore/dod.md` facet ticked

**Notes**
- 0 red tests were mine this round (the facet's tests passed on arrival); 0 regressions caused. The brief's `test` failure (Vertex SDK throwing at construct) does not reproduce here — all three vertex-touching files pass (37 tests), and this branch touches no vertex code or dependency. If it recurs, the log tail will name it.
- The ten-call test pins reuse by mutating the schema after `register` rather than a literal compile-count spy: this repo's ESM jest setup defines no `jest` global, so `jest.spyOn` was unavailable (recorded in dod.md).
- I ran the two named failed steps' commands (scoped `tsc --noEmit`, scoped `eslint`) to verify the fixes, plus the repo's cheap deterministic gate scripts (spec-links, anchor-names, spec-status, docs:fix/check) — no build, no full suite, no acceptance test run; those are CI's.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"facet 4: unit tests, spec links and doc updates complete, plus repair of all five CI findings from the previous push","tdd_next":"acceptance green"}}