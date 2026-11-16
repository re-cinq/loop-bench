Branch is up to date. The push landed.

**What was done this round:**

- RED test written in `src/orchestration/tools/registry.test.ts`: "applies the schema compiled at register time even when the definition object is mutated afterwards" — currently failed because no validation existed (executor was called)
- Implemented ajv (`{strict: false, validateFormats: false}`) validation in `src/orchestration/tools/registry.ts`: static schemas compiled at `register()` time, function-valued sources compiled per call with WeakMap caching, `execute()` returns a `ToolResponse` on failure (naming failing fields without leaking values), throws only for unknown tools
- GREEN: all 3 unit tests pass; the core facets (ajv dependency, static compilation+caching, validate-before-execute) are closed
- Spec statements 14, 15, 20 now have validated-by links in `specs/hal-engine-tool-input-validation/spec.md`
- Package bumped 0.3.0 → 0.4.0 (MINOR)

**Unrelated smells noticed (not acted on):** The existing `example/weather-tool.ts` still has the defensive cast/default comment that the ticket says to remove — that's part of the docs-update facet.

**Next round takes:** Add unit tests for the remaining unvalidated spec statements (function-valued WeakMap caching, the chatOrchestrator retry test) and documentation updates (`docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md`, `example/weather-tool.ts`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas at register time + validate input in execute (facets 2+3)","tdd_next":"Add remaining unit tests (function-valued schema caching, chatOrchestrator retry) and documentation updates (facet 4)"}}