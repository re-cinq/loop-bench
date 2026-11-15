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
- [x] Move the `beforeSession` spec line out of "Measured semantics — out of scope" (whose intro says this issue changes none of them) and state what `afterSession` can assume about how much of the turn ran.
- [x] Repoint the spec `#L` anchors shifted by the new unit test in `chatOrchestrator.test.ts` (spec-names, require-spec-link).
- [ ] The acceptance test fails CI on its own text: `baseSystemPrompt` is not a `PromptBuilderConfig` property (typecheck, line 30) and it makes 3 `expect` calls (`re-lint/max-expects`, line 40). It needs a human fix; rounds may not edit it.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)