# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is the real public seam: an injected provider can reject with each required value, while `processMessage` exposes both hook delivery and the unchanged caller rejection.

## Done when these pass

- [ ] **calls onError once with each non-Error rejection as its cause and rethrows the original value** — Pins string, plain-object, and `undefined` rejections, including one hook call with an `Error`, the original value as its cause, and unchanged propagation to the caller.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize each non-`Error` rejection to an `Error` with the original value as `cause` before calling `onError`.
- [ ] Preserve the already-`Error` hook argument identity and continue rethrowing every original rejection unchanged.
- [ ] Replace the spec's recorded flaw with the guaranteed behavior and document the consumer-visible change in the changelog.

## Out of scope

- `beforeSession` placement outside the error boundary and usage accounting across tool rounds.