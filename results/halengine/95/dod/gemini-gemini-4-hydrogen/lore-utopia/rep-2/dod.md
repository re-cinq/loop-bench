# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts `hooks.onError` and catches every turn rejection at lines 148–153, so the acceptance test calls `processMessage` directly through the existing seam with a rejecting `AIProvider`.

## Done when these pass

- [ ] **calls onError with an Error cause wrapper for string, object, and undefined rejections** — pins that rejecting with a string, a plain object, or `undefined` calls `onError` once with an `Error` whose `cause` is the original value while the caller still receives the original rejection unchanged (and existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` remain unedited to pin `Error` instance identity)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in the `catch` of `src/orchestration/chatOrchestrator.ts`: wrap any non-`Error` value in `new Error(String(error), {cause: error})` (or equivalent message preserving `cause`) before calling `hooks.onError`, pass `Error` instances unchanged, and keep `throw error` re-throwing the original value
- [ ] Remove the `## Measured semantics — out of scope` section from `specs/hal-engine-config-hooks/spec.md` once the `catch` is fixed so the spec no longer claims the flaw remains
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining that `onError` now fires for non-`Error` rejections wrapped with `cause` while the caller-boundary rejection value is unchanged
- [ ] Verify existing tests (including `src/orchestration/chatOrchestrator.test.ts`) and CI checks (`build`, `test`, `typecheck`, `eslint`, `prettier:check`) pass without modifying the existing `onError` tests

## Out of scope

- `beforeSession` escaping the `try` block (separate issue)
- Usage accounting across tool rounds (`re-cinq/HALEngine#93`)