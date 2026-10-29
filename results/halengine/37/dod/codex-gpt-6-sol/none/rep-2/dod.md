# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are callable today, and `createChatOrchestrator` exposes the tool loop through `processMessage`. The four tests exercise those entry points with real schema objects and an in-memory provider.

## Done when these pass

- [ ] **Reject invalid input and preserve valid input** — required, type, and enum failures return useful redacted results without invoking the executor; valid input and unknown names retain their contracts.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Compile a static schema at registration** — malformed schemas fail early with the tool name and a static schema is read once across ten calls.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Use a function definition's current schema** — a changed schema is applied to the next call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Let the model correct a rejected call** — the orchestrator returns the rejection to the provider and resolves after a corrected retry.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime `dependencies` and compile static schemas during registration, caching dynamic schemas by resolved object.
- [ ] Validate before tool execution; return redacted path and constraint errors for schema rejection while retaining the unknown-name throw and passing valid input unchanged.
- [ ] Keep rejected calls in the existing tool loop as tool results so the round bound limits retries.
- [ ] Update the one-line `execute` comment, `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md` to describe the implemented contract.
- [ ] Include the hand-validation migration note in the PR body and make the required MINOR version bump.
- [ ] Pass the repository's CI build, import smoke, typecheck, tests, ESLint, Prettier, spec-link, and changelog gates.

## Out of scope

- Changing the unknown-tool throw, validating tool output, authorization, and tool execution retries, timeouts, or rate limits.