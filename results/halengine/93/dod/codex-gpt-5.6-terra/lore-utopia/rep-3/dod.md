# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `processMessage` drives the real provider and tool loop, then calls `afterModelResponse` with the reported usage. The acceptance tests use that seam with scripted provider rounds and a real tool registry.

## Done when these pass

- [ ] **reports the sum of every provider call made by a turn with two tool rounds** — `afterModelResponse` receives summed token metadata from all three provider calls.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **sums reported rounds while leaving a turn with no reported usage undefined** — missing provider usage neither erases counted rounds nor creates an invalid total.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing direct-answer test remains unedited to preserve no-tool usage semantics.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate each defined provider usage into a turn total before invoking `afterModelResponse`.
- [ ] Make the hook API name and documentation unambiguously describe that the value is a total, or expose a documented per-round breakdown instead.
- [ ] Replace the recorded under-counting behaviour in the hooks spec and add a changelog entry describing the changed value existing consumers record.

## Out of scope

- Consumer audit or billing records, accounting outside provider calls, and the provider `stop` chunk usage shape.