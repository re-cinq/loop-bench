# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A
> rejection that is not an `Error` — a thrown string, a plain object, a value
> from a library that rejects with its own shape — bypasses `onError` entirely
> while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator`
returns an orchestrator whose `processMessage` is the real entry point, and a
provider whose `sendMessage` rejects drives the `catch` in
`src/orchestration/chatOrchestrator.ts`. A provider that throws a non-`Error`
value exercises the gate directly; no new module or boundary is needed.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — a provider rejecting with a string, a plain object, and `undefined` each calls `onError` exactly once with an `Error` whose `cause` is the original value, while the caller still receives the original rejection unchanged. Fails today because `error instanceof Error` skips `onError` (`onErrorCallCount: 0`, `isError: false`, `causeIsOriginal: false`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: the acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts` fails because `error instanceof Error` skips `onError` for string, plain object, and `undefined` rejections.
- [ ] Green: in the `catch` in `src/orchestration/chatOrchestrator.ts`, when `hooks?.onError` is set, wrap a non-`Error` rejection in `new Error(..., {cause: error})` (leaving an `Error` instance as-is) and pass it to `hooks.onError`, while still re-throwing the original `error` to the caller unchanged.
- [ ] Refactor: ensure existing `onError` and lifecycle-order tests in `src/orchestration/chatOrchestrator.test.ts` stay green without edits (preserving the exact `Error` instance when the rejection is already an `Error`).
- [ ] Docs: add a `CHANGELOG.md` entry under `[Unreleased]` stating what changes for an existing consumer (`onError` now fires for non-`Error` rejections wrapped in an `Error` with `cause`, while the caller-boundary rejection value is unchanged).

## Out of scope

- `beforeSession` escaping the `try` (its own issue, #94).
- Usage accounting across tool rounds (HALEngine#93).
- Changing the re-thrown rejection value at the caller boundary — the caller continues to receive the original rejection unchanged.