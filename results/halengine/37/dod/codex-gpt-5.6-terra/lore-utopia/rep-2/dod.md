# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.execute` is the real enforcement boundary, so its public registration and execution API can exercise the contract without doubles.

## Done when these pass

- [ ] **validates malformed input safely while preserving valid extra properties** — malformed input returns a safe correction and never reaches the executor, while valid unknown keys pass through without coercion or defaults
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema when registering the named tool** — static schemas fail at startup with the tool name
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses the current schema returned by a dynamic definition** — dynamic definitions do not use stale validators
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps using the schema compiled at static registration across executions** — static validators are retained after registration
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas during registration and return descriptive registration errors.
- [ ] Validate resolved schemas before executor invocation and return safe `ToolResponse` corrections.
- [ ] Cache static validators and cache dynamic validators by their resolved schema object.
- [ ] Preserve extra properties without coercion or defaults.

## Out of scope

- Unknown-tool errors, output validation, authorization, retries, timeouts, rate limiting, and tool implementation changes.