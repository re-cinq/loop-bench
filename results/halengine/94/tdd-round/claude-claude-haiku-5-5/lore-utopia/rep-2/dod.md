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
- [ ] Fix the acceptance test's CI findings (blocked: `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is wrong — line 30 passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`, whose config type is `PromptBuilderConfig { identity, ... }`; and line 40 has 3 `expect` calls against `re-lint/max-expects` (max 1). The acceptance test must not be edited by the TDD loop, so a human or the ticket owner has to correct it.)

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)