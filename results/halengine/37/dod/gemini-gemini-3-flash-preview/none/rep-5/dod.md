# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — The `ToolRegistry` is a standalone class that can be exercised directly with various tool definitions and inputs. Its behavior regarding validation, logging, and schema compilation can be observed through its public `execute` and `register` methods, combined with log interception.

## Done when these pass

- [ ] **rejects missing required fields and does not call the executor** — A tool with a required field should reject an empty input and not invoke the tool's implementation.
      `src/orchestration/tools/ToolInputValidation.acceptance.test.ts`
- [ ] **passes through extra properties unchanged** — Extra properties not defined in the schema should still reach the executor.
      `src/orchestration/tools/ToolInputValidation.acceptance.test.ts`
- [ ] **rejects wrong-typed fields and redacts values in result and logs** — A type mismatch should be rejected, and the rejection message and logs must not contain the invalid value.
      `src/orchestration/tools/ToolInputValidation.acceptance.test.ts`
- [ ] **throws during registration for broken schemas** — Providing an invalid JSON Schema should cause an immediate error during registration.
      `src/orchestration/tools/ToolInputValidation.acceptance.test.ts`
- [ ] **compiles static tool schema once** — Static tool schemas should be compiled at registration time and reused, not recompiled on every call.
      `src/orchestration/tools/ToolInputValidation.acceptance.test.ts`
- [ ] **validates against the current schema for function-valued definitions** — Dynamic schemas should be resolved per call and validated against the latest version.
      `src/orchestration/tools/ToolInputValidation.acceptance.test.ts`
- [ ] **throws Unknown tool for unregistered names** — The existing behavior of throwing for missing tools should be preserved.
      `src/orchestration/tools/ToolInputValidation.acceptance.test.ts`
- [ ] **allows model to recover from a rejected tool call** — The orchestrator should handle a tool rejection by passing it back to the model for a retry.
      `src/orchestration/chatOrchestrator-validation.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` dependencies.
- [ ] Implement JSON Schema validation in `ToolRegistry.execute`.
- [ ] Implement schema compilation and caching in `ToolRegistry`.
- [ ] Update `ToolRegistry.execute` to return `ToolResponse` on validation failure.
- [ ] Ensure logs and error messages redact values.
- [ ] Update documentation (`README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`).

## Out of scope

- Validating tool output.
- Hallucination detection.
- Per-tool authorization.
- Retry/timeout/rate limiting logic.