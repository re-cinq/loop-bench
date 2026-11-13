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
- [x] Move the `beforeSession` statement out of the spec's "Measured semantics — out of scope" section (its intro says this issue changes none of them) into a normative section, and state whether `afterSession` can tell a never-started session apart.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)

## Blocked on the acceptance test itself

- [ ] `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` fails CI's typecheck (line 30: `PromptBuilder` is given `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, but `PromptBuilderConfig` takes `identity`) and eslint `re-lint/max-expects` (line 40: three `expect`s, max 1). Fixing either means editing the acceptance test, so a human has to correct it.