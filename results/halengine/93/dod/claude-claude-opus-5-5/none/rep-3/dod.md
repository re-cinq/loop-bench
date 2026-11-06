# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted `AIProvider` and a real `ToolRegistry` already drives the tool loop end to end, and `afterModelResponse` exposes the usage it receives; the tests observe that argument and fail because it carries only the final round's usage.

Decision recorded for the issue: accumulate across rounds and pass the sum as the existing `usage` argument (shape 1). The per-round breakdown (shape 2) was rejected because nothing in the epic consumes provider-call granularity today, and a wider public surface is a cost every later hook feature would inherit; it can be added later without breaking the sum.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — three provider calls reporting 110, 220 and 330 tokens yield one `usage` of 600/60/660
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage, and reports none when no round reported any** — a round without usage adds nothing (no `undefined`, no `NaN`), and a turn where no round reported still gets `undefined`
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (existing, must stay green and UNEDITED) — a turn with no tool calls reports exactly what it reports today
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Replace the `lastUsage` local in `src/orchestration/chatOrchestrator.ts` with a running sum that skips rounds reporting no usage
- [ ] Make the type say it is a sum: rename the hook's parameter (e.g. `turnUsage`) and add a one-line JSDoc on `afterModelResponse` in `OrchestratorHooks`; regenerate the CLAUDE.md hooks block if it is generated from the declaration
- [x] `specs/hal-engine-config-hooks/spec.md`: under-counting line removed, new "Usage across tool rounds" section cites the tests above
- [ ] CHANGELOG entry stating that existing consumers will now record larger usage for tool-calling turns; MINOR version bump
- [ ] CI green: build, test, typecheck, eslint `--max-warnings 0`, prettier:check

## Out of scope

- The audit entry or billing record itself (a consumer's concern)
- Token accounting for anything other than the orchestrator's provider calls (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape
- The `onError` non-`Error` rejection gap still listed under "Measured semantics"