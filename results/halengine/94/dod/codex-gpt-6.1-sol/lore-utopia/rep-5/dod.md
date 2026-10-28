# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator through `processMessage`, which consumes `processMessageStream`, with deployer hooks that allocate and release a resource. A real Bedrock provider is configured but must never be reached on this path; no doubles are needed.

## Done when these pass

- [ ] **reports a beforeSession failure and cleans up partial setup before rejecting with the original error** — Pins original error and session identity, error reporting before cleanup, release of partial setup, and no user-input or model work before rejection.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move session setup into the existing error and cleanup boundary so the acceptance test passes without changing successful-turn behaviour or existing tests.
- [ ] Preserve the spec's attempted-turn cleanup contract: cleanup tolerates partial or absent allocation; deployer hooks track allocation state themselves.
- [ ] Add a consumer-facing CHANGELOG entry explaining that failed setup now invokes error reporting and cleanup.
- [ ] Let CI verify the existing success-path tests, build, types, lint, formatting, and remaining repository gates.

## Out of scope

- Non-Error rejections and the existing instanceof Error gate.
- Usage accounting across tool rounds (#93).
- New lifecycle arguments or a separate session-started indicator.