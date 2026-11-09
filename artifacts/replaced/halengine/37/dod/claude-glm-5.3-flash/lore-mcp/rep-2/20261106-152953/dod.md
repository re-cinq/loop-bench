# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists: `ToolRegistry.execute` and `ToolRegistry.register`
are public entry points callable today, so the acceptance tests register real tools against the real
registry and fail on the absent behaviour (no validator, no rejection `ToolResponse`, no
register-time compile). No mocks; the one log-observing test goes through the logger's own
`setLogger` seam.

Run only these files:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath \
  src/orchestration/tools/registry.acceptance.test.ts \
  src/orchestration/chatOrchestrator.acceptance.test.ts
```

Eight of the nine were red at DoD time (2026-11-05), each failing because the validation behaviour
is absent; the ninth pins behaviour that must not change.

## Done when these pass

- [ ] **rejects a call missing a required property before the executor runs** — `execute` with a
      payload missing a `required` property returns a `ToolResponse` naming the property as required;
      executor call count is `0`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property naming the path and expected type without echoing the value**
      — a number where a string is required is rejected with a message naming the path and type, and
      the message does not contain the offending value
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a value outside a declared enum naming the property** — `enum` constraints are
      enforced and the rejection names the failing property
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with an unlisted property through to the executor unchanged, exactly
      once** — `toEqual` on what the executor received (an injected default or coerced value fails),
      one call, while the invalid control call never reaches the executor
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at registration time for a schema that cannot compile, naming the tool** — a static
      schema is compiled at `register`; the throw names the tool
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — a source
      whose returned schema changes between calls is validated against the current schema, not a
      stale cached one
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **carries no property value from a rejected payload into the log lines or the returned text**
      — a rejected payload holding an identifying field leaves no log line and no returned text
      carrying that value (observed through the real logger's `setLogger` seam)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **still throws for an unregistered tool name** — `Unknown tool: <name>` unchanged, pinned
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a rejected tool call back to the provider as a tool result and resolves on the
      corrected retry** — a stub provider makes a malformed call then a corrected one;
      `processMessage` resolves, the provider's next round carries the rejection text, and only the
      corrected call reaches the executor
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator (`ajv` unless the build proves otherwise) to `dependencies` — not
      `peerDependencies`, not `devDependencies` — and a `CHANGELOG.md` entry for the change (CI's
      `scripts/check-changelog.sh` fails a PR touching non-test `src/` files without one)
- [ ] Compile a static tool's schema once at `register`; throw naming the tool for an uncompilable
      schema; resolve and compile a function-valued source per call, cached by the resolved schema
      object
- [ ] Validate in `execute` before the executor; on failure return a `ToolResponse` naming the
      failing property paths and the constraint, never a value; log lines redacted the same way; no
      opt-out flag, no `additionalProperties: false` injection, no coercion or defaults
- [ ] Pin that a static tool's schema is compiled once across ten `execute` calls in the round's own
      `src/orchestration/tools/registry.test.ts` — the acceptance suite does not observe compile
      counts, because that needs a seam into the validator that only the implementer can build
      honestly (module-mocking `ajv` was ruled out)
- [ ] `execute` carries a one-line doc comment pointing at
      `specs/hal-engine-tool-input-validation/spec.md`, which states the full contract
- [ ] Update `README.md` (what the registry now does, claim true), `docs/adding-a-tool.md` (input
      reaching an executor has passed the declared schema; unknown keys may still be present; a
      rejection is returned to the model, not thrown) and `.specify/spec.md` (rejection is a tool
      result, the tool-round bound stops a retry cycle, extra properties pass through unmodified)
- [ ] MINOR version bump; PR body states the migration note (executors stop seeing input the schema
      rejects; tools that relied on malformed input for their own error messages stop seeing it)

## Out of scope

- Validating tool *output*
- Replacing the `Unknown tool: <name>` throw with a returned tool result (tracked separately as
  *Return an unknown tool name to the model instead of throwing*; the split is intentional)
- Hallucination detection and an evaluation harness
- Per-tool authorization — a schema-valid call for someone else's data is still valid;
  authorization is a separate `ToolContext` boundary concern no issue in this epic owns
  (*Let a consumer decline a tool call through a `beforeToolCall` hook* is a veto seam, not an
  authorization model)
- Retry, timeout and rate limiting around tool execution
- Any actual tool implementation, written against this contract later