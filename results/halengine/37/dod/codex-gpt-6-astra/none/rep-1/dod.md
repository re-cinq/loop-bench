# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods already expose the validation boundary. Three acceptance tests exercise real schemas, executors and an in-memory log sink without mocking the registry or validator.

## Done when these pass

- [ ] **specs/hal-engine-tool-input-validation/spec.md#1: rejects invalid input safely and preserves accepted input** — Missing required fields, wrong types, nested paths and invalid enum values return safe diagnostics without executor calls; extra properties pass unchanged without defaults, and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **specs/hal-engine-tool-input-validation/spec.md#2: compiles static schemas at registration and reuses them** — Invalid schemas fail at registration with the tool name; a schema is inspected at registration and is not traversed again during ten calls using its compiled validator.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **specs/hal-engine-tool-input-validation/spec.md#3: validates each dynamic schema and reuses its compiled validator** — Switching between distinct schemas changes which inputs reach the executor; returning to a previously resolved schema reuses compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a runtime dependency and compile static schemas during registration, identifying broken tools in startup errors.
- [ ] Validate before executor dispatch; return property-path and constraint diagnostics without input values in responses or logs, retaining unknown-name exceptions.
- [ ] Preserve accepted inputs, unknown properties, executor results and exactly-once execution without coercion or defaults.
- [ ] Resolve function definitions on each call and cache validators by schema object.
- [ ] Confirm rejected calls reach the next provider round as tool results and corrected calls complete within the existing round bound; the current shipped mock provider cannot issue tool calls, and the no-stubs constraint prevents adding the ticket's requested scripted-provider test here.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md; add the one-line execute comment pointing to the new spec, consumer changelog, MINOR version bump and PR migration note.
- [ ] Have CI verify build, runtime import, types, lint, formatting and the full suite; the local acceptance command is `npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts --runInBand`.

## Out of scope

- Output validation, authorization, tool implementations, execution retry/timeouts/rate limiting and changing the unknown-tool exception.
- Production changes in this acceptance-only commit; documentation delivery changes remain implementation work.
- Altering the Lore descriptor adapter: it currently emits only id, name and file; spec anchors are stamped in the test titles so they survive its existing output.