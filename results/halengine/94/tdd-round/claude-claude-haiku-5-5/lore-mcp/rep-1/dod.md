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

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- [ ] Fix the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`: typecheck rejects `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` as not in `PromptBuilderConfig` (its fields are `identity`, `domainContext`, `responseGuidelines`, `toolPreamble`), and eslint `re-lint/max-expects` fails the `it` at line 40 for 3 expects. The test is wrong; its owner must correct it.