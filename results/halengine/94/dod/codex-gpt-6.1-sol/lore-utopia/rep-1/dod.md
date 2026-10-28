# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Both public orchestrator entry points already expose the failure. One acceptance test exercises both with real hooks and a real Bedrock provider that session initialization prevents from being called.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession while rejecting with the original error** — Both entry points preserve error identity, call onError with the original session and error, then release partially initialized resources in afterSession without processing input or emitting model output.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move beforeSession into the existing try so the original Error reaches onError and afterSession before rejecting to the caller.
- [ ] Preserve the existing successful-session tests unedited and keep the acceptance test green.
- [ ] Confirm the spec's new cleanup guarantee: initialization may be partial or absent, and hooks track their own allocation state.
- [ ] Add a CHANGELOG entry explaining the changed lifecycle for existing consumers and pass the required CI checks.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds.
- A new hook signature or engine-managed initialization-state flag.