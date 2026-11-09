# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods already expose the required behavior. Real executors record their inputs, schema getters expose compilation timing without replacing a validator, and a child process captures the real logger's stdout and stderr without mocks.

## Done when these pass

- [ ] **rejects missing input and preserves accepted input and unknown-tool behavior** — Required location rejection never reaches the executor; accepted input retains extra keys and receives no defaults; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects types and enums with safe property diagnostics in results and real logs** — Invalid values never reach executors; results and logs identify paths and constraints without values.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten executions** — Registration consumes the schema and rejects invalid schemas with the tool name; ten executions do not inspect the schema again.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates the current dynamic schema and caches by resolved schema identity** — Changing schemas changes accepted inputs immediately; revisiting a schema object reuses compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas at registration; reject uncompilable schemas with the tool name.
- [ ] Return safe required/type/enum rejection ToolResponses before execution, preserving accepted input and the unknown-tool throw.
- [ ] Resolve dynamic definitions per call and cache validators by resolved schema identity.
- [ ] Keep property values out of all rejection results and log lines; include paths and constraints.
- [ ] Confirm rejected results flow through the existing orchestrator tool-result path to permit correction within the five-round budget.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md; add the one-line execute comment pointing at the validation spec.
- [ ] Add the MINOR version bump, npm-facing changelog entry and PR migration note about executors no longer receiving malformed input.
- [ ] Let CI verify packaging/import, types, lint, formatting and the existing suite after implementation.

## Out of scope

- Tool output validation, authorization, transport changes, retries/timeouts/rate limits and changing the unknown-tool exception.
- Production changes in this acceptance-test commit; prose, dependency placement, release metadata and comment shape remain review/CI obligations rather than source-text assertions.
- A scripted-provider test double: the task prohibits mocks and stubs, and the shipped mock provider cannot emit tool calls. These tests pin the real registry's returned rejection boundary; the existing orchestrator forwarding/round-limit tests remain in chatOrchestrator.test.ts.

Run only `npm test -- --runInBand --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`.

Observed red bar: four tests failed, with invalid calls reaching executors and zero schema reads at registration. No build, typechecker, linter or unrelated suite was run.

Traceability: test comments stamp `specs/hal-engine-tool-input-validation/spec.md#1` through `#4`, and the statement links identify the declarations. The current `.lore/test-commands.yml` listing script emits only id/name/file, so it cannot expose a spec descriptor field; no production tooling was changed to manufacture that field.