# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator(...).processMessage` is the real entry point, and the `catch` gate on `error instanceof Error` at `src/orchestration/chatOrchestrator.ts` is reachable today through a provider that rejects with a non-`Error` value.

## Done when these pass

- [ ] **wraps a thrown string in an Error whose cause is that string, and still rejects the caller with it** — `onError` is called once with an `Error` whose `cause` is the string; the caller's rejection is the original string.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once for a plain-object rejection and for an undefined rejection, each wrapped with the original as cause** — both non-`Error` shapes reach `onError` as an `Error`; the object rejection reaches the caller unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Red bar: both tests fail today with `hookCalls: 0` and `isError: false`, because the `instanceof Error` gate skips `onError`. Run with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/chatOrchestrator.acceptance.test.ts`.

## Facets

- [ ] Remove the `instanceof Error` gate and wrap non-`Error` rejections in an `Error` with `cause` set to the original value, in `src/orchestration/chatOrchestrator.ts`, leaving the re-thrown value unchanged.
- [ ] Replace the recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and add the validated-by parenthetical pointing at the acceptance tests.
- [ ] Add a CHANGELOG entry stating that `onError` now fires for non-`Error` rejections, and what an existing consumer must check.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Changing the value re-thrown at the caller boundary.
- Changing the `Error` identity for rejections that are already `Error`s (existing tests pin this).