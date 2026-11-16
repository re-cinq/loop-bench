Branch is up to date and pushed. 

**Summary of this round:**

- **Facet closed**: Core AJV validation implementation — added AJV to `dependencies`, compile static schemas at `register` time (throwing named error for invalid schemas), validate at `execute` time returning a `ToolResponse` on failure (no value leakage to result or logs), WeakMap cache for function-valued sources, one-line doc comment on `execute`.
- **Test written**: `src/orchestration/tools/registry.test.ts#L4` — "execute returns rejection ToolResponse for missing required property" — RED then GREEN.
- **Spec link**: Added second validation link to `specs/hal-engine-tool-input-validation/spec.md` statement 1 pointing at the new unit test.
- **DoD ticked**: Facets 1, 2, 3 marked done.

**Unrelated smells noticed** (not acted on):
- Module-level `ajv` instance is shared across all `ToolRegistry` instances; not a problem but could cause subtle cross-instance schema ID collisions if AJV's global schema registry is used (it isn't here).
- Coverage threshold floors in `jest.config.js` for `src/orchestration/tools/` are set at 66%/56% — lower than the rest; this round should raise them, but re-baselining is not part of this ticket.

**Next round**: Facet 4 — add the remaining unit tests in `registry.test.ts` and `chatOrchestrator.test.ts`, link the remaining unlinked spec statements (lines 14, 15, 20, 21), and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"AJV validation in ToolRegistry (compile-at-register, validate-at-execute, WeakMap cache, no value leakage)","tdd_next":"remaining registry.test.ts unit tests + chatOrchestrator.test.ts tool-loop test + spec/doc updates (facet 4)"}}