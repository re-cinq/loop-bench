# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).
> Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both
> providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute` and `createChatOrchestrator` already expose the exact entry points this ticket changes, so the acceptance tests call them directly today and fail because schema compilation and input validation are absent.

## Done when these pass

- [ ] **rejects input missing a required property with a ToolResponse and never calls the executor** — `ToolRegistry.execute` validates `input` against `inputSchema`, returns a `ToolResponse` naming the missing required property, and does not invoke the executor.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed property naming the field and expected type without leaking the offending value to the result or logs** — `ToolRegistry.execute` rejects a property with the wrong JSON Schema type without calling the executor, names the failing field path and expected type in `result`, and omits the offending property value from both `result` and emitted log lines.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time naming the tool when a static inputSchema cannot be compiled** — `ToolRegistry.register` compiles a static `ToolDefinition`'s `inputSchema` once at registration time and throws synchronously naming the tool when the schema is invalid.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a schema rejection as a tool_result in the orchestrator loop so the model can correct the call on the next round** — `createChatOrchestrator` feeds a schema-rejected tool call's `ToolResponse.result` back to the provider as a `tool_result` without invoking the executor on the invalid call, allowing the model to retry with valid arguments and complete the turn.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [x] Add `ajv` to `dependencies` in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) and bump the package version `MINOR`.
- [x] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [x] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [x] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

- [x] **Verify the round brief's CI findings against the current head** — the findings were genuine on `2fea0a3`, not stale: that commit's `registry.ts` still opened with `import {Ajv} from 'ajv'` and an `ErrorObject` type import (the TS2693/TS2339 sources), and its `providerFactory.test.ts` contained no peer stub at all. At head `adf7168` none of that code exists — ajv is required at runtime and typed structurally, so no ajv identifier appears in `registry.ts` or `registry.test.ts`, and `providerFactory.test.ts` stubs the SDKs through `requireOptionalPeer` before importing the factory. Both CI-named suites re-run green by file this round: `registry.test.ts` 5/5 and `providerFactory.test.ts` 5/5. CI's verdict on `adf7168` itself is not yet visible to the pod (the lore gateway does not resolve the branch), so the dod-tick push below re-runs CI on the repaired tree.

- [x] **Repair the CI findings on `2fea0a3`** — `registry.ts` no longer resolves any type from the `ajv` package (the source of all three typecheck diagnostics): ajv is loaded through `createRequire` and typed structurally in the file, and `ToolRegistry` takes an injectable `SchemaCompiler` (default: the ajv compiler) so `registry.test.ts` counts compilations through the seam instead of `jest.spyOn(Ajv.prototype, 'compile')`; `providerFactory.test.ts` stubs the peer SDKs through the repo's established `requireOptionalPeer` seam so the shape test never constructs a real `VertexAI` (whose constructor `console.warn` is what threw in CI). Both suites green locally; the coverage floor recovers once the suites compile in CI.

> Pod note: GitHub upstream has since merged an independent implementation of this ticket (sibling PR #84, issue #37 closed upstream), but this pod's `origin` mirror serves a `main` that predates that merge (tip `8c3318e`), so `git fetch origin main` stays a no-op and this branch remains the feature carrier here.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.