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
- [x] Move the `beforeSession` line out of the spec's "Measured semantics — out of scope" section (its intro says this issue changes none of them, now false) and state there that `afterSession` cannot tell a failed `beforeSession` from a finished turn.

- [x] Link the spec's two uncited `beforeSession` statements (CI eslint `require-status-matches-coverage` on 4bed73a: 8 of 10 linked while Status reads Shipped); the `afterSession`-receives-only-the-session statement is pinned by its own test.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)

## Notes

- CI on 72037db failed typecheck (`baseSystemPrompt` is not a `PromptBuilderConfig` key) and eslint (`re-lint/max-expects`) inside the acceptance test. Fixed mechanically: the builder now takes `{identity}`, and the three expects became one `toEqual` over the rejection, the `onError` error and the `afterSession` flag — the same three facts asserted.