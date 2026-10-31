# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.execute` is the real input boundary and can be exercised with registered definitions and executors. The acceptance cases call that boundary without replacing the registry or its executor path.

## Done when these pass

- [ ] **rejects schema-invalid input before the executor while preserving valid unknown fields** — rejects required, type, and enum violations without leaking input values while passing valid unknown properties unchanged
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema when the named tool is registered** — compiles static schemas during registration and reports the tool name
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps a static schema compiled at registration across executions** — reuses the registration-time schema across ten calls
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses the schema resolved for each dynamic tool invocation** — validates function-valued definitions with the schema current for each call
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add schema validation before tool executor invocation and return a safe `ToolResponse` on rejected input.
- [ ] Compile static schemas at registration and cache dynamic schemas by their resolved object.
- [ ] Document the validation and rejection contract in the public tool guidance and system specification.

## Out of scope

- Changing the existing `Unknown tool: <name>` exception, validating tool output, or adding authorization, retry, timeout, or rate-limit policy.