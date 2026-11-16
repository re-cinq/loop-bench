Branch is up to date and pushed. The round delivered:

- **Facets closed (1–3):** Added `ajv` to `dependencies`, bumped version to 0.4.0; compiled static `inputSchema` at `register()` time (throws naming the tool for invalid schemas); added WeakMap cache for function-valued sources; validated `input` in `execute()` before calling the executor, returning a `ToolResponse` with field path/type info that never leaks property values; added the one-line doc comment.
- **Unit test written** (`registry.test.ts#L5`): "returns a ToolResponse naming the missing required field without calling the executor" — RED before, GREEN after.
- **Spec citation added** to `specs/hal-engine-tool-input-validation/spec.md` for the unit test.
- **DoD ticked**: facets 1–3 checked, facet 4 (remaining unit tests + doc updates) is next.

No regressions introduced — the existing test suite was not run (CI is the judge).

Unrelated smells noticed but not touched: `ToolDefinition` has no exported type for `inputSchema` constraints (it's `Record<string, unknown>`); the module-level `ajv` instance is shared across all registries (fine for the current use case, but could be surprising if ajv options ever need per-registry tuning).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"core validation logic (ajv dependency, schema compilation at register time, input validation in execute, WeakMap caching for function sources)","tdd_next":"remaining unit tests for registry.test.ts (extra-property passthrough, wrong-typed field rejection, compile-once assertion, function-source schema-per-call) and doc/changelog updates"}}