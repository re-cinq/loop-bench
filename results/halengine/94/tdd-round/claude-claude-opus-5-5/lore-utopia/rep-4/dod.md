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
- [x] Move the `beforeSession` line in `specs/hal-engine-config-hooks/spec.md` out of the "Measured semantics — out of scope" section (whose intro says "three properties ... this issue changes none") into the guaranteed semantics, and say `afterSession` cannot tell a failed `beforeSession` from a finished turn.
- [x] Remove the duplicated hook-turn setup in `src/orchestration/sessionSave.test.ts` (CI eslint `no-duplicate-code`).
- [ ] BLOCKED on the acceptance test itself: it constructs `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, which `PromptBuilderConfig` does not have (CI typecheck TS2353, line 30), and makes 3 expect calls in one test (CI eslint `re-lint/max-expects`, line 40). Needs a human-approved correction of the acceptance test.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)