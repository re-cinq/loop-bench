# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The real `ToolRegistry.register` and `execute` methods already expose the required boundary. Tests use real schemas and executors, and record diagnostics through the supported logger sink; no production changes or test doubles are needed.

## Done when these pass

- [ ] **enforces the static schema before execution without changing input or exposing values** — Required, type and enum failures return useful, private tool results without executor calls; valid inputs preserve extra keys, omit defaults and execute once per call; registration compiles the schema and ten calls reuse it; unknown tools still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — Switching between string and number schemas rejects only the inputs invalid at that call, including switching back to a previously resolved schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration and names the tool** — Invalid static schemas fail at startup with the tool identified.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas during registration, identifying the tool on compilation errors.
- [ ] Validate before execution; return property paths and failed constraints in ToolResponse results without logging or returning offending values.
- [ ] Preserve unknown keys, avoid defaults and coercion, and reuse compiled static validators across calls.
- [ ] Resolve dynamic definitions on execution and cache validators by resolved schema object.
- [ ] Preserve unknown-tool throws and allow validation results through the existing orchestrator tool-result path within the five-round bound.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md with rejection, retry and pass-through semantics; point the one-line execute comment at the normative spec.
- [ ] Add the consumer-facing CHANGELOG entry, MINOR version bump and migration note in the PR body; CI verifies runtime package import and all required checks.

## Out of scope

- Output validation, authorization, unknown-tool error redesign, execution retry/timeout/rate limiting, and concrete tool implementations.
- Source-text assertions about prose, manifests or comments; delivery documentation and packaging remain explicit review and CI obligations above.