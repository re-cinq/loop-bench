# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks`, so the acceptance tests can drive `processMessage` with a provider whose `sendMessage` rejects with a non-`Error` value and observe that `onError` is bypassed today.

## Done when these pass

- [ ] **calls onError once with a wrapping Error carrying the cause when a provider rejects with a string, while rethrowing the original string** — when the provider rejects with a string, `onError` fires once with an `Error` instance whose `cause` is that string, and `processMessage` still rejects with the original string unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError once with a wrapping Error carrying the cause when a provider rejects with a plain object or undefined, while rethrowing the original value** — when the provider rejects with a plain object or `undefined`, `onError` fires once with an `Error` instance whose `cause` is that value, and `processMessage` still rejects with the original value unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, normalise a caught value that is not `instanceof Error` into an `Error` wrapping the original value (`new Error(String(error), {cause: error})`) before passing it to `hooks.onError`, while keeping the `throw error` rethrow of the original caught value unchanged.
- [ ] Confirm existing `Error` rejection tests in `src/orchestration/chatOrchestrator.test.ts` stay green without edits (`Error` instances pass through to `onError` with the same identity and message, and `OrchestratorHooks.onError` keeps its `(session: ChatSession, error: Error) => Promise<void>` signature).
- [ ] Criterion 4, owned by the implementer: remove the remaining `instanceof Error` limitation under `## Measured semantics — out of scope` in `specs/hal-engine-config-hooks/spec.md` (and the section itself once empty), and add a `CHANGELOG.md` entry under `[Unreleased] -> Fixed` describing the behaviour change.

## Out of scope

- `beforeSession` escaping the `try` block (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Widening the `OrchestratorHooks.onError` parameter type from `Error` to `unknown` (explicitly forbidden by acceptance criterion 3).