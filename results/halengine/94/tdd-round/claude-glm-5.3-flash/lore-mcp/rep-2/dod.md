# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The chat orchestrator acts as a seam, allowing us to install hooks through configuration and observe their execution when `beforeSession` throws.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — pins that a thrown error in `beforeSession` propagates to the caller while invoking both `onError` and `afterSession` hooks.
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [x] Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.
- [x] Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`, including the recorded decision that `afterSession` runs on a failed `beforeSession` with no signal distinguishing it from a completed turn.
- [x] Document in the CHANGELOG what changes for an existing consumer.
- [x] Repair the acceptance test per CI on f5bee58: build `PromptBuilder` from its real config shape (`identity`, not `baseSystemPrompt` — the typecheck finding) and split the three-expect test into three one-expect tests for `re-lint/max-expects`, renaming the spec citations to the new test titles.
- [x] Repair the eslint finding on 3bafdba: move `createMockProvider` below its caller `createThrowingOrchestrator` (`re-lint/callee-below-caller`) — a line-neutral reorder, so the spec's #L45/#L52/#L66 citations stay anchored.

## Out of scope

- the `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)