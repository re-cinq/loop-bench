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
- [x] Rewrite the spec's "Measured semantics — out of scope" intro ("three properties … This issue changes none of them") now that the `beforeSession` line is a guarantee, not a recorded flaw.
- [ ] Acceptance test `chatOrchestrator.beforeSession.acceptance.test.ts` is itself defective and needs its author: it builds `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig` (TS2353 — `PromptBuilderConfig` takes `identity`), and its test makes 3 `expect` calls (re-lint/max-expects, max 1).

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)