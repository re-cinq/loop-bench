# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator through `processMessage`, which consumes `processMessageStream`, with failing setup and real lifecycle hooks. Use the shipped local provider implementation without test doubles; setup fails before any provider call.

## Done when these pass

- [ ] **reports a beforeSession failure and finishes cleanup before rejecting with the original error** — Pins error identity, hook arguments, awaited error/cleanup order, and absence of later turn stages after failed setup.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move setup into the existing error-handling boundary so the acceptance test passes without editing existing successful-session tests.
- [ ] Preserve the spec guarantee that cleanup tolerates incomplete setup and that deployers track their own allocations.
- [ ] Add a consumer-facing CHANGELOG entry explaining that failed setup now invokes error and cleanup hooks.
- [ ] CI verifies existing successful-session tests and the build, typecheck, ESLint, and formatting gates.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds.
- New hook arguments or a successful-setup flag.