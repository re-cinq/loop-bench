# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `processMessage` entry point, and a provider that rejects with a non-`Error` value drives the existing catch path directly.

## Done when these pass

- [ ] **wraps string, object, and undefined rejections for onError without changing the caller rejection** — each non-`Error` rejection calls `onError` once with an `Error` whose `cause` is the original, while the caller receives that original value unchanged.
  `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Red: the acceptance test fails because the current `instanceof Error` gate skips `onError` for all three non-`Error` values.
- [ ] Green: wrap only non-`Error` rejection values for the hook and preserve the original value at the caller boundary.
- [ ] Refactor: keep existing `Error` rejection tests green and unedited.
- [ ] Documentation: replace the measured-flaw statement with the guarantee and add the consumer-facing CHANGELOG entry.

## Out of scope

- Rejections that are already `Error` instances, which existing tests pin.
- `beforeSession` lifecycle behavior and usage accounting across tool rounds.
- The required CHANGELOG, build, typecheck, lint, and formatter checks, which CI validates after implementation.