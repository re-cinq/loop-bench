# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts an `OrchestratorHooks` object with `onError` and an `AIProvider` interface, so the acceptance test drives `processMessage` directly with a rejecting provider and observes both `onError` invocations and the caller-boundary rejection.

## Done when these pass

- [ ] **wraps non-Error rejections with cause, keeps Error instances, and rethrows originals** — Rejects a turn with a string, a plain object, `undefined`, and an `Error`, asserting `onError` fires once per turn with non-`Error` values wrapped in an `Error` whose `cause` is the original value, `Error` instances delivered as the same instance, and the caller always receiving the original rejection unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Update the `catch` block in `src/orchestration/chatOrchestrator.ts` so `hooks?.onError` is called for every rejection, passing `error` as-is when `error instanceof Error` and `new Error(..., {cause: error})` otherwise, while still rethrowing the original `error` unchanged and leaving `src/orchestration/chatOrchestrator.test.ts` unedited.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining for existing consumers that `onError` now fires for non-`Error` rejections (wrapped in an `Error` with `{cause}`), while the caller-boundary rejection value stays unchanged.

## Out of scope

- `beforeSession` escaping the `try` (tracked separately in HALEngine#94).
- Usage accounting across tool rounds (tracked separately in HALEngine#93).