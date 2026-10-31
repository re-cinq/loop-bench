# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already drives the provider round loop and calls `afterModelResponse`; a scripted provider and real tool registry exercise that path without a test double.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that executes two tool rounds** — `afterModelResponse` receives the aggregate of distinct provider-call usage values.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`
- [ ] **counts reported rounds around missing usage and leaves an entirely unreported turn undefined** — absent usage neither discards reported totals nor produces a numeric value when nothing reported.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing single-provider-call hook test remains unedited, pinning the no-tool path.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate each provider call's reported input, output and total token counts before invoking `afterModelResponse`.
- [ ] Make the public hook type and documentation explicitly describe the aggregate value, and record the existing-consumer behaviour change in `CHANGELOG.md`.
- [ ] Preserve the no-tool hook value and `undefined` when no provider call reports usage.

## Out of scope

- Audit and billing consumers, non-provider token accounting, and changing a provider stop chunk's usage shape.