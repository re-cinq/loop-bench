# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and a provider that rejects with any value exercises the `catch` today.

## Done when these pass

- [ ] **calls onError once with an Error caused by a string / a plain object / undefined, and rethrows the original** — `onError` receives exactly one `Error` whose `cause` is the raw rejection, and the caller still receives the original value. The already-an-`Error` case stays pinned by the existing, unedited tests in `chatOrchestrator.test.ts`.
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] Wrap non-`Error` rejections (`new Error(..., {cause})`) and call `onError` for every rejection; rethrow the original
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the guarantee, linked to the test
- [ ] CHANGELOG entry for existing consumers

## Out of scope

- `beforeSession` escaping the `try`
- Usage accounting across tool rounds (HALEngine#93)