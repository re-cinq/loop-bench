# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `processMessage` and the `onError` hook. A rejecting provider exercises the real caller path with each reported rejection value.

## Done when these pass

- [ ] **calls onError once with a caused Error and rethrows each original rejection** — string, plain object, and `undefined` each reach the hook exactly once as an `Error` with the original as `cause`; an existing `Error` reaches it as the same instance, and the caller receives every original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-`Error` rejections for `onError` and preserve the raw value thrown to the caller.
- [ ] Keep an existing `Error` instance unchanged when passing it to `onError`; leave the existing tests unedited.
- [ ] Add a `CHANGELOG.md` entry explaining the hook's new behavior for consumers.
- [ ] Keep the spec's new guarantee linked to the acceptance test.

## Out of scope

- `beforeSession` placement relative to the `try` block and usage accounting across tool rounds.