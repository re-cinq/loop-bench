# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the shared catch through a configured lifecycle hook. Rejecting that hook exercises real rejection values without replacing a provider or using mocks; provider streaming enters this same catch.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the caller rejection** — String, plain object, and `undefined` rejections each notify once with an Error preserving the exact cause and caller rejection; an existing Error retains identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize caught non-Error values only for `onError`, retaining the original as `cause`; preserve the rethrow and existing Error identity.
- [ ] Keep existing Error tests unedited and green, including provider stream failures.
- [ ] Keep the config-hooks spec guarantee linked to the acceptance test and add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository CI checks, including build, tests, typecheck, eslint, and formatting.

## Out of scope

- Changes to `beforeSession` placement, usage accounting across tool rounds, or failures thrown by `onError` itself.
- Provider implementations and retry policy changes.