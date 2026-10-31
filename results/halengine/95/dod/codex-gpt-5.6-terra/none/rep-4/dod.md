# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point, and a provider can reject during its stream without a test double. The acceptance case observes both the installed hook and the caller boundary.

## Done when these pass

- [ ] **calls onError with an Error retaining each rejection as cause and rethrows the original value** — string, plain-object, and `undefined` provider rejections call the hook once with a wrapper whose `cause` is the raw value, while the caller receives that raw value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-`Error` rejections only for `onError`; preserve the caller-boundary rejection.
- [ ] Replace the recorded flaw in the config-hooks spec with the guarantee and document the change for existing consumers in the CHANGELOG.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.