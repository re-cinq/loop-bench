# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage` accepts a scripted provider, real tool registry, and lifecycle hooks. Choose the summed existing `usage` argument: per-call breakdown is rejected because this ticket's billing/budget use case needs a turn total and does not require a wider public surface.

## Done when these pass

- [ ] **reports total turn usage across two tool rounds, counting only calls that report usage** — three different provider counts are summed once per turn; omitted first, middle, or final usage is ignored; entirely absent usage stays absent; direct answers retain their existing values. The existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` must remain unedited.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate every reported provider call's input, output, and total tokens and pass that turn total once to `afterModelResponse`.
- [ ] Ignore missing round usage without producing undefined totals or NaN; preserve undefined when no call reports usage, and preserve direct-answer behaviour.
- [ ] Make the public hook signature unambiguously describe summed turn usage without introducing `any`.
- [ ] Preserve the new spec contract, add a consumer-facing CHANGELOG entry explaining larger totals for tool turns, and apply a MINOR version bump for the changed semantics.
- [ ] Keep the existing direct-answer test unedited and pass CI's build, tests, typecheck, ESLint, and Prettier checks.

## Out of scope

- Billing/audit storage, accounting outside orchestrator provider calls, per-round breakdown APIs, and changing provider stop chunks.
- The separately recorded non-Error rejection behaviour in the config-hooks spec.