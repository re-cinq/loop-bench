# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is an exported entry point taking an `AIProvider` and `{hooks: {onError}}`, so an acceptance test can reject from `provider.sendMessage` with non-`Error` values directly and observe both `onError` and the caller-boundary rejection.

## Done when these pass

- [ ] **wraps non-Error rejections with cause for onError and rethrows the original value** — calls `onError` once per rejection (for a string, a plain object, and `undefined`) with an `Error` whose `cause` is the thrown value while rethrowing the original value unchanged to the caller
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Update the `catch` block in `src/orchestration/chatOrchestrator.ts` so `hooks?.onError` is called for any rejection, wrapping non-`Error` values in `new Error(..., {cause: error})` while keeping `Error` instances unwrapped and rethrowing the original `error` unchanged.
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green to pin that `Error` rejections still reach `onError` as the same instance.
- [ ] Remove the obsolete `## Measured semantics — out of scope` flaw section from `specs/hal-engine-config-hooks/spec.md` once the fix is implemented.
- [ ] Add a `## [Unreleased]` entry in `CHANGELOG.md` explaining that `onError` now fires for non-`Error` rejections (wrapped with `cause`) while caller-boundary rejections remain unchanged.
- [ ] Run `npm run verify` (build, test, typecheck, eslint `--max-warnings 0`, prettier, spec checks) and verify all checks pass.

## Out of scope

- `beforeSession` escaping the `try` block (tracked in its own issue).
- Usage accounting across tool rounds (tracked in `re-cinq/HALEngine#93`).