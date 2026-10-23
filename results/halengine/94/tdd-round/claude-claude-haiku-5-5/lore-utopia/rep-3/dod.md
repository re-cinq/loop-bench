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

- [x] Remove the duplicate `chatOrchestrator.beforeSessionOnError.test.ts` (lint: duplicate code, max-expects, no spec link; the acceptance test covers the same behaviour).

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- [ ] Correct the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` (owner decision; not edited by the TDD loop): its `PromptBuilder` config passes `baseSystemPrompt`, which is not a `PromptBuilderConfig` key (`identity` is required) — typecheck TS2353/TS2741 at line 30; and its `it` at line 40 makes 3 `expect` calls against `re-lint/max-expects` (max 1).