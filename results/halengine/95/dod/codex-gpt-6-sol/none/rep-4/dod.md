# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` already exposes the provider rejection and the installed `onError` hook. One test exercises string, plain-object, `undefined`, and `Error` rejections through that entry point.

## Done when these pass

- [ ] **calls onError once for every provider rejection while preserving the caller value** — Every rejection invokes the hook once; non-Errors are wrapped with the original as `cause`, existing Errors retain identity, and callers receive the exact original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Pass the provider rejection to `onError` as an `Error`, preserving non-Error values as `cause`.
- [ ] Rethrow the provider's original rejection unchanged after the hook.
- [ ] Update the config-hooks spec guarantee and add a CHANGELOG entry for consumers.
- [ ] Pass the CI build, test, typecheck, eslint, and prettier checks.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds (HALEngine#93).