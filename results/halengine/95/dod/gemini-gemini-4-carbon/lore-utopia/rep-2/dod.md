# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `options.hooks.onError` lifecycle seam and accepts an `AIProvider` directly, so the acceptance test calls `processMessage` with a rejecting provider and observes both `onError` and the caller-visible rejection without doubles.

## Done when these pass

- [ ] **calls onError with a cause-carrying Error for string, object, and undefined rejections** — `onError` fires once with the turn's session and a cause-preserving `Error` wrapper when the provider rejects with a string, a plain object, or `undefined`, passes an existing `Error` instance through unwrapped, and still rejects to the caller with the original value unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` so `hooks.onError` runs on every rejection, wrapping any non-`Error` value in `new Error(String(error), {cause: error})` while passing an `Error` instance through unchanged and re-throwing the original caught value to the caller
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited
- [ ] Record the consumer-visible change under `## [Unreleased]` (`### Fixed`) in `CHANGELOG.md`

## Out of scope

- `beforeSession` escaping the `try` block (tracked separately)
- Usage accounting across tool rounds (HALEngine#93)