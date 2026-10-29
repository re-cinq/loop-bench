# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider and a real tool registry, so the hook's usage can be observed across provider calls today. Use one summed `totalUsage` argument; it keeps the common hook shape and makes the reported meaning explicit.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — all three provider calls contribute their distinct token counts to one hook report.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **sums reported rounds when another has no usage and leaves an unreported turn undefined** — missing usage is ignored without losing reported rounds or inventing a total.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool test remains unedited and pins the common path.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate each provider call's reported input, output, and total tokens across the turn.
- [ ] Name the hook's usage argument `totalUsage` in the public signature so its summed meaning is visible to consumers.
- [ ] Keep `undefined` when every provider call omits usage and preserve the existing no-tool result.
- [ ] Document the changed consumer-visible value in `CHANGELOG.md` and make the MINOR version decision stated in the ticket.
- [ ] Run the required CI gates: build, tests, typecheck, ESLint, and Prettier check.

## Out of scope

- Consumer audit or billing records, token accounting beyond orchestrator provider calls, and the stop chunk's own usage shape.