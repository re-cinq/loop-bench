# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a scripted provider already drives a multi-round tool turn into `afterModelResponse`. The tests check the `usage` argument the hook receives and fail today because it carries only the last round's usage (`lastUsage = outcome.usage ?? lastUsage` in `src/orchestration/chatOrchestrator.ts`).

Shape chosen: accumulate across rounds and pass the sum, keeping the one `usage` argument. Rejected: passing the sum and a per-round breakdown. Nothing in the ticket asks for per-call granularity, and it would widen the public hook surface. This is a behaviour change for existing consumers, so it needs a MINOR bump and a CHANGELOG line.

## Done when these pass

- [ ] **reports usage covering every provider call of a turn driven through two tool rounds** — three provider calls report 110/220/330 total tokens, and the hook receives their field-by-field sum (600/60/660)
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when others did not, and reports nothing when none did** — a silent middle round leaves the sum of the other two (400/40/440, not undefined or NaN), and a turn where no round reported still passes `undefined`
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING, must stay unedited and green) — a turn with no tool calls reports exactly what it reports today
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Sum each round's `UsageMetadata` into a turn total in place of `lastUsage`, treating a round with no usage as contributing nothing (the first test goes green)
- [ ] Keep `undefined` when no round reported (the second test goes green; the existing "keeps the usage an earlier round reported when a later round reports none" stays green)
- [ ] Make the hook's type say it is a sum, e.g. a documented `turnUsage` parameter name or a one-line JSDoc on `afterModelResponse` in `OrchestratorHooks`, with no `any`; regenerate the CLAUDE.md hooks block if it is derived from the declaration
- [ ] Replace the under-counting line under "Measured semantics" in `specs/hal-engine-config-hooks/spec.md` with the summed behaviour, citing both acceptance tests with `([validated by: <test name>](../../src/orchestration/turnUsage.acceptance.test.ts#Lnn))`
- [ ] Add a CHANGELOG entry stating that existing consumers will now record larger usage for turns that ran tools (MINOR)

## Out of scope

- The audit entry or billing record itself (that belongs to the consumer)
- Token accounting for anything other than the orchestrator's provider calls, such as `generateStructured`
- The `stop` chunk's own `usage` shape
- The `onError` `instanceof Error` gate recorded beside this line in the spec