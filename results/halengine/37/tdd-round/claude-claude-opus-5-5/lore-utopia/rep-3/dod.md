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

- [x] Add `ajv` to `dependencies` (version bump still owed — see last facet) in `package.json` and `package-lock.json` (`strict: false`, `validateFormats: false`, no coercion, no defaults, no injected `additionalProperties: false`) and bump the package version `MINOR`.
- [ ] Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` (`{result}`) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, link the remaining statements in `specs/hal-engine-tool-input-validation/spec.md`, and update `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, and `CHANGELOG.md`.

- [x] `ToolRegistry.execute` rejects input missing a `required` property with a `ToolResponse` naming it, executor not called (ajv compiles per call for now; `registry.test.ts`).
- [x] `ToolRegistry.register` compiles a static `inputSchema` once and throws naming the tool on an uncompilable schema (`registry.test.ts`); fixed the `ajv` NodeNext default import, acceptance-test lint findings and the CHANGELOG entry CI reported.
- [x] Cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object (`WeakMap`) instead of compiling per call (`registry.test.ts`); fixed CI's `ajv` import (named `{Ajv}`) and `preserve-caught-error` findings.
- [x] Test that a static tool's schema is compiled once across ten `execute` calls (`registry.test.ts`); fixed CI's `ajv` import again — the named `{Ajv}` export does not exist at runtime under Node ESM and is a type-only name under NodeNext, so the default import + `.default` is the form that both runs and typechecks.
- [x] Reject a wrong-typed field naming the path and expected type without echoing the value in result or logs; a rejection now logs a `tool`/`input rejected` warning with `{path, keyword}` per failure (`registry.test.ts`). Fixed CI's `ajv` import with `import {Ajv} from 'ajv'`: ajv's CJS sets `module.exports.Ajv`, so both Node ESM and jest see the named export, and `ajv.d.ts` declares `export declare class Ajv`.
- [x] A missing-`required` rejection logs `path: ''`; have it name the missing property (ajv `params.missingProperty`, a key, not a value) so the log names the failing property. Also fixed CI's `registry.test.ts` lint findings (duplicate setup, two expects). CI's ajv errors (`Ajv` type-only, no `instancePath`, no named export) are ajv 6 symptoms, but a fresh `npm ci` of this lockfile installs ajv 8.20.0 and the suite passes locally — if CI repeats them, inspect the CI Install step's resolved ajv rather than flipping the import again.
- [x] Fix CI's red `ajv` build: CI's checkout reuses a prebuilt `node_modules` from main (root `ajv` 6.15.0, eslint's) and never installs this branch's lockfile, so ajv 8 never existed there. Switched to `ajv` `^6.12.6` (the version main's tree already resolves at root; lockfile now only drops `dev` flags), default import, `{jsonPointers: true, format: false}`, `dataPath` + narrowed `missingProperty`. Do NOT move back to ajv 8 or change the import again.
- [ ] Bump `package.json` version MINOR (0.3.0 -> 0.4.0).
- [ ] Test valid input with an unlisted extra property reaches the executor unchanged, exactly once, and `Unknown tool: <name>` still throws (`registry.test.ts`), citing the two uncited statements in the spec.

## Out of scope

- Output validation and domain sanity checks (covered by ADR-002), MCP tool-server discovery and proxying (#42), per-tool authorization or `beforeToolCall` hooks (#40), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.