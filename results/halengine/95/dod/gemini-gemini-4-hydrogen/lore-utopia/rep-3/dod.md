# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already exposes `options.hooks.onError` and accepts any `AIProvider`. The acceptance test drives the real entry point with non-`Error` rejections and fails directly because the `catch` skips `onError` when `error instanceof Error` is false.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the rejection and rethrows the original value** — A provider rejecting with a string, plain object, or `undefined` invokes `onError` once with an `Error` whose `cause` is the thrown value while the caller still receives the original rejection unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in `src/orchestration/chatOrchestrator.ts`'s `catch` block, wrapping non-`Error` rejections in `new Error(..., {cause: error})` for `hooks.onError` while leaving `Error` instances unwrapped and rethrowing the original `error` unchanged.
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so `Error` instance passthrough remains pinned.
- [ ] Remove the `Measured semantics — out of scope` section from `specs/hal-engine-config-hooks/spec.md` once the fix lands, keeping the new guarantee bullet and valid anchor.
- [ ] Add an `[Unreleased]` entry to `CHANGELOG.md` explaining that `onError` now fires for non-`Error` rejections wrapped with `cause` while caller-boundary rejections remain unchanged.

## Out of scope

- `beforeSession` escaping the `try` block (handled separately).
- Usage accounting across tool rounds (`HALEngine#93`).