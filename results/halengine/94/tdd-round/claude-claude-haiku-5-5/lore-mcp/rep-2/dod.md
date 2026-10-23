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
- [x] Clear the CI verdict on 6d9cb7c for `sessionSave.test.ts` (duplicated bodies folded into a helper; the `beforeSession` test now carries its spec link).
- [ ] Acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is itself wrong and needs a RED-phase author to correct it: line 30 passes `baseSystemPrompt`, which `PromptBuilderConfig` does not have (its key is `identity`), causing the typecheck failure; and the test at line 40 makes three `expect` calls against `re-lint/max-expects` (max 1), so the eslint failure at 40:3. Not editable in a GREEN round.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)