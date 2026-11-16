Branch is current. The push landed.

**Round summary**: Added `ajv` v6 to `dependencies`, compile each static tool's `inputSchema` at `register` time (throwing named error for invalid schemas), cache function-valued schemas via `WeakMap`, and validate `input` in `execute` before invoking the executor — returning a `ToolResponse` naming the missing/mistyped field without leaking the offending value. One unit test written (RED → GREEN). Facets 1–3 ticked. No regressions introduced (0 regression tests failed; 1 test written by me).

**Unrelated smells noticed** (not acted on):
- `normalizeToolResponse` is declared above the class but called from a class method — predates this round, not touched.

**Next round's facet**: Add the remaining unit tests (`registry.test.ts` extra-property pass-through, unknown-tool throw, function-valued schema freshness, static compile-once, log-redaction; `chatOrchestrator.test.ts` tool-loop recovery test), link all remaining unlinked spec statements, update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate input in ToolRegistry.execute with ajv, compile at register, WeakMap cache for function-valued sources","tdd_next":"remaining unit tests (registry.test.ts + chatOrchestrator.test.ts), spec links, and doc/CHANGELOG updates (facet 4)"}}