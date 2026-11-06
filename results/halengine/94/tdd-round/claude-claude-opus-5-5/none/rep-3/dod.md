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
- [x] Move the `beforeSession` statement out of the spec's "Measured semantics — out of scope" section (whose intro says this issue changes none of them) into a guarantee section, and say whether `afterSession` can tell a failed `beforeSession` from a finished turn.
- [x] Link the spec's `afterSession`-cannot-tell statement to a test, so the spec's Shipped status matches its link coverage.
- [x] Make the acceptance test type-check (`PromptBuilderConfig` takes `identity`) and pass `re-lint/max-expects`, with its assertions unchanged.
- [x] Re-anchor the spec `#L` links shifted by the inserted orchestrator test (eslint `require-spec-link`, `spec-names`).

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)