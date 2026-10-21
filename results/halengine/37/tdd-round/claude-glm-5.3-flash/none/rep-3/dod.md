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
- [x] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`. (CHANGELOG and the MINOR bump landed with the previous round; this round added the orchestrator-loop unit test with its spec citation and the doc set.)
- [x] Pin that a static tool's `inputSchema` is compiled once and reused across repeated `execute` calls (ticket criterion; `spec.md` statement "compiled at `register` time and reused on every `execute` call" is still uncited — an observable seam exists without new surface: register a static tool, mutate its schema object between calls, and assert the registered schema still governs; next round takes this). (Closed this round: the mutation seam corrupts the schema object after `register` — ajv caches compiled validators by schema object identity, so a rule change is invisible, but a registry that re-read or re-compiled at `execute` would throw; the pin runs ten `execute` calls past the corrupted schema.)
- [x] Flip `specs/hal-engine-tool-input-validation/spec.md` `| Status |` to `Shipped`: after this round every statement in that spec cites a test, so the coverage tier entitles it, but the branch's last CI verdict was red and a red build means the ticket is not done. (Flipped this round together with CI's named findings: the `Ajv` named import became a default import with member access — ajv's CJS entry reassigns `module.exports`, so jest's ESM loader on older node resolves no named `Ajv` — and the ajv error-path read moved behind a structural accessor accepting both v6's `dataPath` and v8's `instancePath`; CI named the member-access form again (`ajvModule.Ajv is not a constructor`, TS2339), so this round landed the plain default import — `import Ajv from 'ajv'`, `new Ajv(...)`, which is the constructor under both the CJS and ESM interop paths.)
- [x] CI's typecheck verdict on the plain default import (`strict` does not exist in type `Options`, TS2353): this repo compiles as ESM (`type: module`) under `moduleResolution: NodeNext`, where ajv's CJS entry types a default import as the whole module namespace — not constructable — so the constructor is now taken through an explicit asserted construct signature over `ajvModule.Ajv`'s instance type, which typechecks under both the ajv 8 typings this tree installs and the v6-shaped `Options` the CI verdict implicated, while the runtime expression is unchanged (verified against both typings with a scoped `tsc -p` over `registry.ts` only; the registry unit file passes 6/6).

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.