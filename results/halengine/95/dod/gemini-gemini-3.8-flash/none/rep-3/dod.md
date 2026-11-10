# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator already exposes `onError` on `OrchestratorHooks` and invokes it from `processMessageStream`. The acceptance test calls the real `createChatOrchestrator` entry point with a rejecting provider and verifies that `onError` receives a wrapped `Error` with the rejection preserved as `cause`.

## Done when these pass

- [ ] **calls onError with a wrapped Error when a rejection is not an Error and propagates the raw value unchanged** — Verifies that rejections with a string, a plain object, and undefined each call onError once with an Error wrapping the rejection as its cause, while the caller receives the original rejection unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections in an Error with cause in `src/orchestration/chatOrchestrator.ts` catch block before calling `hooks.onError`, rethrowing the original rejection.
- [ ] Verify existing tests in `src/orchestration/chatOrchestrator.test.ts` pass unedited, ensuring rejections that are already Error instances reach `onError` unwrapped.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and update `CHANGELOG.md`.

## Out of scope

- beforeSession escaping the try (own issue)
- usage accounting across tool rounds (HALEngine#93)