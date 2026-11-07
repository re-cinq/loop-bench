# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The chat orchestrator acts as a seam, allowing us to install hooks through configuration and observe their execution when `beforeSession` throws.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — pins that a thrown error in `beforeSession` propagates to the caller while invoking both `onError` and `afterSession` hooks.
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [x] Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.
- [x] Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`.
- [x] Document in the CHANGELOG what changes for an existing consumer.
- [x] Move the `beforeSession` statement out of the spec's "Measured semantics — out of scope" section (its intro says "these three properties … this issue changes none of them") into a guarantee section, and state that `afterSession` cannot tell a failed `beforeSession` from a finished turn.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- [x] Link the spec's "`afterSession` is not told why it runs" statement to a test, so the spec's Shipped status matches its coverage.
- [x] Fix CI on the acceptance test: `PromptBuilder` takes `identity` (not `baseSystemPrompt`), and its three expects collapse into one `toEqual` with the same assertions.