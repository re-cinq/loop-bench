# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are the seam; the tests call them
with real executors and a real `Logger` installed through `setLogger`, and drive the tool loop
through `createChatOrchestrator(...).processMessage` with a scripted provider. No doubles needed.

## Done when these pass

- [ ] **answers input missing a required property with a result naming it, and never runs the
  executor** — `execute('get_weather', {})` returns a result naming `location` as required; executor call count is 0.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field by path and expected type without echoing its value in the
  result or the logs** — a number where a string is required is rejected naming `phone` and
  `string`; neither the result nor any logged line contains the value.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for a schema that cannot compile, naming the tool** — `register`
  with `{type: 'strng'}` throws a message containing `get_weather`.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — the
  same input is accepted under the first schema and rejected (naming `city`) after the source
  returns a different one.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves after a rejected tool call and shows the rejection to the provider on the next
  round** — `processMessage` resolves to the final text, and the tool result the provider sees in
  round two names `location` as required instead of a forecast.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Each statement these validate is in `specs/hal-engine-tool-input-validation/spec.md`.

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`; validate in `execute` before the executor and return `{result}` on failure (tests 1, 2, 5).
- [ ] Rejection text and log lines carry paths and the failed constraint only, never values (test 2).
- [ ] Compile static schemas in `register`, throwing with the tool name (test 3).
- [ ] Resolve and compile function-valued definitions per call, cached by schema object (test 4).
- [ ] Write `src/orchestration/tools/registry.test.ts` for the uncited spec statements: extra properties pass through unchanged exactly once, compiled once across ten `execute` calls, `Unknown tool: <name>` still thrown; cite them in the spec and set its Status to `Shipped`.
- [ ] One-line doc comment on `execute` pointing at the spec; update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` cast; `CHANGELOG.md` entry; MINOR bump; migration note in the PR body.

## Out of scope

- Returning an unknown tool name to the model instead of throwing (separate issue).
- Validating tool output, authorization, hallucination detection, retry/timeout/rate limiting around tools.
- Injecting `additionalProperties: false`, type coercion, defaults, or an opt-out flag.