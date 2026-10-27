# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real process entry point and accepts the real `onError` hook, so the acceptance test can observe both the hook argument and the caller's rejection without a double.

## Done when these pass

- [ ] **calls onError with wrapped non-Error rejections while rethrowing the original value** — every string, plain-object, and `undefined` provider rejection calls `onError` once with an `Error` whose `cause` is the original value, while the caller receives that original value unchanged.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Wrap every non-`Error` rejection for `onError`, preserving an existing `Error` instance.
- [ ] Keep rethrowing the original rejection value at the caller boundary.
- [ ] Replace the measured-flaw statement in the config-hooks spec with the guarantee and document the consumer-visible change in the changelog.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.
- Changes to the existing behavior for rejections that are already `Error` instances.