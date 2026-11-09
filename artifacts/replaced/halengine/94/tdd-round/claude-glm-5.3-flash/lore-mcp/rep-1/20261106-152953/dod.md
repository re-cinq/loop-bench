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
- [x] Repair the acceptance test's fixture: it constructed `PromptBuilder` with a `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig` shape that `PromptBuilderConfig` does not have, so `tsc --noEmit` and the ts-jest Test step failed on excess-property errors before any assertion could run. Built it with the real API (`identity`), matching `chatOrchestrator.test.ts`; the assertions are unedited and the spec's two anchors repointed to the shifted `it(` line.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)